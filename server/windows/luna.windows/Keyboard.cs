using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace luna.windows
{
#pragma warning disable 1998
    public class Keyboard
    {
        public async Task<object> PressKey(dynamic keyData)
        {
            var key = keyData.key;
            var modifiers = new List<string>();

            if (keyData.modifiers != null)
            {
                modifiers = ((object[])keyData.modifiers).Where(x => x != null)
                                                         .Select(x => x.ToString().ToLower())
                                                         .ToList();
            }

            try
            {
                var bKey = Convert.ToByte(Convert.ToChar(key));

                if (modifiers.Contains("shift"))
                    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.Shift, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.Shift, 0), 0, UIntPtr.Zero);

                if (modifiers.Contains("win"))
                    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.LeftWindows, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.LeftWindows, 0), 0, UIntPtr.Zero);

                if (modifiers.Contains("ctrl"))
                    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.Control, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.Control, 0), 0, UIntPtr.Zero);

                if (modifiers.Contains("alt"))
                    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.LeftMenu, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.LeftMenu, 0), 0, UIntPtr.Zero);

                //if (modKey.HasFlag(Win32APIImports.ModifierKey.AltGr))
                //    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.RightMenu, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.RightMenu, 0), 0, UIntPtr.Zero);

                
                SendKey(bKey, KeyState.Down);
                SendKey(bKey, KeyState.Up);

                if (modifiers.Contains("shift"))
                    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.Shift, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.Shift, 0), 2, UIntPtr.Zero);

                if (modifiers.Contains("win"))
                    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.LeftWindows, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.LeftWindows, 0), 2, UIntPtr.Zero);

                if (modifiers.Contains("ctrl"))
                    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.Control, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.Control, 0), 2, UIntPtr.Zero);

                if (modifiers.Contains("alt"))
                    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.LeftMenu, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.LeftMenu, 0), 2, UIntPtr.Zero);

                //if (modKey.HasFlag(Win32APIImports.ModifierKey.AltGr))
                //    Win32APIImports.keybd_event((byte)Win32APIImports.VirtualKeys.RightMenu, Win32APIImports.MapVirtualKey((byte)Win32APIImports.VirtualKeys.RightMenu, 0), 2, UIntPtr.Zero);

            }
            finally
            {
            }

            return null;
        }


        enum KeyState
        {
            Down,
            Up
        }

        private void SendKey(Win32APIImports.VirtualKeys key, KeyState keyState)
        {
            const uint KEYEVENTF_KEYUP = 0x0002;
            var isExtended = false;
            uint flags = 0;

            if (keyState == KeyState.Up)
                flags = KEYEVENTF_KEYUP;

            if (key == Win32APIImports.VirtualKeys.RightMenu
                || key == Win32APIImports.VirtualKeys.RightControl
                || key == Win32APIImports.VirtualKeys.Insert
                || key == Win32APIImports.VirtualKeys.Delete
                || key == Win32APIImports.VirtualKeys.Home
                || key == Win32APIImports.VirtualKeys.End
                || key == Win32APIImports.VirtualKeys.Prior
                || key == Win32APIImports.VirtualKeys.Next
                || key == Win32APIImports.VirtualKeys.Up
                || key == Win32APIImports.VirtualKeys.Left
                || key == Win32APIImports.VirtualKeys.Down
                || key == Win32APIImports.VirtualKeys.Right
                )
            {
                isExtended = true;
            }

            if (isExtended)
                flags |= 1;

            Win32APIImports.keybd_event((byte)key, Win32APIImports.MapVirtualKey((byte)key, 0), flags, UIntPtr.Zero);

        }

        private void SendKey(byte key, KeyState keyState)
        {
            SendKey((Win32APIImports.VirtualKeys)key, keyState);
        }

        public void SendText(string text, Win32APIImports.ModifierKey modifierKey)
        {
            IntPtr keyboardLayout = Win32APIImports.GetKeyboardLayout(0);

            while (!string.IsNullOrEmpty(text))
            {
                Win32APIImports.ModifierKey modKey = modifierKey;

                var vKey = Win32APIImports.VkKeyScanEx(text[0], keyboardLayout);

                //Hi-byte indicates the pressed modifier key(s)
                var highByte = (byte)(vKey >> 8);
                var lowByte = (byte)(vKey & 0xFF);

                if ((highByte & 1) == 1)
                    modKey |= Win32APIImports.ModifierKey.Shift;
                if ((highByte & 2) == 2)
                    modKey |= Win32APIImports.ModifierKey.Control;
                if ((highByte & 4) == 4)
                    modKey |= Win32APIImports.ModifierKey.Alt;


                if (modKey.HasFlag(Win32APIImports.ModifierKey.Shift))
                    SendKey(Win32APIImports.VirtualKeys.Shift, KeyState.Down);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.Windows))
                    SendKey(Win32APIImports.VirtualKeys.LeftWindows, KeyState.Down);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.Control))
                    SendKey(Win32APIImports.VirtualKeys.Control, KeyState.Down);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.Alt))
                    SendKey(Win32APIImports.VirtualKeys.LeftMenu, KeyState.Down);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.AltGr))
                    SendKey(Win32APIImports.VirtualKeys.RightMenu, KeyState.Down);

                SendKey(lowByte, KeyState.Down);
                SendKey(lowByte, KeyState.Up);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.Shift))
                    SendKey(Win32APIImports.VirtualKeys.Shift, KeyState.Up);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.Windows))
                    SendKey(Win32APIImports.VirtualKeys.LeftWindows, KeyState.Up);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.Control))
                    SendKey(Win32APIImports.VirtualKeys.Control, KeyState.Up);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.Alt))
                    SendKey(Win32APIImports.VirtualKeys.LeftMenu, KeyState.Up);

                if (modKey.HasFlag(Win32APIImports.ModifierKey.AltGr))
                    SendKey(Win32APIImports.VirtualKeys.RightMenu, KeyState.Up);

                if (text.Length > 0)
                    text = text.Remove(0, 1);
                else
                    text = string.Empty;
            }
        }
    }
}
