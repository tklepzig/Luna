import win32api
import win32con
import sys

win32api.keybd_event(ord(sys.argv[1]), 0, 0, 0)
win32api.keybd_event(ord(sys.argv[1]), 0, win32con.KEYEVENTF_KEYUP, 0)

