/* Dll Class:

using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace Test
{
    public class Class1
    {
        [DllImport("user32.dll", SetLastError = true)]
        public static extern bool PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll", SetLastError = false)]
        public static extern IntPtr GetDesktopWindow();

        public async Task<object> Invoke(string input)
        {
            PostMessage(GetDesktopWindow(), 0x0112, new IntPtr(0xf140), IntPtr.Zero);
            return null;
        }
    }
}


*/

// var edge = require('edge');
//
//
// var playPause = edge.func({
//     assemblyFile: 'Zeteos.Core.dll',
//     typeName: 'Zeteos.Core.Media',
//     methodName: 'PlayPause'
// });
