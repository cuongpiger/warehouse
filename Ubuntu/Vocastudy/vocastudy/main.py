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
VOCAS = "/vocas.csv"
SOUND = "/sounds/"
REVIEW = "/review.json"

NUM_QUES = 150
NUM_NEW_QUES = 15
SAVE = 3

EMPTY_WORD = 0
OLD_WORD = 1
NEW_WORD = 2
WRONG_TRAIN_WORD = 3
WRONG_ANSWER = 4
COMPLETE = 5

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowIcon(QIcon('logo.png'))
        self.setWindowTitle('Vocastudy')
        
        self.wid = {}
        
        self.wid['prg'] = QLabel()
        self.wid['prg'].setStyleSheet('font-weight: bold; font-size: 16px; color: blue')
        
        self.wid['rnw'] = QLabel()
        self.wid['rnw'].setStyleSheet('font-weight: bold; font-size: 12px; color: gray')
        
        self.wid['tws'] = QLabel()
        self.wid['tws'].setStyleSheet('font-weight: bold; font-size: 12px; color: gray')
        
        self.wid['word'] = QLineEdit()
        self.wid['word'].setStyleSheet('font-weight: bold;')
        self.wid['word'].setMinimumWidth(230)
        
        self.wid['type'] = QLineEdit()
        self.wid['type'].setStyleSheet('font-style: italic')
        
        self.wid['phon'] = QLineEdit()
        self.wid['phon'].setMinimumWidth(230)
        
        self.wid['mean'] = QLineEdit()
        
        self.wid['err'] = QLineEdit()
        self.wid['err'].setAlignment(Qt.AlignRight)
        
        self.wid['btn'] = QPushButton('Update')
        self.wid['btn'].setStyleSheet("background-color: rgb(46, 204, 113);")
        self.wid['btn'].clicked.connect(self._update) 
        
        self.wid['psen'] = QTextEdit()
        self.wid['psen'].setMaximumHeight(70)
        self.wid['psen'].setTabChangesFocus(True)  
        
        self.wid['hint'] = QTextEdit()
        self.wid['hint'].setMaximumHeight(70)
        self.wid['hint'].setTabChangesFocus(True)  
        
        self.wid['vns'] = QTextEdit()
        self.wid['vns'].setMaximumHeight(70)
        self.wid['vns'].setTabChangesFocus(True)  

        self.wid['ens'] = QTextEdit()
        self.wid['ens'].setMaximumHeight(70)
        self.wid['ens'].setTabChangesFocus(True) 
        
        self.wid['ans'] = QTextEdit()
        self.wid['ans'].setMaximumHeight(70)
        self.wid['ans'].setTabChangesFocus(True)  
        
        submit = QShortcut(QKeySequence('Ctrl+Return'), self)
        submit.activated.connect(self._submit)
        update = QShortcut(QKeySequence('Ctrl+S'), self)
        update.activated.connect(self._update)
        
        layout = QGridLayout()
        layout.addWidget(self.wid['tws'], 0, 0, alignment=Qt.AlignLeft)
        layout.addWidget(self.wid['prg'], 0, 2, alignment=Qt.AlignTrailing)
        layout.addWidget(self.wid['rnw'], 0, 5, alignment=Qt.AlignRight)
        layout.addWidget(QLabel("Word"), 1, 0)
        layout.addWidget(self.wid['word'], 1, 1)
        layout.addWidget(self.wid['type'], 1, 2)
        layout.addWidget(self.wid['phon'], 1, 3)
        layout.addWidget(QLabel("Error"), 1, 4)
        layout.addWidget(self.wid['err'], 1, 5, alignment=Qt.AlignRight)
        layout.addWidget(QLabel("Meaning"), 2, 0)
        layout.addWidget(self.wid['mean'], 2, 1, 1, 4)
        layout.addWidget(self.wid['btn'], 2, 5, 1, 1)
        layout.addWidget(QLabel("EN sentence"), 3, 0)
        layout.addWidget(self.wid['ens'], 3, 1, 1, 5)
        layout.addWidget(QLabel("Phonetic"), 4, 0)
        layout.addWidget(self.wid['psen'], 4, 1, 1, 5)
        layout.addWidget(QLabel("Hint"), 5, 0)
        layout.addWidget(self.wid['hint'], 5, 1, 1, 5)
        layout.addWidget(QLabel("Question"), 6, 0)
        layout.addWidget(self.wid['vns'], 6, 1, 1, 5)
        layout.addWidget(QLabel("Answer"), 7, 0)
        layout.addWidget(self.wid['ans'], 7, 1, 1, 5)

        frame = QWidget()
        frame.setLayout(layout)
        self.setCentralWidget(frame)
        self._load()

    def _getNext(self):
        if self.cid != -1: self.prevPho = self.vocas.loc[self.cid, 'enp'][self.rid]
        self.cid = random.choice(self.indexes) if len(self.indexes) > 0 else -1
        
        if self.cid != -1: self.rid = random.choice([i for i, x in enumerate(self.vocas.loc[self.cid, 'recorder']) if x <= 0])
        
        if self.cid == -1:
            self.state = COMPLETE
        elif self.vocas.loc[self.cid, 'vn'] == ['']:
            self.state = EMPTY_WORD
        elif self.vocas.loc[self.cid, 'new'] == True:
            self.state = NEW_WORD
        else:
            self.state = OLD_WORD

    def _prepare(self, checker=False):
        for c in ('en', 'enp', 'hint', 'vn', 'recorder'):
            self.vocas[c] = self.vocas[c].apply(eval)
            
        if not checker:
            for i in self.indexes:
                self.vocas.at[i, 'recorder'] = [0 if self.vocas.loc[i, 'new'] == False else -4] * len(self.vocas.loc[i, 'en'])

    def _load(self):
        self.vocas = pd.read_csv(PATH + VOCAS)
        checker = False
        
        if os.path.exists(PATH + REVIEW):
            with open(PATH + REVIEW) as f:
                self.indexes = json.load(f)
                checker = True
        else:
            self.vocas['shuffle'] = random.sample(range(self.vocas.shape[0]), self.vocas.shape[0])
            sorted_vocas = self.vocas.sort_values(by=['error', 'shuffle'])
            self.indexes = list(sorted_vocas[sorted_vocas['new'] == True].index)
            self.indexes = self.indexes[:min(len(self.indexes), NUM_NEW_QUES)]
            self.indexes += list(sorted_vocas[sorted_vocas['new'] == False].index)[:(NUM_QUES - len(self.indexes))]
            self.vocas = self.vocas.drop(columns=['shuffle'])
        
        self.cid = -1
        self.prevPho = ''
        self.save = 0
        self.rnw = self.vocas[self.vocas['new'] == True].shape[0]
        self.wid['tws'].setText('Total words: ' + str(self.vocas.shape[0]))
        self.wid['rnw'].setText('Remaining new words: ' + str(self.rnw))
        
        self._prepare(checker)
        self._getNext()
        self._refreshScreen()

    def _refreshScreen(self):
        self.wid['btn'].setEnabled(True)
        
        if self.cid != -1:
            cpns = {
                'prg': f'Progress: {len(self.indexes)}/{NUM_QUES}',
                'word': self.vocas.loc[self.cid, 'word'],
                'type': self.vocas.loc[self.cid, 'type'],
                'phon': self.vocas.loc[self.cid, 'phonetic'],
                'err': str(self.vocas.loc[self.cid, 'error']),
                'mean': self.vocas.loc[self.cid, 'meaning'],
                'ens': self.vocas.loc[self.cid, 'en'][self.rid],
                'vns': self.vocas.loc[self.cid, 'vn'][self.rid],
                'psen': self.prevPho,
                'hint': self.vocas.loc[self.cid, 'hint'][self.rid],
                'ans': self.wid['ans'].toPlainText().strip().lower(),
                'rnw': 'Remaining new words: ' + str(self.rnw)
            }
        
        if self.state == EMPTY_WORD:
            for k in ('ans', 'ens', 'psen'): cpns[k] = ''
            [self.wid[cpn].setText(str(val)) for cpn, val in cpns.items()]  
            self.wid['ens'].setFocus()              
        elif self.state in (OLD_WORD, NEW_WORD):
            for k in ('ans', 'ens'): cpns[k] = ''
            [self.wid[cpn].setText(val) for cpn, val in cpns.items()]
            self.wid['btn'].setEnabled(False)                
            self.wid['ans'].setFocus()
        elif self.state in (WRONG_ANSWER, WRONG_TRAIN_WORD):
            cpns.pop('ens')
            cpns['psen'] = self.vocas.loc[self.cid, 'enp'][self.rid]
            [self.wid[cpn].setText(val) for cpn, val in cpns.items()]                
            ans, en = self._compare()
            [self.wid[cpn].setHtml(val) for cpn, val in {'ans': ans, 'ens': en}.items()]
            self.wid['ans'].setFocus()
        elif self.state == COMPLETE:
            for k in ('word', 'type', 'phon', 'err', 'mean', 'vns', 'hint', 'ans', 'ens', 'psen'): self.wid[k].setText('')
            self.wid['prg'].setText('🎉 Congratulations 👍')
            self.vocas.to_csv(PATH + VOCAS, index=False)
            if os.path.exists(PATH + REVIEW): os.remove(PATH + REVIEW)
            
    def closeEvent(self, event):
        self._save()
        
    def _save(self):
        if self.state != COMPLETE:
            with open(PATH + REVIEW, 'w') as writer:
                json.dump(self.indexes, writer)
            
        self.vocas.to_csv(PATH + VOCAS, index=False)
            
    def _compare(self):
        ans = self.wid['ans'].toPlainText().strip().lower()
        cor = self.vocas.loc[self.cid, 'en'][self.rid]
        mn = min(len(ans), len(cor))
        
        for i in range(mn):
            if (ans[i] != cor[i]):
                return (
                    '{}<span style="color: red">{}</span>'.format(ans[:i], ans[i:]),
                    '{}<span style="color: green">{}</span>'.format(cor[:i], cor[i:]))    
                
        return (
            '{}<span style="color: red">{}</span>'.format(ans[:mn], ans[mn:]),
            '{}<span style="color: green">{}</span>'.format(cor[:mn], cor[mn:]))          

    def _submit(self):
        if self.state == NEW_WORD:
            path = f"{PATH}{SOUND}{self.vocas.loc[self.cid, 'id']}_{self.rid}.mp3"
            self._genSoundNSenPho(path)
            self.vocas.loc[self.cid, 'recorder'][self.rid] += 1
            path = f"{PATH}{SOUND}{self.vocas.loc[self.cid, 'id']}_{self.rid}.mp3"
            ans = self.wid['ans'].toPlainText().strip().lower()
            cor = self.vocas.loc[self.cid, 'en'][self.rid]
            
            if ans == cor:
                if sum(self.vocas.loc[self.cid, 'recorder']) == len(self.vocas.loc[self.cid, 'recorder']):
                    self.vocas.loc[self.cid, 'new'] = False
                    self.vocas.loc[self.cid, 'error'] = -5
                    self.vocas.at[self.cid, 'recorder'] = [0]*len(self.vocas.loc[self.cid, 'recorder'])
                    self.rnw -= 1
                self._getNext()
            else:
                self.state = WRONG_TRAIN_WORD
                if sum(self.vocas.loc[self.cid, 'recorder']) == len(self.vocas.loc[self.cid, 'recorder']):
                    self.vocas.loc[self.cid, 'new'] = False
                    self.vocas.loc[self.cid, 'error'] = -5
                    self.vocas.at[self.cid, 'recorder'] = [0]*len(self.vocas.loc[self.cid, 'recorder'])
                    self.rnw -= 1
                
            self._refreshScreen()
            self._playSound(path)
        elif self.state == OLD_WORD:
            path = f"{PATH}{SOUND}{self.vocas.loc[self.cid, 'id']}_{self.rid}.mp3"
            self._genSoundNSenPho(path)
            ans = self.wid['ans'].toPlainText().strip().lower()
            cor = self.vocas.loc[self.cid, 'en'][self.rid]
            
            if ans == cor:
                self.vocas.loc[self.cid, 'recorder'][self.rid] += 1
                if sum(self.vocas.loc[self.cid, 'recorder']) == len(self.vocas.loc[self.cid, 'recorder']):
                    self.vocas.loc[self.cid, 'error'] += 1
                    self.indexes.remove(self.cid)
                self._getNext()
            else:
                self.vocas.loc[self.cid, 'error'] -= 1
                self.vocas.loc[self.cid, 'recorder'][self.rid] -= 1
                self.state = WRONG_ANSWER
                
            self._refreshScreen()
            self._playSound(path)
        elif self.state in (WRONG_ANSWER, WRONG_TRAIN_WORD):
            self._getNext()
            self._refreshScreen()
            
        self.save = (self.save + 1) % SAVE
        if self.save == 0: self._save()
                
    def _update(self):
        if self.state in (EMPTY_WORD, WRONG_TRAIN_WORD, WRONG_ANSWER):
            ens = self.wid['ens'].toPlainText().strip().lower().split('\n')
            vns = self.wid['vns'].toPlainText().strip().lower().split('\n')
            hints = self.wid['hint'].toPlainText().strip().split('\n')
            hints = hints + ['']*(len(ens) - len(hints))
            
            self.vocas.loc[self.cid, 'word'] = self.wid['word'].text().strip().lower()
            self.vocas.loc[self.cid, 'type'] = self.wid['type'].text().strip().lower()
            self.vocas.loc[self.cid, 'phonetic'] = ipa.convert(self.vocas.loc[self.cid, 'word'])
            self.vocas.loc[self.cid, 'error'] = int(self.wid['err'].text().strip().lower())
            self.vocas.loc[self.cid, 'meaning'] = self.wid['mean'].text().strip().lower()
            self.vocas.loc[self.cid, 'en'][self.rid] = ens[0]
            self.vocas.loc[self.cid, 'vn'][self.rid] = vns[0]
            self.vocas.loc[self.cid, 'hint'][self.rid] = '' if hints[0] == '_' else hints[0]
            self.vocas.loc[self.cid, 'enp'][self.rid] = ipa.convert(ens[0])
            
            for i in range(1, len(ens)):
                self.vocas.loc[self.cid, 'en'].append(ens[i])
                self.vocas.loc[self.cid, 'vn'].append(vns[i])
                self.vocas.loc[self.cid, 'hint'].append('' if hints[i] == '_' else hints[i])
                self.vocas.loc[self.cid, 'enp'].append(ipa.convert(ens[i]))
                self.vocas.loc[self.cid, 'recorder'].append(-4)
                
            path = f"{PATH}{SOUND}{self.vocas.loc[self.cid, 'id']}_{self.rid}.mp3"
            self._genSoundNSenPho(path, True)
            self._getNext()
            self._refreshScreen()
            self._playSound(path)
            
    def _genSoundNSenPho(self, path, force=False):
        if (not os.path.exists(path)) or force:
            try:
                tts = gTTS(text=self.vocas.loc[self.cid, 'en'][self.rid])
                tts.save(path)
            except:
                pass
            
        if self.vocas.loc[self.cid, 'enp'][self.rid] == '':
            ipa.convert(self.vocas.loc[self.cid, 'en'][self.rid])

    def _playSound(self, path):
        if os.path.exists(path):
            threading.Thread(target=playsound(path), args=(None)).start()

app = QApplication(sys.argv)

window = MainWindow()
window.show()

app.exec_()