from pynput import mouse
from pynput import keyboard
import os
import pyperclip

# controller = keyboard.Controller()

class ListenerMouse():
    def __init__(self):
        self.mouse = mouse.Listener(on_click=self.on_click)
        self.mouse.start()

    def on_click(self, x, y, button, pressed):
        if button == mouse.Button.middle and pressed:
            os.system("xclip -out -selection primary | xclip -in -selection clipboard")
            # controller.press(keyboard.Key.ctrl)
            # controller.press('c')
            # controller.release('c')
            # controller.release(keyboard.Key.ctrl)
            pyperclip.copy("$" + pyperclip.paste())
            


class ListenerKeyBoard():
    def __init__(self, window):
        self.window = window
        self.window_pos = (self.window.pos().x(), self.window.pos().y())
        self.switch = True
        self.hotkey = keyboard.HotKey(
            keyboard.HotKey.parse('<shift>+<cmd>'), self.on_activate)
        
        self.hotkey2 = keyboard.HotKey(
            keyboard.HotKey.parse('<ctrl>+<cmd>'), self.ctrl_alt_pressed)
        self.keyboard = keyboard.Listener(on_press=self.for_canonical(self.hotkey.press),
                                        on_release=self.for_canonical(self.hotkey.release))
        self.keyboard.start()
        
        self.keyboard2 = keyboard.Listener(on_press=self.for_canonical(self.hotkey2.press),
                                          on_release=self.for_canonical(self.hotkey2.release))
        self.keyboard2.start()

    def on_activate(self):
        if self.switch:
            self.window.move(self.window_pos[0], self.window_pos[1])
            self.window.show()
        else:
            self.window_pos = (self.window.pos().x(), self.window.pos().y())
            self.window.hide()

        self.switch = not self.switch
        
    def ctrl_alt_pressed(self):
        os.system("xclip -out -selection primary | xclip -in -selection clipboard")
        # controller.press(keyboard.Key.ctrl)
        # controller.press('c')
        # controller.release('c')
        # controller.release(keyboard.Key.ctrl)
        # pyperclip.copy("$" + pyperclip.paste())
        pyperclip.copy("$" + pyperclip.paste())

    def for_canonical(self, f):
        return lambda k: f(self.keyboard.canonical(k))
    
