from listener import Listener
from fbs_runtime.application_context.PySide2 import ApplicationContext, cached_property

from PySide2.QtCore import Qt, QSize, QThreadPool
from PySide2.QtWidgets import QAction, QApplication, QCheckBox, QHBoxLayout, QMainWindow, QMenu, QPlainTextEdit, QPushButton, QShortcut, QSizePolicy, QSpacerItem, QStatusBar, QSystemTrayIcon, QToolBar, QVBoxLayout, QWidget
from PySide2.QtGui import QIcon, QKeySequence
from google_trans_new import google_translator  

# from pynput import keyboard

import sys, json
import os, pwd

translator = google_translator()
# controller = keyboard.Controller()

def write_json_file(path, data):
    with open(path, 'w', encoding='utf-8') as wt:
        json.dump(data, wt)

def read_json_file(path):
    with open(path, encoding='utf-8') as rd:
        data = json.load(rd)

    return data

class ConfigWindow(QWidget):
    def __init__(self, parent):
        super().__init__()
        self.parent = parent

        layout = QVBoxLayout()
        btn_layout = QHBoxLayout()

        self.config_text = QPlainTextEdit()
        self.config_text.setPlainText(self.load_config_file())
        layout.addWidget(self.config_text)

        btn_save = QPushButton('Save')
        btn_save.setStyleSheet('background-color: green')
        btn_save.setIcon(self.parent.ctx.load_images['document'])
        btn_save.clicked.connect(self.save_config_file)
        btn_layout.addItem(QSpacerItem(40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))
        btn_layout.addWidget(btn_save)
        btn_layout.addItem(QSpacerItem(40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))  
        layout.addLayout(btn_layout)  

        self.setLayout(layout)
        self.setWindowIcon(self.parent.ctx.load_images['icon'])
        self.setWindowTitle('Configure extracted text')
        self.setGeometry(760, 100, 400, 200)

    def load_config_file(self):
        with open(self.parent.ctx.load_config[0], 'r', encoding='utf-8') as rd:
            content = rd.read()

        return content

    def save_config_file(self):
        with open(self.parent.ctx.load_config[0], 'w', encoding='utf-8') as wt:
            wt.write(self.config_text.toPlainText())

        self.close()
        self.parent.config_window = None

    def closeEvent(self, event):
        self.parent.config_window = None

class MainWindow(QMainWindow):
    def __init__(self, ctx):
        super().__init__()
        self.ctx = ctx
        self.cleaner = self.read_file()
        self.config_window = None
        self.config = read_json_file(self.ctx.load_config[1])

        self.setWindowIcon(self.ctx.load_images['icon'])
        self.setWindowTitle('Kleantrans')
        self.setGeometry(660, 340, 600, 400)
        self.toolbar_setup()
        self.widgets_setup()
        self.setWindowFlags(Qt.WindowStaysOnTopHint)
        self.setup_hotkeys()

        QApplication.clipboard().dataChanged.connect(self.get_raw_text)

    def toolbar_setup(self):
        btn_config = QAction(self.ctx.load_images['notebook'], 'Configure', self)
        btn_config.setStatusTip('Configure the characters used to clean text.')
        btn_config.triggered.connect(self.show_config_window)

        self.chb_active = QCheckBox('Active')
        self.chb_active.setStatusTip('Press Ctrl+T to switch text translation from clipboard on or off.')
        self.chb_active.clicked.connect(self.checkbox_active_clicked)
        self.chb_active.setChecked(self.config['active'])

        chb_hide = QCheckBox('Hide')
        chb_hide.setStatusTip('Hide the top text box.')
        chb_hide.clicked.connect(self.checkbox_hide_clicked)
        chb_hide.setChecked(self.config['hide'])

        self.btn_swap = QAction(self.ctx.load_images['swap'], f"{self.config['swap'][0]} ➜ {self.config['swap'][1]}", self)
        self.btn_swap.setStatusTip('Press Ctrl+W to swap two languages.')
        self.btn_swap.setShortcut(QKeySequence('Ctrl+w'))
        self.btn_swap.triggered.connect(self.swap)

        toolbar = QToolBar()
        toolbar.setIconSize(QSize(16, 16))
        toolbar.setToolButtonStyle(Qt.ToolButtonTextBesideIcon)

        toolbar.addAction(btn_config)
        toolbar.addSeparator()
        toolbar.addAction(self.btn_swap)
        toolbar.addSeparator()
        toolbar.addWidget(self.chb_active)
        toolbar.addSeparator()
        toolbar.addWidget(chb_hide)

        self.addToolBar(toolbar)
        self.setStatusBar(QStatusBar(self))

    def widgets_setup(self):
        layout = QVBoxLayout()
        btn_layout = QHBoxLayout()

        self.raw_text = QPlainTextEdit()
        layout.addWidget(self.raw_text)

        if self.config['hide']:
            self.raw_text.hide()
            self.resize(600, 250)

        self.for_text = QPlainTextEdit()
        layout.addWidget(self.for_text)
        
        btn_trans = QPushButton('Translate')
        btn_trans.setIcon(self.ctx.load_images['arrow'])
        btn_trans.setStyleSheet('background-color: green')
        btn_trans.setStatusTip('Press combination key Ctrl+Enter to translate.')
        btn_trans.clicked.connect(self.translate)
        btn_clear = QPushButton('Clear')
        btn_clear.setIcon(self.ctx.load_images['cross'])
        btn_clear.setStyleSheet('background-color: red')
        btn_clear.setStatusTip('Press combination key Ctrl+D to clear.')
        btn_clear.clicked.connect(self.clear)

        btn_layout.addItem(QSpacerItem(40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))
        btn_layout.addWidget(btn_trans)
        btn_layout.addItem(QSpacerItem(40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))
        btn_layout.addWidget(btn_clear)
        btn_layout.addItem(QSpacerItem(40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))

        layout.addLayout(btn_layout)
        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

    def get_raw_text(self):
        if self.config['active']:
            text = QApplication.clipboard().text()
            self.raw_text.setPlainText(text)
            text = self.raw_text.toPlainText()

            for broom in self.cleaner:
                text = text.replace(broom[0], broom[1])

            self.raw_text.setPlainText(text)
            self.translate()

    def translate(self):
        flag = False
        trans_text = ''

        while not flag:
            try:
                trans_text = translator.translate(self.raw_text.toPlainText(), lang_src=self.config['swap'][0],lang_tgt=self.config['swap'][1])

                flag = True
            except:
                pass

        self.for_text.setPlainText(trans_text)

    def checkbox_active_clicked(self, checked):
        self.config['active'] = checked
        write_json_file(self.ctx.load_config[1], self.config)

    def read_file(self):
        content = []

        with open(self.ctx.load_config[0], 'r', encoding='utf-8') as rd:
            line = rd.readline().strip()

            while line:
                line = line.replace('[', '')
                line = line.replace(']', '')
                line = line.replace('\\n', '\n')

                content.append(tuple(line.split('|')))
                line = rd.readline().strip()

        return content

    def show_config_window(self):
        if self.config_window is None:
            self.config_window = ConfigWindow(self)
            self.config_window.show()
        else:
            self.config_window.close()
            self.config_window = None      

    def activate(self, reason):
        if reason == QSystemTrayIcon.Trigger: # click the icon on the tray to show
            self.show()
        else:
            self.hide()

    def setup_hotkeys(self):
        btn_trans_shortcut = QShortcut(QKeySequence('Ctrl+Return'), self)
        btn_trans_shortcut.activated.connect(self.translate)

        btn_clear_shortcut = QShortcut(QKeySequence('Ctrl+d'), self)
        btn_clear_shortcut.activated.connect(self.clear)

        chb_active_shortcut = QShortcut(QKeySequence('Ctrl+t'), self)
        chb_active_shortcut.activated.connect(self.active)

    def clear(self):
        self.raw_text.setPlainText('')
        self.for_text.setPlainText('')

    def swap(self):
        self.config['swap'] = [self.config['swap'][1], self.config['swap'][0]]
        self.btn_swap.setText(f"{self.config['swap'][0]} ➜ {self.config['swap'][1]}")

        write_json_file(self.ctx.load_config[1], self.config)

    def active(self):
        if self.chb_active.isChecked():
            self.chb_active.setCheckState(Qt.Unchecked)
            self.config['active'] = False
        else:
            self.chb_active.setCheckState(Qt.Checked)
            self.config['active'] = True

        write_json_file(self.ctx.load_config[1], self.config)

    def checkbox_hide_clicked(self, checked):
        if checked:
            self.raw_text.hide()
            self.resize(600, 250)
        else:
            self.raw_text.show()
            self.resize(600, 400)

        self.config['hide'] = checked
        write_json_file(self.ctx.load_config[1], self.config)

    def closeEvent(self, event):
        self.ctx.windowPos = (self.pos().x(), self.pos().y())
        self.ctx.turn = True

        self.close()

class AppContext(ApplicationContext):
    @cached_property
    def get_username(self):
        return pwd.getpwuid(os.getuid())[0]

    @cached_property
    def main_window(self):
        self.windowPos = (660, 340)
        self.turn = False

        return MainWindow(self)

    @cached_property
    def load_config(self):
        return (f'/home/{self.get_username}/Software/Kleantrans/extract_text.txt', f'/home/{self.get_username}/Software/Kleantrans/config.json')

    @cached_property
    def load_images(self):
        return {
            'icon': QIcon(self.get_resource('images/icon.png')),
            'notebook': QIcon(self.get_resource('images/notebook--pencil.png')),
            'document': QIcon(self.get_resource('images/blue-document--plus.png')),
            'arrow': QIcon(self.get_resource('images/arrow-turn-000-left.png')),
            'cross': QIcon(self.get_resource('images/cross.png')),
            'swap': QIcon(self.get_resource('images/swap.png')),
            'exit': QIcon(self.get_resource('images/exit.png')),
            'window': QIcon(self.get_resource('images/window.png'))
        }

    # def on_click(self, x, y, button, pressed):
    #     if button == mouse.Button.middle and pressed:
    #         controller.press(keyboard.Key.ctrl)
    #         controller.press('c')
    #         controller.release('c')
    #         controller.release(keyboard.Key.ctrl)

    # def on_activate(self):
    #     if self.turn:
    #         self.main_window.move(self.windowPos[0], self.windowPos[1])
    #         self.main_window.show()
    #     else:
    #         self.windowPos = (self.main_window.pos().x(), self.main_window.pos().y())
    #         self.main_window.hide()

    #     self.turn = not self.turn

    # def for_canonical(self, f):
    #     return lambda k: f(self.listener2.canonical(k))

    def run(self):
        # self.listener1 = mouse.Listener(on_click=self.on_click)
        # self.hotkey = kb.HotKey(kb.HotKey.parse('<ctrl>+<shift>'), self.on_activate)
        # self.listener2 = kb.Listener(on_press=self.for_canonical(self.hotkey.press), on_release=self.for_canonical(self.hotkey.release))

        quit = QAction(self.load_images['exit'], 'Quit')
        quit.triggered.connect(self.app.quit)

        menu = QMenu()
        action = QAction(self.load_images['window'], 'Ctrl+Shift: hide/show')
        menu.addAction(action)
        menu.addAction(quit)

        tray = QSystemTrayIcon()
        tray.setIcon(self.load_images['icon'])
        tray.setVisible(True)
        tray.setContextMenu(menu)
        tray.activated.connect(self.main_window.activate)
        
        self.app.setStyle('Fusion')
        self.app.setQuitOnLastWindowClosed(False)
        self.main_window.show()
        self.windowPos = (self.main_window.pos().x(), self.main_window.pos().y())

        # self.listener1.start()
        # self.listener2.start()

        self.threadpool = QThreadPool()
        listener = Listener()
        listener.signal.finish.connect(self.main_window.translate)
        self.threadpool.start(listener)


        return self.app.exec_()


if __name__ == '__main__': 
    appctxt = AppContext()
    exit_code = appctxt.run()
    sys.exit(exit_code)

