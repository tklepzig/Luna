import win32api
import win32con
import sys

action = sys.argv[1]

if action == "playpause":
    win32api.keybd_event(win32con.VK_MEDIA_PLAY_PAUSE, 0, 0, 0)
    win32api.keybd_event(win32con.VK_MEDIA_PLAY_PAUSE, 0, win32con.KEYEVENTF_KEYUP, 0)
elif action == "volumeup":
    win32api.keybd_event(win32con.VK_VOLUME_UP, 0, 0, 0)
    win32api.keybd_event(win32con.VK_VOLUME_UP, 0, win32con.KEYEVENTF_KEYUP, 0)
elif action == "volumedown":
    win32api.keybd_event(win32con.VK_VOLUME_DOWN, 0, 0, 0)
    win32api.keybd_event(win32con.VK_VOLUME_DOWN, 0, win32con.KEYEVENTF_KEYUP, 0)
    


