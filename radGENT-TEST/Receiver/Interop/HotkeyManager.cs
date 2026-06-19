using System.Windows;
using System.Windows.Interop;

namespace TextPinMvp.Interop;

/// <summary>
/// Registriert globale Hotkeys ueber einen HwndSource-Hook am Hauptfenster.
/// So funktionieren die Hotkeys systemweit, auch wenn unsere App nicht im Fokus ist.
/// </summary>
public sealed class HotkeyManager : IDisposable
{
    private const int WM_HOTKEY = 0x0312;

    private readonly HwndSource _source;
    private readonly IntPtr _handle;
    private readonly Dictionary<int, Action> _actions = new();
    private int _nextId = 9000;
    private bool _disposed;

    public HotkeyManager(Window window)
    {
        var helper = new WindowInteropHelper(window);
        _handle = helper.Handle;
        _source = HwndSource.FromHwnd(_handle)
                  ?? throw new InvalidOperationException("HwndSource konnte nicht ermittelt werden.");
        _source.AddHook(WndProc);
    }

    /// <summary>
    /// Registriert einen Hotkey. Gibt false zurueck, wenn die Tastenkombination
    /// bereits belegt ist (z. B. durch eine andere Anwendung).
    /// </summary>
    public bool Register(uint modifiers, uint virtualKey, Action action)
    {
        int id = _nextId++;
        if (!Win32.RegisterHotKey(_handle, id, modifiers | Win32.MOD_NOREPEAT, virtualKey))
            return false;
        _actions[id] = action;
        return true;
    }

    private IntPtr WndProc(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled)
    {
        if (msg == WM_HOTKEY && _actions.TryGetValue(wParam.ToInt32(), out var action))
        {
            handled = true;
            action();
        }
        return IntPtr.Zero;
    }

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        foreach (var id in _actions.Keys)
            Win32.UnregisterHotKey(_handle, id);
        _actions.Clear();
        _source.RemoveHook(WndProc);
    }
}
