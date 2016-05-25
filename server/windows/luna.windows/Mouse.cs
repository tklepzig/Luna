using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace luna.windows
{
#pragma warning disable 1998
    public class Mouse
    {
        public async Task<object> Move(dynamic offset)
        {
            Cursor.Position = new Point(Cursor.Position.X + offset.x, Cursor.Position.Y + offset.y);
            Win32APIImports.mouse_event(1, 0, 0, 0, IntPtr.Zero);
            return null;
        }

        public async Task<object> Wheel(dynamic delta)
        {
            Win32APIImports.mouse_event(0x0800/*MOUSEEVENTF_WHEEL*/, Cursor.Position.X, Cursor.Position.Y, delta, IntPtr.Zero);

            return null;
        }

        public async Task<object> HWheel(dynamic delta)
        {
            Win32APIImports.mouse_event(0x1000/*MOUSEEVENTF_WHEEL*/, Cursor.Position.X, Cursor.Position.Y, delta, IntPtr.Zero);

            return null;
        }

        public async Task<object> LeftClick(object dummy)
        {
            Win32APIImports.mouse_event(0x0002/*MOUSEEVENTF_LEFTDOWN*/, Cursor.Position.X, Cursor.Position.Y, 0, IntPtr.Zero);
            Win32APIImports.mouse_event(0x0004/*MOUSEEVENTF_LEFTUP*/, Cursor.Position.X, Cursor.Position.Y, 0, IntPtr.Zero);

            return null;
        }

        public async Task<object> RightClick(object dummy)
        {
            Win32APIImports.mouse_event(0x0008/*MOUSEEVENTF_RIGHTDOWN*/, Cursor.Position.X, Cursor.Position.Y, 0, IntPtr.Zero);
            Win32APIImports.mouse_event(0x0010/*MOUSEEVENTF_RIGHTUP*/, Cursor.Position.X, Cursor.Position.Y, 0, IntPtr.Zero);

            return null;
        }

        public async Task<object> MiddleClick(object dummy)
        {
            Win32APIImports.mouse_event(0x0020/*MOUSEEVENTF_MIDDLEDOWN*/, Cursor.Position.X, Cursor.Position.Y, 0, IntPtr.Zero);
            Win32APIImports.mouse_event(0x0040/*MOUSEEVENTF_MIDDLEUP*/, Cursor.Position.X, Cursor.Position.Y, 0, IntPtr.Zero);

            return null;
        }
    }
}
