import win32api
import win32con
import win32gui
import sys

action = sys.argv[1]

if action == "move":
    offset = (int(sys.argv[2]), int(sys.argv[3]))
    win32api.mouse_event(win32con.MOUSEEVENTF_MOVE, int(offset[0]), int(offset[1]))
elif action == "click":
    cursorPos = win32gui.GetCursorPos()
    button = sys.argv[2]
    if button == "left":
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN, cursorPos[0], cursorPos[1], 0, 0)
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP, cursorPos[0], cursorPos[1], 0, 0)
    if button == "middle":
        win32api.mouse_event(win32con.MOUSEEVENTF_MIDDLEDOWN, cursorPos[0], cursorPos[1], 0, 0)
        win32api.mouse_event(win32con.MOUSEEVENTF_MIDDLEUP, cursorPos[0], cursorPos[1], 0, 0)
    if button == "right":
        win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTDOWN, cursorPos[0], cursorPos[1], 0, 0)
        win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTUP, cursorPos[0], cursorPos[1], 0, 0)
elif action == "wheel":
    cursorPos = win32gui.GetCursorPos()
    delta = int(sys.argv[2])
    win32api.mouse_event(win32con.MOUSEEVENTF_WHEEL, cursorPos[0], cursorPos[1], delta, 0)
elif action == "hwheel":
    cursorPos = win32gui.GetCursorPos()
    delta = int(sys.argv[2])
    #0x1000 -> MOUSEEVENTF_HWHEEL
    win32api.mouse_event(0x1000, cursorPos[0], cursorPos[1], delta, 0)
