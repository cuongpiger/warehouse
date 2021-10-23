import os
import sys
import json
import pandas as pd
import random
from PySide2.QtCore import Qt
from PySide2.QtGui import QKeySequence, QIcon
from PySide2.QtWidgets import QApplication, QGridLayout, QLineEdit, QMainWindow, QPushButton, QShortcut, QTextEdit, QLabel, QWidget


PATH = "/home/manhcuong/Documents/English/data"
VOCAS = "/vocas.csv"
REVIEW = "/review.json"
IS_SEN = 0
IS_WORD = 1
WRONG_WORD = 2
WRONG_SEN = 3
COMPLETE = 4

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowIcon(QIcon('logo.png'))
        self.setWindowTitle("Vocastudy")
        self.iwidgets = {}
        
        self.iwidgets['process'] = QLabel()
        self.iwidgets['process'].setStyleSheet("font-weight: bold; font-size: 16px");
        
        self.iwidgets['word'] = QLineEdit()
        self.iwidgets['word'].setMinimumWidth(250)
        
        self.iwidgets['type'] = QLineEdit()
        self.iwidgets['type'].setMaximumWidth(100)
        
        self.iwidgets['error'] = QLineEdit()
        self.iwidgets['error'].setMaximumWidth(100)
        
        self.iwidgets['meaning'] = QLineEdit()
        self.iwidgets['meaning'].setMinimumWidth(300)
        
        self.iwidgets['spelling'] = QLineEdit()
        self.iwidgets['spelling'].setMinimumWidth(250)
        
        self.iwidgets['hint'] = QTextEdit()
        self.iwidgets['hint'].setMaximumHeight(50)
        self.iwidgets['hint'].setTabChangesFocus(True)
        
        self.iwidgets['english'] = QTextEdit()
        self.iwidgets['english'].setMaximumHeight(70)
        self.iwidgets['english'].setTabChangesFocus(True)
        
        self.iwidgets['vietnamese'] = QTextEdit()
        self.iwidgets['vietnamese'].setMaximumHeight(70)
        self.iwidgets['vietnamese'].setTabChangesFocus(True)
        
        self.iwidgets['answer'] = QTextEdit()
        self.iwidgets['answer'].setMaximumHeight(100)
        self.iwidgets['answer'].setTabChangesFocus(True)
        
        self.iwidgets['button'] = QPushButton("Update")
        self.iwidgets['button'].clicked.connect(self._updateButton)
        
        layout = QGridLayout()
        layout.addWidget(self.iwidgets['process'], 0, 0, 1, 10, alignment=Qt.AlignCenter)
        layout.addWidget(QLabel("Word:"), 1, 0)
        layout.addWidget(self.iwidgets['word'], 1, 1, 1, 3)
        layout.addWidget(QLabel("Type:"), 1, 4)
        layout.addWidget(self.iwidgets['type'], 1, 5)
        layout.addWidget(QLabel("Error:"), 1, 6)
        layout.addWidget(self.iwidgets['error'], 1, 7)
        layout.addWidget(self.iwidgets['button'], 1, 8, 1, 2)
        layout.addWidget(QLabel("Spelling:"), 2, 0)
        layout.addWidget(self.iwidgets['spelling'], 2, 1, 1, 3)
        layout.addWidget(QLabel("Meaning:"), 2, 4)
        layout.addWidget(self.iwidgets['meaning'], 2, 5, 1, 5)
        layout.addWidget(QLabel("Hint:"), 3, 0)
        layout.addWidget(self.iwidgets['hint'], 3, 1, 1, 9)
        layout.addWidget(QLabel("Vietnamese\nsentence:"), 4, 0)
        layout.addWidget(self.iwidgets['vietnamese'], 4, 1, 1, 9)
        layout.addWidget(QLabel("English\nsentence:"), 5, 0)
        layout.addWidget(self.iwidgets['english'], 5, 1, 1, 9)
        layout.addWidget(QLabel("Your\nanswer:"), 6, 0)
        layout.addWidget(self.iwidgets['answer'], 6, 1, 1, 9)

        submit_shorcut = QShortcut(QKeySequence('Ctrl+Return'), self)
        submit_shorcut.activated.connect(self._submitAnswer)
        update_shorcut = QShortcut(QKeySequence('Ctrl+S'), self)
        update_shorcut.activated.connect(self._updateButton)

        frame = QWidget()
        frame.setLayout(layout)
        self.setCentralWidget(frame)
        self._loadLesson()
        self._updateFrame()
        
    def closeEvent(self, event):
        if self.state != COMPLETE:
            with open(PATH + REVIEW, 'w') as writer:
                json.dump(self.indexes, writer)
            
        self.vocas.to_csv(PATH + VOCAS, index=False)
        
    def _saveData(self):
        self.vocas.to_csv(PATH + VOCAS, index=False)
        if os.path.exists(PATH + REVIEW): os.remove(PATH + REVIEW)
        
        
    def _judge(self, panswer, pcorrect):
        panswer = panswer.strip().replace("|", "<br>")
        pcorrect = pcorrect.strip().replace("|", "<br>")
        answer = panswer.lower()
        correct = pcorrect.lower()
        
        for i in range(min(len(answer), len(correct))):
            if answer[i] != correct[i]:
                new_answer = '{}<span style="color: red">{}</span>'.format(panswer[:i], panswer[i:])
                new_correct = '{}<span style="color: green">{}</span>'.format(pcorrect[:i], pcorrect[i:])
                
                return new_answer, new_correct
            
        i = min(len(answer), len(correct))
        new_answer = '{}<span style="color: red">{}</span>'.format(panswer[:i], panswer[i:])
        new_correct = '{}<span style="color: green">{}</span>'.format(pcorrect[:i], pcorrect[i:])
        return new_answer, new_correct
    
    def _getNewWord(self):
        if len(self.indexes) > 0: return random.choice(self.indexes)
        return -1
        
    def _submitAnswer(self):
        if self.state == IS_WORD:
            answer = self.iwidgets['answer'].toPlainText().strip()
            correct = self.vocas.loc[self.current_id, 'word'].strip()
            
            if answer == correct:
                self.vocas.loc[self.current_id, 'error'] += 1
                self.indexes.remove(self.current_id)
                self.current_id = self._getNewWord()
                self.state = self._updateState()
            else:
                self.vocas.loc[self.current_id, 'error'] -= 1
                self.state = WRONG_WORD
            
            self._updateFrame()
        elif self.state == IS_SEN:
            answer = "|".join(self.iwidgets['answer'].toPlainText().strip().lower().split("\n"))
            correct = self.vocas.loc[self.current_id, 'english'].strip().lower().strip()
            
            if answer == correct:
                self.vocas.loc[self.current_id, 'error'] += 1
                self.indexes.remove(self.current_id)
                self.current_id = self._getNewWord()
                self.state = self._updateState()
            else:
                self.vocas.loc[self.current_id, 'error'] -= 1
                self.state = WRONG_SEN
            
            self._updateFrame()
        elif self.state in (WRONG_WORD, WRONG_SEN):
            self.current_id = self._getNewWord()
            self.state = self._updateState()
            self._updateFrame()
        
    def _updateButton(self):
        if self.state in (WRONG_WORD, WRONG_SEN):
            self.vocas.iloc[self.current_id, 0:8] = [
                self.iwidgets['word'].text().strip().lower(), 
                self.iwidgets['spelling'].text().strip(), 
                self.iwidgets['type'].text().strip().lower(), 
                self.iwidgets['meaning'].text().strip(), 
                self.iwidgets['english'].toPlainText().strip().lower().replace("\n", "|"),
                self.iwidgets['hint'].toPlainText().strip().replace("\n", "|"),
                self.iwidgets['vietnamese'].toPlainText().strip().lower().replace("\n", "|"),
                int(self.iwidgets['error'].text().strip())
            ]
            
            self.current_id = self._getNewWord()
            self.state = self._updateState()
            self._updateFrame()
        elif self.state == COMPLETE:
            self._setText({'button':'Update'})
            self._loadLesson()
            self._updateFrame()
            
    def _setText(self, pdict_widgets):
        for name, value in pdict_widgets.items():
            self.iwidgets[name].setText(value)
        
    def _setHtml(self, pdict_widgets):
        for name, value in pdict_widgets.items():
            self.iwidgets[name].setHtml(value)       
        
    def _clearFrame(self, plst_widgets = None):
        if plst_widgets is None: [self.iwidgets[wn].clear() for wn in ['process', 'word', 'type', 'error', 'spelling', 'meaning', 'english', 'vietnamese', 'hint', 'answer']]
        else: [self.iwidgets[wn].clear() for wn in plst_widgets]
            
    def _updateFrame(self):
        self.iwidgets['button'].setEnabled(True)
        if self.state in (IS_WORD, IS_SEN):
            args_dict = {
                'process': f"Process: {len(self.indexes):02d}/{self.amount_vocas:02d}\n",
                'word': self.vocas.loc[self.current_id, 'word'].strip(),
                'spelling': self.vocas.loc[self.current_id, 'spelling'].strip(),
                'type': self.vocas.loc[self.current_id, 'type'].strip(),
                'meaning': self.vocas.loc[self.current_id, 'meaning'].strip(),
                'hint': self.vocas.loc[self.current_id, 'hint'].strip().replace("|", "\n"),
                'vietnamese': self.vocas.loc[self.current_id, 'vietnamese'].strip().replace('|', "\n"),
                'error': str(self.vocas.loc[self.current_id, 'error'])
            }
            
            if self.state == IS_WORD: [args_dict.update({wn:""}) for wn in ['word', 'spelling']]
            
            self._setText(args_dict)
            self._clearFrame(('english', 'answer'))
            self.iwidgets['button'].setEnabled(False)
        elif self.state == WRONG_WORD:
            answer, english = self._judge(self.iwidgets['answer'].toPlainText(),
                                              self.vocas.loc[self.current_id, 'word'])
            self._setText({
                'process': f"Process: {len(self.indexes):02d}/{self.amount_vocas:02d}\n",
                'word': self.vocas.loc[self.current_id, 'word'].strip(),
                'spelling': self.vocas.loc[self.current_id, 'spelling'].strip(),
                'type': self.vocas.loc[self.current_id, 'type'].strip(),
                'meaning': self.vocas.loc[self.current_id, 'meaning'].strip(),
                'hint': self.vocas.loc[self.current_id, 'hint'].strip(),
                'error': str(self.vocas.loc[self.current_id, 'error'])
            })
            self._setHtml({
                'answer': answer, 'english': english
            })
        elif self.state == WRONG_SEN:
            answer, english = self._judge(self.iwidgets['answer'].toPlainText(),
                                              self.vocas.loc[self.current_id, 'english'])
            self._setText({
                'process': f"Process: {len(self.indexes):02d}/{self.amount_vocas:02d}\n",
                'word': self.vocas.loc[self.current_id, 'word'].strip(),
                'spelling': self.vocas.loc[self.current_id, 'spelling'].strip(),
                'type': self.vocas.loc[self.current_id, 'type'].strip(),
                'meaning': self.vocas.loc[self.current_id, 'meaning'].strip(),
                'hint': self.vocas.loc[self.current_id, 'hint'].strip().replace("|", "\n"),
                'error': str(self.vocas.loc[self.current_id, 'error'])
            })
            self._setHtml({
                'answer': answer, 'english': english
            })
        elif self.state == COMPLETE:
            self._clearFrame()
            self._setText({'button': 'Refresh', "process": '🎉 Done 👍'})
            self._saveData()
        
        self.iwidgets['answer'].setFocus()
        
    def _updateState(self):
        if self.current_id == -1: return COMPLETE
        return IS_WORD if self.vocas.loc[self.current_id, 'english'].strip() == "" else IS_SEN 
        
    def _loadLesson(self):
        self.vocas = pd.read_csv(PATH + VOCAS)
        if os.path.exists(PATH + REVIEW):
            with open(PATH + REVIEW) as reader:
                self.indexes = json.load(reader)
        else:
            self.indexes = list(self.vocas.sort_values(by=['error']).index)[:50]

        self.vocas.fillna("", inplace=True)
        self.amount_vocas = min(50, len(self.indexes))
        self.current_id = random.choice(self.indexes)
        self.state = self._updateState()
        

app = QApplication(sys.argv)
app.setStyle("Fusion")

window = MainWindow()
window.show()

app.exec_()