using System.Runtime.InteropServices;
using System.Text;

namespace TextPinMvp.Interop;

/// <summary>
/// Gebuendelte P/Invoke-Aufrufe gegen user32 fuer Hotkeys, Win32-Text-Messages,
/// Fenster-/Fokus-Handling und Tastatursimulation (SendInput).
/// </summary>
internal static class Win32
{
    // ---- Window messages ----
    public const int WM_SETTEXT = 0x000C;
    public const int WM_GETTEXT = 0x000D;
    public const int WM_GETTEXTLENGTH = 0x000E;
    public const int EM_GETSEL = 0x00B0;
    public const int EM_SETSEL = 0x00B1;
    public const int EM_REPLACESEL = 0x00C2;

    public const uint SMTO_ABORTIFHUNG = 0x0002;

    // ---- Hotkey modifiers ----
    public const uint MOD_ALT = 0x0001;
    public const uint MOD_CONTROL = 0x0002;
    public const uint MOD_SHIFT = 0x0004;
    public const uint MOD_WIN = 0x0008;
    public const uint MOD_NOREPEAT = 0x4000;

    // ---- Virtual keys ----
    public const uint VK_F10 = 0x79;
    public const uint VK_F11 = 0x7A;
    public const ushort VK_CONTROL = 0x11;
    public const ushort VK_A = 0x41;
    public const ushort VK_C = 0x43;
    public const ushort VK_V = 0x56;

    public const uint GA_ROOT = 2;

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool UnregisterHotKey(IntPtr hWnd, int id);

    [DllImport("user32.dll")]
    public static extern bool IsWindow(IntPtr hWnd);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern IntPtr GetAncestor(IntPtr hwnd, uint gaFlags);

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    public static extern int GetClassName(IntPtr hWnd, StringBuilder lpClassName, int nMaxCount);

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    public static extern int GetWindowTextLength(IntPtr hWnd);

    // SendMessageTimeout overloads (string read / write / scalar).
    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern IntPtr SendMessageTimeout(IntPtr hWnd, int Msg, IntPtr wParam, StringBuilder lParam, uint fuFlags, uint uTimeout, out IntPtr lpdwResult);

    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern IntPtr SendMessageTimeout(IntPtr hWnd, int Msg, IntPtr wParam, string lParam, uint fuFlags, uint uTimeout, out IntPtr lpdwResult);

    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern IntPtr SendMessageTimeout(IntPtr hWnd, int Msg, IntPtr wParam, IntPtr lParam, uint fuFlags, uint uTimeout, out IntPtr lpdwResult);

    // ---- SendInput (keyboard simulation) ----
    private const uint INPUT_KEYBOARD = 1;
    private const uint KEYEVENTF_KEYUP = 0x0002;

    [StructLayout(LayoutKind.Sequential)]
    private struct INPUT
    {
        public uint type;
        public InputUnion u;
    }

    [StructLayout(LayoutKind.Explicit)]
    private struct InputUnion
    {
        [FieldOffset(0)] public KEYBDINPUT ki;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct KEYBDINPUT
    {
        public ushort wVk;
        public ushort wScan;
        public uint dwFlags;
        public uint time;
        public IntPtr dwExtraInfo;
    }

    [DllImport("user32.dll", SetLastError = true)]
    private static extern uint SendInput(uint nInputs, INPUT[] pInputs, int cbSize);

    private static INPUT MakeKey(ushort vk, bool keyUp) => new()
    {
        type = INPUT_KEYBOARD,
        u = new InputUnion
        {
            ki = new KEYBDINPUT
            {
                wVk = vk,
                dwFlags = keyUp ? KEYEVENTF_KEYUP : 0,
                dwExtraInfo = IntPtr.Zero
            }
        }
    };

    /// <summary>Sendet eine Ctrl+&lt;key&gt; Kombination an das aktuell fokussierte Fenster.</summary>
    public static void SendCtrlCombo(ushort key)
    {
        INPUT[] inputs =
        {
            MakeKey(VK_CONTROL, false),
            MakeKey(key, false),
            MakeKey(key, true),
            MakeKey(VK_CONTROL, true),
        };
        SendInput((uint)inputs.Length, inputs, Marshal.SizeOf<INPUT>());
    }

    public static string GetClassNameOf(IntPtr hWnd)
    {
        if (hWnd == IntPtr.Zero) return "";
        var sb = new StringBuilder(256);
        return GetClassName(hWnd, sb, sb.Capacity) > 0 ? sb.ToString() : "";
    }

    public static string GetWindowTitle(IntPtr hWnd)
    {
        if (hWnd == IntPtr.Zero) return "";
        int len = GetWindowTextLength(hWnd);
        if (len <= 0) return "";
        var sb = new StringBuilder(len + 1);
        GetWindowText(hWnd, sb, sb.Capacity);
        return sb.ToString();
    }
}
