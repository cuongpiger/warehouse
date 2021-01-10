from PySide2.QtCore import QRunnable, QObject, Signal, Slot
from pynput import mouse
from pynput.keyboard import Key, Controller

controller = Controller()



class ListenerSignal(QObject):
    finish = Signal()

class Listener(QRunnable):
    def __init__(self):
        super().__init__()

        self.signal = ListenerSignal()

    def on_click(self, x, y, button, pressed):
        if button == mouse.Button.middle and pressed:
            controller.press(Key.ctrl)
            controller.press('c')
            controller.release('c')
            controller.release(Key.ctrl)

    @Slot()
    def run(self):
        try:
            self.listener_mouse = mouse.Listener(on_click=self.on_click)
            self.listener_mouse.start()
        except:
            pass
        else:
            self.signal.finish.emit()
