using System;

namespace Luna
{
    abstract class ScreensaverHelper
    {
        static bool KillScreenSaverFunc(IntPtr hwnd, int lParam)
        {
            if (Win32APIImports.IsWindowVisible(hwnd))
                Win32APIImports.PostMessage(hwnd, 0x0010/*WM_CLOSE*/, IntPtr.Zero, IntPtr.Zero);

            return true;
        }

        public static void Start()
        {
            Win32APIImports.PostMessage(Win32APIImports.GetDesktopWindow(), 0x0112, new IntPtr(0xf140), IntPtr.Zero);
        }

        public static void Stop()
        {
            IntPtr hdesk;
            hdesk = Win32APIImports.OpenDesktop("Screen-saver", 0, false, 0x0001 | 0x0080 /*DESKTOP_READOBJECTS | DESKTOP_WRITEOBJECTS*/);

            if (hdesk != IntPtr.Zero)
            {
                Win32APIImports.EnumDesktopWindows(hdesk, new Win32APIImports.EnumDesktopWindowsDelegate(KillScreenSaverFunc), IntPtr.Zero);
                Win32APIImports.CloseDesktop(hdesk);
            }
            else
            {
                //??
                // Windows 2000 and later: 
                // If there is no screen saver desktop, the screen saver 
                // is on the default desktop. Close it by sending a 
                // WM_CLOSE. PostMessage(GetForegroundWindow(), WM_CLOSE, 0, 0L); 
            }
        }
    }
}
