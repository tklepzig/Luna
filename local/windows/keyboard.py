import win32api
import win32con
import sys

key = ord(sys.argv[1])

modifiers = ""
if len(sys.argv) > 2:
    modifiers = sys.argv[2]

modifiers = modifiers.split("+")

if "shift" in modifiers:
    win32api.keybd_event(0x10, win32api.MapVirtualKey(0x10, 0), 0, 0)

if "win" in modifiers:
    win32api.keybd_event(0x5B, win32api.MapVirtualKey(0x5B, 0), 0, 0)

if "ctrl" in modifiers:
    win32api.keybd_event(0x11, win32api.MapVirtualKey(0x11, 0), 0, 0)

if "alt" in modifiers:
    win32api.keybd_event(0xA4, win32api.MapVirtualKey(0xA4, 0), 0, 0)

isExtended = False
flags = 0

if key == win32con.VK_RMENU or \
    key == win32con.VK_RCONTROL or \
    key == win32con.VK_INSERT or \
    key == win32con.VK_DELETE or \
    key == win32con.VK_HOME or \
    key == win32con.VK_END or \
    key == win32con.VK_PRIOR or \
    key == win32con.VK_NEXT or \
    key == win32con.VK_UP or \
    key == win32con.VK_LEFT or \
    key == win32con.VK_DOWN or \
    key == win32con.VK_RIGHT:
    isExtended = True

if isExtended:
    flags |= 1

win32api.keybd_event(key, win32api.MapVirtualKey(key, 0), flags, 0)
win32api.keybd_event(key, win32api.MapVirtualKey(key, 0), win32con.KEYEVENTF_KEYUP | flags, 0)

if "shift" in modifiers:
    win32api.keybd_event(0x10, win32api.MapVirtualKey(0x10, 0), 2, 0)

if "win" in modifiers:
    win32api.keybd_event(0x5B, win32api.MapVirtualKey(0x5B, 0), 2, 0)

if "ctrl" in modifiers:
    win32api.keybd_event(0x11, win32api.MapVirtualKey(0x11, 0), 2, 0)

if "alt" in modifiers:
    win32api.keybd_event(0xA4, win32api.MapVirtualKey(0xA4, 0), 2, 0)
