using System;
using System.Threading.Tasks;

namespace luna.windows
{
#pragma warning disable 1998
    public class Media
    {
        public async Task<object> PlayPause(object dummy)
        {
            Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.MediaPlayPause, 0, 0, UIntPtr.Zero);
            Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.MediaPlayPause, 0, 2, UIntPtr.Zero);

            return null;
        }

        public async Task<object> VolumeUp(object dummy)
        {
            Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.VolumeUp, 0, 0, UIntPtr.Zero);
            Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.VolumeUp, 0, 2, UIntPtr.Zero);

            return null;
        }

        public async Task<object> VolumeDown(object dummy)
        {
            Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.VolumeDown, 0, 0, UIntPtr.Zero);
            Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.VolumeDown, 0, 2, UIntPtr.Zero);

            return null;
        }
    }
}