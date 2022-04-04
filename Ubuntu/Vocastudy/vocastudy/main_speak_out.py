import os
import sys
import json
import pandas as pd
import random
import threading
import eng_to_ipa as ipa
from PySide2.QtCore import Qt
from playsound import playsound
from gtts import gTTS
from PySide2.QtGui import QKeySequence, QIcon
from PySide2.QtWidgets import QApplication, QGridLayout, QLineEdit, QMainWindow, QPushButton, QShortcut, QTextEdit, QLabel, QWidget


PATH = "/home/manhcuong/Documents/English/data"
SOUND_PATH = "/sounds/"
VOCAS = "/vocas.csv"
REVIEW = "/review.json"

NUM_QUES = 150
NUM_NEW_QUES = 15
NUM_TRAIN_TIME = 5

EMPTY_WORD = 0
OLD_WORD = 1
NEW_WORD = 2
WRONG_TRAIN_WORD = 3
WRONG_ANSWER = 4
COMPLETE = 5


SPEAK = True # text to speak

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowIcon(QIcon('logo.png'))
        self.setWindowTitle("Vocastudy")
        self.iwidgets = {}
        
        self.iwidgets['process'] = QLabel()
        self.iwidgets['process'].setStyleSheet("font-weight: bold; font-size: 16px");
        
        self.iwidgets['volume'] = QLabel()
        self.iwidgets['volume'].setStyleSheet("font-weight: bold; font-size: 14px; color: red");
        
        self.iwidgets['train'] = QLabel()
        self.iwidgets['train'].setStyleSheet("font-weight: bold; font-size: 12px");
        
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
        
        self.iwidgets['sen_spelling'] = QTextEdit()
        self.iwidgets['sen_spelling'].setMaximumHeight(70)
        self.iwidgets['sen_spelling'].setTabChangesFocus(True)
        
        self.iwidgets['vietnamese'] = QTextEdit()
        self.iwidgets['vietnamese'].setMaximumHeight(70)
        self.iwidgets['vietnamese'].setTabChangesFocus(True)
        
        self.iwidgets['answer'] = QTextEdit()
        self.iwidgets['answer'].setMaximumHeight(100)
        self.iwidgets['answer'].setTabChangesFocus(True)
        
        self.iwidgets['button'] = QPushButton("Update")
        self.iwidgets['button'].clicked.connect(self._updateButton2)
        
        layout = QGridLayout()
        layout.addWidget(self.iwidgets['process'], 0, 0, 1, 9, alignment=Qt.AlignCenter)
        layout.addWidget(self.iwidgets['volume'], 0, 8, alignment=Qt.AlignRight)
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
        layout.addWidget(self.iwidgets['sen_spelling'], 6, 1, 1, 9)
        layout.addWidget(QLabel("Your\nanswer:"), 7, 0)
        layout.addWidget(self.iwidgets['answer'], 7, 1, 1, 9)

        submit_shorcut = QShortcut(QKeySequence('Ctrl+Return'), self)
        submit_shorcut.activated.connect(self._submitAnswer2)
        update_shorcut = QShortcut(QKeySequence('Ctrl+S'), self)
        update_shorcut.activated.connect(self._updateButton2)

        frame = QWidget()
        frame.setLayout(layout)
        self.setCentralWidget(frame)
        self._loadLesson()
        self._updateFrame2()
        
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
            
            
    def _submitAnswer2(self):
        if self.state == NEW_WORD:
            self.vocas.loc[self.current_id, 'error'] -= 1
            
            answer = "|".join(self.iwidgets['answer'].toPlainText().strip().lower().split("\n"))
            correct = self.vocas.loc[self.current_id, 'english'].strip().lower()
            
            # Read the english sentences out loud
            sound_out_path = f"{PATH}{SOUND_PATH}{self.current_id}.mp3"
            if not os.path.isfile(sound_out_path):
                speech = gTTS(text=correct)
                speech.save(sound_out_path)
            
            if self.vocas.loc[self.current_id, 'sen_spelling'] == "":
                self.vocas.loc[self.current_id, 'sen_spelling'] = self._updateSentenceSpelling()
                
            if self.vocas.loc[self.current_id, 'error'] == -NUM_TRAIN_TIME:
                self.vocas.loc[self.current_id, 'new'] = False
            
            if answer == correct:
                self.current_id = self._getNewWord()
                self.state = self._updateState()
            else:
                self.state = WRONG_TRAIN_WORD
                
            self._updateFrame2()
            threading.Thread(target=playsound(sound_out_path), args=(None)).start()
        elif self.state == OLD_WORD:
            answer = "|".join(self.iwidgets['answer'].toPlainText().strip().lower().split("\n"))
            correct = self.vocas.loc[self.current_id, 'english'].strip().lower()
            
            # Read the english sentences out loud
            sound_out_path = f"{PATH}{SOUND_PATH}{self.current_id}.mp3"
            if not os.path.isfile(sound_out_path):
                speech = gTTS(text=correct)
                speech.save(sound_out_path)
            
            if self.vocas.loc[self.current_id, 'sen_spelling'] == "":
                self.vocas.loc[self.current_id, 'sen_spelling'] = self._updateSentenceSpelling()
            
            if answer == correct:
                self.vocas.loc[self.current_id, 'error'] += 1
                self.indexes.remove(self.current_id)
                self.current_id = self._getNewWord()
                self.state = self._updateState()
            else:
                self.vocas.loc[self.current_id, 'error'] -= 1
                self.state = WRONG_ANSWER
                
            self._updateFrame2()
            threading.Thread(target=playsound(sound_out_path), args=(None)).start()
        elif self.state in (WRONG_TRAIN_WORD, WRONG_ANSWER):
            self.current_id = self._getNewWord()
            self.state = self._updateState()
            self._updateFrame2()
            
    
    def _updateSentenceSpelling(self, pupdate=False):
        if not pupdate:
            return ipa.convert(self.vocas.loc[self.current_id, 'english']).replace("|*", "|")
        return ipa.convert(self.iwidgets['english'].toPlainText().strip().lower().replace("\n", "|")).replace("|*", "|")

            
    def _updateButton2(self):
        if self.state in (EMPTY_WORD, WRONG_TRAIN_WORD, WRONG_ANSWER):
            en_sentences = self.iwidgets['english'].toPlainText().strip().lower().replace("\n", "|")
            self.vocas.iloc[self.current_id, 0:9] = [
                self.iwidgets['word'].text().strip().lower(), 
                ipa.convert(self.iwidgets['word'].text().strip().lower()), 
                self.iwidgets['type'].text().strip().lower(), 
                self.iwidgets['meaning'].text().strip(), 
                en_sentences,
                self._updateSentenceSpelling(True).strip().replace("\n", "|"),
                self.iwidgets['hint'].toPlainText().strip().replace("\n", "|"),
                self.iwidgets['vietnamese'].toPlainText().strip().lower().replace("\n", "|"),
                int(self.iwidgets['error'].text().strip())
            ]
            
            sound_out_path = f"{PATH}{SOUND_PATH}{self.current_id}.mp3"
            speech = gTTS(text=en_sentences)
            speech.save(sound_out_path)
            
            self.current_id = self._getNewWord()
            self.state = self._updateState()
            self._updateFrame2()
            playsound(sound_out_path)
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
        
    def _clearFrame(self, plst_widgets=None):
        if plst_widgets is None: [self.iwidgets[wn].clear() for wn in ['process', 'word', 'type', 'error', 'spelling', 'meaning', 'english', 'sen_spelling', 'vietnamese', 'hint', 'answer']]
        else: [self.iwidgets[wn].clear() for wn in plst_widgets]
        
        self.iwidgets["answer"].setPlainText("")
        
        
    def _updateFrame2(self):
        self.iwidgets['button'].setEnabled(True)
        
        if self.state == EMPTY_WORD:
            args_dict = {
                'process': f"Process: {len(self.indexes):02d}/{NUM_QUES}\n",
                'word': self.vocas.loc[self.current_id, 'word'].strip(),
                'spelling': self.vocas.loc[self.current_id, 'spelling'].strip(),
                'type': self.vocas.loc[self.current_id, 'type'].strip(),
                'meaning': self.vocas.loc[self.current_id, 'meaning'].strip(),
                'hint': self.vocas.loc[self.current_id, 'hint'].strip().replace("|", "\n"),
                'vietnamese': self.vocas.loc[self.current_id, 'vietnamese'].strip().replace('|', "\n"),
                'error': str(self.vocas.loc[self.current_id, 'error']),
            }
            
            self._setText(args_dict)
            self._clearFrame(('english', 'sen_spelling', 'answer'))
            self.iwidgets['english'].setFocus()
        elif self.state in (OLD_WORD, NEW_WORD):
            args_dict = {
                'process': f"Process: {len(self.indexes):02d}/{NUM_QUES}\n",
                'word': self.vocas.loc[self.current_id, 'word'].strip(),
                'spelling': self.vocas.loc[self.current_id, 'spelling'].strip(),
                'type': self.vocas.loc[self.current_id, 'type'].strip(),
                'meaning': self.vocas.loc[self.current_id, 'meaning'].strip(),
                'hint': self.vocas.loc[self.current_id, 'hint'].strip().replace("|", "\n"),
                'vietnamese': self.vocas.loc[self.current_id, 'vietnamese'].strip().replace('|', "\n"),
                'error': str(self.vocas.loc[self.current_id, 'error'])
            }
            
            self._setText(args_dict)
            self._clearFrame(('english', 'sen_spelling', 'answer'))
            self.iwidgets['button'].setEnabled(False) 
            self.iwidgets['answer'].setFocus()
        elif self.state in (WRONG_TRAIN_WORD, WRONG_ANSWER):
            answer, english = self._judge(self.iwidgets['answer'].toPlainText(),
                                              self.vocas.loc[self.current_id, 'english'])
            self._setText({
                'process': f"Process: {len(self.indexes):02d}/{NUM_QUES}\n",
                'word': self.vocas.loc[self.current_id, 'word'].strip(),
                'spelling': self.vocas.loc[self.current_id, 'spelling'].strip(),
                'type': self.vocas.loc[self.current_id, 'type'].strip(),
                'meaning': self.vocas.loc[self.current_id, 'meaning'].strip(),
                'hint': self.vocas.loc[self.current_id, 'hint'].strip().replace("|", "\n"),
                'error': str(self.vocas.loc[self.current_id, 'error']),
                'sen_spelling': self.vocas.loc[self.current_id, 'sen_spelling'].strip().replace("|", "\n")
            })
            self._setHtml({
                'answer': answer, 'english': english
            })
            
            self.iwidgets['answer'].setFocus()
        elif self.state == COMPLETE:
            self._clearFrame()
            self._setText({'button': 'Refresh', "process": '🎉 Done 👍'})
            self._saveData()
            
            self.iwidgets['answer'].setFocus()
                   
            
        
    def _updateState(self):
        if self.current_id == -1: return COMPLETE
        
        if self.vocas.loc[self.current_id, 'vietnamese'].strip() == "":
            return EMPTY_WORD
        elif self.vocas.loc[self.current_id, 'new'] == True:
            return NEW_WORD
        
        return OLD_WORD
                
        
    def _loadLesson(self):
        self.vocas = pd.read_csv(PATH + VOCAS)
        
        if os.path.exists(PATH + REVIEW):
            with open(PATH + REVIEW) as reader:
                self.indexes = json.load(reader)
        else:
            self.vocas['shuffle'] = random.sample(range(self.vocas.shape[0]), self.vocas.shape[0])
            
            sorted_vocas = self.vocas.sort_values(by=['error', 'shuffle'])
            self.indexes = list(sorted_vocas[sorted_vocas['new'] == True].index)
            self.indexes = self.indexes[:min(len(self.indexes), NUM_NEW_QUES)]
            self.indexes += list(sorted_vocas[sorted_vocas['new'] == False].index)[:(NUM_QUES - len(self.indexes))]
            
            self.vocas = self.vocas.drop(columns=['shuffle'])

        self.vocas.fillna("", inplace=True)
        self.current_id = random.choice(self.indexes)
        self.state = self._updateState()
        
        no_new_words = self.vocas[self.vocas['new'] == True].shape[0] - 15
        self.iwidgets['volume'].setText(f"Remaining new words/Total: {no_new_words}/{self.vocas.shape[0]}")
        

app = QApplication(sys.argv)
app.setStyle("Fusion")

window = MainWindow()
window.show()

app.exec_()