from listener import ListenerMouse, ListenerKeyBoard
from PySide2.QtCore import Qt, QSize
from PySide2.QtWidgets import QLabel, QAction, QApplication, QCheckBox, QHBoxLayout, QMainWindow, QMenu, QPlainTextEdit, QPushButton, QShortcut, QSizePolicy, QSpacerItem, QStatusBar, QSystemTrayIcon, QToolBar, QVBoxLayout, QWidget
from PySide2.QtGui import QIcon, QKeySequence

import sys
import json
import re
import subprocess

def write_json_file(path, data):
    with open(path, 'w', encoding='utf-8') as wt:
        json.dump(data, wt)


def read_json_file(path):
    with open(path, encoding='utf-8') as rd:
        data = json.load(rd)

    return data


class Config:
    def __init__(self):
        self.cleaner = f'config/extract_text.txt'
        self.config = f'config/config.json'
        self.images = self.loadImages()

    def loadImages(self):
        return {
            'icon': QIcon('images/icon.png'),
            'notebook': QIcon('images/notebook--pencil.png'),
            'document': QIcon('images/blue-document--plus.png'),
            'arrow': QIcon('images/arrow-turn-000-left.png'),
            'cross': QIcon('images/cross.png'),
            'swap': QIcon('images/swap.png'),
            'exit': QIcon('images/exit.png'),
            'window': QIcon('images/window.png')
        }


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
        btn_save.setIcon(self.parent.ctx.images['document'])
        btn_save.clicked.connect(self.save_config_file)
        btn_layout.addItem(QSpacerItem(
            40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))
        btn_layout.addWidget(btn_save)
        btn_layout.addItem(QSpacerItem(
            40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))
        layout.addLayout(btn_layout)

        self.setLayout(layout)
        self.setWindowIcon(self.parent.ctx.images['icon'])
        self.setWindowTitle('Configure extracted text')
        self.setGeometry(760, 100, 400, 200)

    def load_config_file(self):
        with open(self.parent.ctx.cleaner, 'r', encoding='utf-8') as rd:
            content = rd.read()

        return content

    def save_config_file(self):
        with open(self.parent.ctx.cleaner, 'w', encoding='utf-8') as wt:
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
        self.config = read_json_file(self.ctx.config)

        self.setWindowIcon(self.ctx.images['icon'])
        self.setWindowTitle('Kleantrans')
        self.setGeometry(660, 340, 600, 400)
        self.toolbar_setup()
        self.widgets_setup()
        self.setWindowFlags(Qt.WindowStaysOnTopHint)
        self.setup_hotkeys()

        QApplication.clipboard().dataChanged.connect(self.get_raw_text)

    def toolbar_setup(self):
        btn_config = QAction(self.ctx.images['notebook'], 'Configure', self)
        btn_config.setStatusTip('Configure the characters used to clean text.')
        btn_config.triggered.connect(self.show_config_window)

        self.chb_active = QCheckBox('Active')
        self.chb_active.setStatusTip(
            'Press Ctrl+T to switch text translation from clipboard on or off.')
        self.chb_active.clicked.connect(self.checkbox_active_clicked)
        self.chb_active.setChecked(self.config['active'])

        chb_hide = QCheckBox('Hide')
        chb_hide.setStatusTip('Hide the top text box.')
        chb_hide.clicked.connect(self.checkbox_hide_clicked)
        chb_hide.setChecked(self.config['hide'])

        self.btn_swap = QAction(
            self.ctx.images['swap'], f"{self.config['swap'][0]} ➜ {self.config['swap'][1]}", self)
        self.btn_swap.setStatusTip('Press Ctrl+W to swap two languages.')
        self.btn_swap.setShortcut(QKeySequence('Ctrl+w'))
        self.btn_swap.triggered.connect(self.swap)

        toolbar = QToolBar()
        toolbar.setIconSize(QSize(16, 16))
        toolbar.setToolButtonStyle(Qt.ToolButtonTextBesideIcon)

        toolbar.addAction(btn_config)
        toolbar.addSeparator()
        toolbar.addAction(self.btn_swap)
        # toolbar.addSeparator()
        # toolbar.addWidget(self.chb_active)
        toolbar.addSeparator()
        toolbar.addWidget(chb_hide)
        toolbar.addSeparator()
        toolbar.addSeparator()
        toolbar.addWidget(QLabel("Copyright © by Manh Cuong"))
        

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
        btn_trans.setIcon(self.ctx.images['arrow'])
        btn_trans.setStyleSheet('background-color: green')
        btn_trans.setStatusTip(
            'Press combination key Ctrl+Enter to translate.')
        btn_trans.clicked.connect(self.translate)
        btn_clear = QPushButton('Clear')
        btn_clear.setIcon(self.ctx.images['cross'])
        btn_clear.setStyleSheet('background-color: red')
        btn_clear.setStatusTip('Press combination key Ctrl+D to clear.')
        btn_clear.clicked.connect(self.clear)

        btn_layout.addItem(QSpacerItem(
            40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))
        btn_layout.addWidget(btn_trans)
        btn_layout.addItem(QSpacerItem(
            40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))
        btn_layout.addWidget(btn_clear)
        btn_layout.addItem(QSpacerItem(
            40, 20, QSizePolicy.Expanding, QSizePolicy.Minimum))

        # layout.addLayout(btn_layout)
        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

    def get_raw_text(self):
        if self.config['active']:
            text = QApplication.clipboard().text()
            
            if text == "" or text[0] != '$': return
            
            text = text[1:]
            text = re.sub("\s+", " ", re.sub(self.pattern, " ", text)).strip()
            # self.raw_text.setPlainText(text)
            # text = self.raw_text.toPlainText()

            for broom in self.cleaner:
                text = text.replace(broom[0], broom[1])

            self.raw_text.setPlainText(text)
            self.translate()

    def translate(self):
        trans_text = ''
        text = self.raw_text.toPlainText().strip()
        
        if text == "" or (re.match("^(https://|http://|x-special/nautilus-clipboard).*", text)) is not None:
            return
        
        try:
            cmd = """
                trans -e google -s {} -t {} -show-original y -show-original-phonetics n -show-translation y -no-ansi -show-translation-phonetics n -show-prompt-message n -show-languages y -show-original-dictionary n -show-dictionary n -show-alternatives n "{}"
                """.format(self.config['swap'][0], self.config['swap'][1], text)
                
            subprocess_ = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
            trans_text = subprocess_.stdout.read().decode('utf-8').split("\n\n")[1]
            trans_text = re.sub("(u200b)", "", trans_text)
            self.for_text.setPlainText(trans_text)
        except:
            pass

    def checkbox_active_clicked(self, checked):
        self.config['active'] = checked
        write_json_file(self.ctx.config, self.config)

    def read_file(self):
        content = []

        with open(self.ctx.cleaner, 'r', encoding='utf-8') as rd:
            line = rd.readline().strip()
            self.pattern = line

            while line:
                line = rd.readline().strip()
                if line == "": break
                
                content.append(tuple(line.split('|')))
                
                line = line.replace('[', '')
                line = line.replace(']', '')
                line = line.replace('\\n', '\n')

        return content

    def show_config_window(self):
        if self.config_window is None:
            self.config_window = ConfigWindow(self)
            self.config_window.show()
        else:
            self.config_window.close()
            self.config_window = None

    def activate(self, reason):
        if reason == QSystemTrayIcon.Trigger:  # click the icon on the tray to show
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
        self.btn_swap.setText(
            f"{self.config['swap'][0]} ➜ {self.config['swap'][1]}")

        write_json_file(self.ctx.config, self.config)

    def active(self):
        if self.chb_active.isChecked():
            self.chb_active.setCheckState(Qt.Unchecked)
            self.config['active'] = False
        else:
            self.chb_active.setCheckState(Qt.Checked)
            self.config['active'] = True

        write_json_file(self.ctx.config, self.config)

    def checkbox_hide_clicked(self, checked):
        if checked:
            self.raw_text.hide()
            self.resize(600, 250)
        else:
            self.raw_text.show()
            self.resize(600, 400)

        self.config['hide'] = checked
        write_json_file(self.ctx.config, self.config)

    def closeEvent(self, event):
        self.ctx.windowPos = (self.pos().x(), self.pos().y())
        self.ctx.turn = True

        self.close()


def run():
    app = QApplication(sys.argv)
    ctx = Config()
    window = MainWindow(ctx)

    quit = QAction(ctx.images['exit'], 'Quit')
    quit.triggered.connect(app.quit)

    menu = QMenu()
    action = QAction(ctx.images['window'], 'Shift+Cmd: hide/show')
    menu.addAction(action)
    menu.addAction(quit)

    tray = QSystemTrayIcon()
    tray.setIcon(ctx.images['icon'])
    tray.setVisible(True)
    tray.setContextMenu(menu)
    tray.activated.connect(window.activate)

    app.setStyle('Fusion')
    app.setQuitOnLastWindowClosed(False)

    mouse = ListenerMouse()
    keyboard = ListenerKeyBoard(window)

    app.exec_()


run()
