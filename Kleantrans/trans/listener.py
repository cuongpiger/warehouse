from pynput import mouse
from pynput import keyboard
from pynput.keyboard import Key, Controller

controller = Controller()


class ListenerMouse():
    def __init__(self):
        self.mouse = mouse.Listener(on_click=self.on_click)
        self.mouse.start()

    def on_click(self, x, y, button, pressed):
        if button == mouse.Button.middle and pressed:
            controller.press(Key.ctrl)
            controller.press('c')
            controller.release('c')
            controller.release(Key.ctrl)


class ListenerKeyBoard():
    def __init__(self, window):
        self.window = window
        self.window_pos = (self.window.pos().x(), self.window.pos().y())
        self.switch = True
        self.hotkey = keyboard.HotKey(
            keyboard.HotKey.parse('<ctrl>+<cmd>'), self.on_activate)
        self.keyboard = keyboard.Listener(on_press=self.for_canonical(self.hotkey.press),
                                          on_release=self.for_canonical(self.hotkey.release))
        self.keyboard.start()

    def on_activate(self):
        if self.switch:
            self.window.move(self.window_pos[0], self.window_pos[1])
            self.window.show()
        else:
            self.window_pos = (self.window.pos().x(), self.window.pos().y())
            self.window.hide()

        self.switch = not self.switch

    def for_canonical(self, f):
        return lambda k: f(self.keyboard.canonical(k))
