using System;
using System.Threading.Tasks;

namespace Luna
{
#pragma warning disable 1998
    public class Media
    {
        public async Task<object> PlayPause(object input)
        {
            Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.MediaPlayPause, 0, 0, UIntPtr.Zero);
            Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.MediaPlayPause, 0, 2, UIntPtr.Zero);

            return null;
        }
    }
}