import os
import sys
import json
import pandas as pd
import random
from PySide2.QtGui import QKeySequence, QIcon
from PySide2.QtWidgets import QApplication, QGridLayout, QLineEdit, QMainWindow, QPushButton, QShortcut, QTextEdit, QLabel, QWidget


PATH = "/home/manhcuong/Documents/English/data"

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowIcon(QIcon('logo.png'))
        self.setWindowTitle("Vocastudy")
        
        self.iprocess = QLabel()
        self.iprocess.setStyleSheet("font-weight: bold; font-size: 16px");
        
        self.ivoca = QLineEdit()
        self.ivoca.setObjectName("ivoca")
        self.ivoca.setMinimumWidth(250)
        
        self.itype = QLineEdit()
        self.itype.setObjectName("itype")
        self.itype.setMaximumWidth(100)
        
        self.ierror = QLineEdit()
        self.ierror.setObjectName("ierror")
        self.ierror.setMaximumWidth(100)
        
        self.imeaning = QLineEdit()
        self.imeaning.setObjectName("imeaning")
        self.imeaning.setMinimumWidth(300)
        
        self.ispelling = QLineEdit()
        self.ispelling.setObjectName("ispelling")
        self.ispelling.setMinimumWidth(250)
        
        self.ihint =  QTextEdit()
        self.ihint.setObjectName("ihint")
        self.ihint.setMaximumHeight(50)
        self.ihint.setTabChangesFocus(True)
        
        self.ienglish_sentence = QTextEdit()
        self.ienglish_sentence.setObjectName("ienglish_sentence")
        self.ienglish_sentence.setMaximumHeight(70)
        self.ienglish_sentence.setTabChangesFocus(True)
        
        self.ivietnamese_sentence = QTextEdit()
        self.ivietnamese_sentence.setObjectName("ivietname_sentence")
        self.ivietnamese_sentence.setMaximumHeight(70)
        self.ivietnamese_sentence.setTabChangesFocus(True)
        
        self.ianswer = QTextEdit()
        self.ianswer.setObjectName("ianswer")
        self.ianswer.setMaximumHeight(100)
        self.ianswer.setTabChangesFocus(True)
        
        self.ibutton = QPushButton("Update")
        self.ibutton.clicked.connect(self._updateButtonSubmit)
        
        layout = QGridLayout()
        layout.addWidget(self.iprocess, 0, 4, 1, 4)
        layout.addWidget(QLabel("Word:"), 1, 0)
        layout.addWidget(self.ivoca, 1, 1, 1, 3)
        layout.addWidget(QLabel("Type:"), 1, 4)
        layout.addWidget(self.itype, 1, 5)
        layout.addWidget(QLabel("Error:"), 1, 6)
        layout.addWidget(self.ierror, 1, 7)
        layout.addWidget(self.ibutton, 1, 8, 1, 2)
        layout.addWidget(QLabel("Spelling:"), 2, 0)
        layout.addWidget(self.ispelling, 2, 1, 1, 3)
        layout.addWidget(QLabel("Meaning:"), 2, 4)
        layout.addWidget(self.imeaning, 2, 5, 1, 5)
        layout.addWidget(QLabel("Hint:"), 3, 0)
        layout.addWidget(self.ihint, 3, 1, 1, 9)
        layout.addWidget(QLabel("Vietnamese\nsentence:"), 4, 0)
        layout.addWidget(self.ivietnamese_sentence, 4, 1, 1, 9)
        layout.addWidget(QLabel("English\nsentence:"), 5, 0)
        layout.addWidget(self.ienglish_sentence, 5, 1, 1, 9)
        layout.addWidget(QLabel("Your\nanswer:"), 6, 0)
        layout.addWidget(self.ianswer, 6, 1, 1, 9)

        submit_shorcut = QShortcut(QKeySequence('Ctrl+Return'), self)
        submit_shorcut.activated.connect(self._submitAnswer)

        iframe = QWidget()
        iframe.setLayout(layout)
        self.setCentralWidget(iframe)
        self._loadLesson()
        self._updateFrame()
        self.wrong = False
        
    def closeEvent(self, event):
        if self.current_id >= 0:
            with open(PATH + "/review.json", 'w') as writer:
                json.dump(self.indexes, writer)
            
        self.vocas.to_csv(PATH + "/vocas.csv", index=False)
        
    def _judge(self):
        answer = self.ianswer.toPlainText().strip()
        correct = '\n'.join(self.vocas.loc[self.current_id, 'english'].strip().split('|'))
        
        for i in range(min(len(answer), len(correct))):
            if answer[i] != correct[i]:
                new_answer = '{}<span style="color: red">{}</span>'.format(answer[:i], answer[i:])
                new_correct = '{}<span style="color: green">{}</span>'.format(correct[:i], correct[i:])
                
                return new_answer, new_correct
            
        return answer, correct
        
    def _submitAnswer(self):
        if self.current_id == -1 or self.current_id == -2:
            return
        
        if self.wrong:
            self.current_id = random.choice(self.indexes) if len(self.indexes) != 0 else -1
            self._updateFrame()
            self.wrong = False
            return
        
        text = '|'.join(self.ianswer.toPlainText().strip().split('\n'))
        if self.vocas.loc[self.current_id, 'english'].strip() == "":
            if self.vocas.loc[self.current_id, 'word'].strip() == text:
                self.vocas.loc[self.current_id, 'error'] += 1
                self._updateFrame(True)
                self.indexes.remove(self.current_id)
                self.wrong = True
            else:
                self.vocas.loc[self.current_id, 'error'] -= 1
                self.ivoca.setText(self.vocas['word'][self.current_id].strip())
                self.ispelling.setText(self.vocas['spelling'][self.current_id].strip())
                self.wrong = True
                self.ianswer.setText(self.ianswer.toPlainText().strip())
        elif text == self.vocas['english'][self.current_id].strip():
            self.indexes.remove(self.current_id)
            self.vocas.loc[self.current_id, 'error'] += 1
            self.wrong = False
            self.current_id = random.choice(self.indexes) if len(self.indexes) != 0 else -1
            self._updateFrame()
        else:
            self.vocas.loc[self.current_id, 'error'] -= 1
            self.ienglish_sentence.setText(self.vocas['english'][self.current_id].strip())
            self.wrong = True
            new_answer, new_correct = self._judge()
            self.ianswer.setHtml(new_answer)
            self.ienglish_sentence.setHtml(new_correct)
            
        if self.current_id == -1:
            self._updateFrame()
            self.current_id = -2
            self.vocas.to_csv(PATH + "/vocas.csv", index=False)
            
            if os.path.exists(PATH + "/review.json"):
                os.remove(PATH + "/review.json")
        
    def _updateButtonSubmit(self):
        if self.ibutton.text() == "Update" and self.wrong:
            # word,spelling,type,meaning,english,hint,vietnamese,error,path,id
            self.vocas.iloc[self.current_id, 0:8] = [self.ivoca.text().strip(), 
                                                  self.ispelling.text().strip(), 
                                                  self.itype.text().strip(), 
                                                  self.imeaning.text().strip(), 
                                                  "|".join(self.ienglish_sentence.toPlainText().strip().split("\n")),
                                                  self.ihint.toPlainText().strip(),
                                                  "|".join(self.ivietnamese_sentence.toPlainText().strip().split("\n")),
                                                  int(self.ierror.text().strip())]
            self.ianswer.setFocus()
        elif self.ibutton.text() == "Refresh":
            self._loadLesson()
            self._updateFrame()
            self.wrong = False
            self.ibutton.setText("Update")
            
        
    def _updateFrame(self, flag=False):
        if self.current_id == -2:
            return
        
        if self.current_id == -1:
            self.iprocess.setText("Process: 00/00\n")
            self.ivoca.clear()
            self.itype.clear()
            self.ierror.clear()
            self.ispelling.clear()
            self.imeaning.clear()
            self.ivietnamese_sentence.clear()
            self.ihint.clear()
            self.ianswer.clear()
            self.ienglish_sentence.clear()
            self.ibutton.setText("Refresh")
            return
        
        self.iprocess.setText(f"Process: {len(self.indexes):02d}/{self.amount_vocas:02d}\n")
        self.itype.setText(self.vocas['type'][self.current_id])
        self.ierror.setText(str(self.vocas['error'][self.current_id]))
        self.imeaning.setText(self.vocas['meaning'][self.current_id])
        self.ivietnamese_sentence.setText(self.vocas['vietnamese'][self.current_id])
        self.ihint.setText(self.vocas['hint'][self.current_id])
        self.ivoca.setText(self.vocas['word'][self.current_id])
        self.ispelling.setText(self.vocas['spelling'][self.current_id])
        self.ienglish_sentence.clear()
        
        if self.vocas.loc[self.current_id, 'english'].strip() == "" and not flag:
            self.ivoca.clear()
            self.ispelling.clear()
        
        self.ianswer.clear()
        self.ianswer.setFocus()
        
    def _loadLesson(self):
        self.vocas = pd.read_csv(PATH + "/vocas.csv")
        if os.path.exists(PATH + "/review.json"):
            with open(PATH + "/review.json") as reader:
                self.indexes = json.load(reader)
        else:
            self.indexes = list(self.vocas.sort_values(by=['error']).index)[:50]

        self.vocas.fillna("", inplace=True)
        self.amount_vocas = min(50, len(self.indexes))
        self.current_id = random.choice(self.indexes)
        

app = QApplication(sys.argv)
app.setStyle("Fusion")

window = MainWindow()
window.show()

app.exec_()