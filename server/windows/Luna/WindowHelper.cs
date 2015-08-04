using System;

namespace Luna
{
    public class Window
    {
        public IntPtr HWnd { get; set; }
        public string Title { get; set; }
    }

    public enum DesktopWindow
    {
        ProgMan,
        SHELLDLL_DefViewParent,
        SHELLDLL_DefView,
        SysListView32
    };

    static class WindowHelper
    {
        static IntPtr GetDesktopWindow(DesktopWindow desktopWindow)
        {
            IntPtr hProgMan = Win32APIImports.GetShellWindow();
            IntPtr hSHELLDLL_DefViewParent = hProgMan;
            IntPtr hSHELLDLL_DefView = Win32APIImports.FindWindowEx(hProgMan, IntPtr.Zero, "SHELLDLL_DefView", null);
            IntPtr hSysListView32 = Win32APIImports.FindWindowEx(hSHELLDLL_DefView, IntPtr.Zero, "SysListView32", "FolderView");

            if (hSHELLDLL_DefView == IntPtr.Zero)
            {
                Win32APIImports.EnumWindows((hWnd, lParam) =>
                {

                    if (Win32APIImports.GetClassName(hWnd) == "WorkerW")
                    {
                        IntPtr child = Win32APIImports.FindWindowEx(hWnd, IntPtr.Zero, "SHELLDLL_DefView", null);
                        if (child != IntPtr.Zero)
                        {
                            hSHELLDLL_DefViewParent = hWnd;
                            hSHELLDLL_DefView = child;
                            hSysListView32 = Win32APIImports.FindWindowEx(child, IntPtr.Zero, "SysListView32", "FolderView"); ;
                            return false;
                        }
                    }
                    return true;
                }, IntPtr.Zero);
            }

            if (desktopWindow == DesktopWindow.ProgMan)
                return hProgMan;
            else if (desktopWindow == DesktopWindow.SHELLDLL_DefViewParent)
                return hSHELLDLL_DefViewParent;
            else if (desktopWindow == DesktopWindow.SHELLDLL_DefView)
                return hSHELLDLL_DefView;
            else if (desktopWindow == DesktopWindow.SysListView32)
                return hSysListView32;
            else
                return IntPtr.Zero;
        }

        static bool IsSpecialWindow(IntPtr hWnd)
        {
            if (hWnd == Win32APIImports.GetShellWindow()
                || hWnd == GetDesktopWindow(DesktopWindow.SHELLDLL_DefViewParent)
                || Win32APIImports.GetClassName(hWnd) == "Shell_TrayWnd"
                || Win32APIImports.GetClassName(hWnd) == "WorkerW"
                || Win32APIImports.GetClassName(hWnd) == "NotifyIconOverflowWindow"
                || Win32APIImports.GetClassName(hWnd) == "DV2ControlHost"
                || Win32APIImports.GetClassName(hWnd) == "Desktop User Picture"
                || Win32APIImports.GetClassName(hWnd) == "TaskSwitcherWnd"
                || Win32APIImports.GetClassName(hWnd) == "TaskListThumbnailWnd"
                || Win32APIImports.GetClassName(hWnd) == "Auto-Suggest Dropdown"
                || Win32APIImports.GetClassName(hWnd) == "SynTrackCursorWindowClass"
                || (Win32APIImports.GetClassName(hWnd) == "Button" && Win32APIImports.GetWindowText(hWnd) == "Start")
                //new for Windows 8 and later:
                || Win32APIImports.GetClassName(hWnd) == "NativeHWNDHost"
                || Win32APIImports.GetClassName(hWnd) == "SearchPane"
                || Win32APIImports.GetClassName(hWnd) == "ImmersiveLauncher"
                || Win32APIImports.GetClassName(hWnd) == "ApplicationManager_ImmersiveShellWindow"
                || Win32APIImports.GetClassName(hWnd) == "MetroGhostWindow"
                )
            {
                return true;
            }

            return false;
        }

        public static bool IsValidTaskWindow(IntPtr hWnd, bool allowMinimized = true, bool allowMaximized = true)
        {
            if (Win32APIImports.GetParent(hWnd) == IntPtr.Zero
                && (Win32APIImports.GetWindowLongPtr(hWnd, Win32APIImports.WindowLongConstants.GWL_EXSTYLE) & Win32APIImports.WindowStyles.WS_EX_TOOLWINDOW) != Win32APIImports.WindowStyles.WS_EX_TOOLWINDOW
                && Win32APIImports.IsWindow(hWnd)
#warning some "real" windows have an owner, therefore it is disabled, check whether this is maybe a problem...
                //&& Win32APIImports.GetWindow(hWnd, (uint)Win32APIImports.GetWindowFlags.GW_OWNER) == IntPtr.Zero
                && (Win32APIImports.IsWindowVisible(hWnd))
                && (!Win32APIImports.IsIconic(hWnd) || allowMinimized)
                && (!Win32APIImports.IsZoomed(hWnd) || allowMaximized)
                && !IsSpecialWindow(hWnd))
            {
                return true;
            }

            return false;
        }
    }
}
