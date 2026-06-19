using System.Windows;
using System.Windows.Interop;
using System.Windows.Threading;
using TextPinMvp.Interop;
using TextPinMvp.Models;
using TextPinMvp.Services;
using TextPinMvp.Transform;

namespace TextPinMvp;

public partial class MainWindow : Window
{
    private readonly AppLog _log = new();
    private readonly TextTargetService _service;
    private readonly ITextTransformer _transformer = new ReverseWordsTransformer();
    private HotkeyManager? _hotkeys;
    private bool _busy;

    private readonly DispatcherTimer _mirrorTimer;
    private string? _lastMirrorText;
    private int _mirrorChanges;
    private bool _mirrorBusy;

    private readonly ContextService _context;
    private readonly SingleInstanceManager _singleInstance;
    private readonly ParsedContextRequest _initialRequest;

    public MainWindow(SingleInstanceManager singleInstance, ParsedContextRequest initialRequest)
    {
        InitializeComponent();
        _singleInstance = singleInstance;
        _initialRequest = initialRequest;

        _service = new TextTargetService(_log);
        _context = new ContextService(_log);
        LogList.ItemsSource = _log.Entries;

        // Auto-Scroll ans Ende bei neuen Eintraegen.
        _log.EntryAdded += entry =>
            Dispatcher.BeginInvoke(() => LogList.ScrollIntoView(entry));

        _context.ContextChanged += UpdateContextDisplay;

        _log.Info($"Bereit. Transformer: {_transformer.Name}");
        _log.Info("Hotkeys: F10 = Feld fixieren, F11 = transformieren.");

        // radgent:// fuer den aktuellen Benutzer registrieren (idempotent, ohne Adminrechte).
        UriSchemeRegistrar.EnsureRegistered(_log);

        // Eingehende Forwards einer zweiten Instanz auf den UI-Thread holen.
        _singleInstance.StartServer(msg => Dispatcher.BeginInvoke(() => HandleIncomingContext(msg)));
        _log.Info("Kontext-Empfang aktiv (Kommandozeile / radgent:// / weitergereicht).");

        _mirrorTimer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(700) };
        _mirrorTimer.Tick += MirrorTimer_Tick;
        _mirrorTimer.Start();

        SourceInitialized += OnSourceInitialized;
        Loaded += OnLoaded;
        Closed += OnClosed;
    }

    private void OnLoaded(object? sender, RoutedEventArgs e)
    {
        // Beim Start uebergebene Anforderung (Kommandozeile/URI) anwenden.
        if (_initialRequest.HasError)
            _log.Warn($"Start-Anforderung ignoriert: {_initialRequest.Error}");
        else if (_initialRequest.HasMessage)
            HandleIncomingContext(_initialRequest.Message);
    }

    // ----------------------------------------------------------- Kontext ----

    /// <summary>
    /// Verarbeitet eine eingehende Kontext-Anforderung (immer auf dem UI-Thread).
    /// <c>null</c> bedeutet "nur Fenster nach vorne holen".
    /// </summary>
    private void HandleIncomingContext(ContextMessage? msg)
    {
        BringToFront();
        if (msg == null) return;
        _context.SetContext(msg.ContextId, msg.Info, msg.Source);
    }

    private void UpdateContextDisplay(ContextMessage msg)
    {
        ContextIdText.Text = msg.ContextId;
        ContextInfoText.Text = msg.Info ?? "";
        ContextMetaText.Text = $"Quelle: {msg.Source} | {msg.SentAt:HH:mm:ss}";
    }

    private void BringToFront()
    {
        try
        {
            if (WindowState == WindowState.Minimized)
                WindowState = WindowState.Normal;

            Activate();
            Topmost = true;
            Topmost = false;

            var hwnd = new WindowInteropHelper(this).Handle;
            if (hwnd != IntPtr.Zero)
                Win32.SetForegroundWindow(hwnd);
        }
        catch (Exception ex)
        {
            _log.Detail($"In den Vordergrund holen fehlgeschlagen: {ex.Message}");
        }
    }

    private void MirrorTimer_Tick(object? sender, EventArgs e)
    {
        if (_mirrorBusy || _busy) return;
        if (MirrorToggle.IsChecked != true) return;

        if (_service.Pinned == null)
        {
            MirrorStatus.Text = "(kein Ziel fixiert)";
            return;
        }

        _mirrorBusy = true;
        try
        {
            var r = _service.ReadForMirror();
            if (!r.Success)
            {
                MirrorStatus.Text = $"nicht spiegelbar: {r.Error}";
                return;
            }

            string text = r.Text ?? "";
            if (text != _lastMirrorText)
            {
                _lastMirrorText = text;
                _mirrorChanges++;
                MirrorText.Text = text;
                MirrorStatus.Text = $"via {r.Strategy} | {text.Length} Zeichen | Aenderungen: {_mirrorChanges} | {DateTime.Now:HH:mm:ss}";
            }
            else
            {
                MirrorStatus.Text = $"via {r.Strategy} | {text.Length} Zeichen | unveraendert | {DateTime.Now:HH:mm:ss}";
            }
        }
        catch (Exception ex)
        {
            MirrorStatus.Text = $"Spiegel-Fehler: {ex.Message}";
        }
        finally
        {
            _mirrorBusy = false;
        }
    }

    private void OnSourceInitialized(object? sender, EventArgs e)
    {
        _hotkeys = new HotkeyManager(this);

        bool f10 = _hotkeys.Register(0, Win32.VK_F10, PinCurrentField);
        if (!f10)
            _log.Warn("F10 konnte nicht registriert werden (evtl. belegt). Nutze den Button 'Feld fixieren'.");

        bool f11 = _hotkeys.Register(0, Win32.VK_F11, () => _ = TransformPinnedFieldAsync());
        if (!f11)
            _log.Warn("F11 konnte nicht registriert werden (evtl. belegt). Nutze den Button 'Transformieren'.");

        if (f10 && f11)
        {
            _log.Success("Globale Hotkeys F10/F11 registriert.");
        }
        else
        {
            // Globale Hotkeys sind systemweit exklusiv: schlaegt die Registrierung fehl,
            // belegt sie ein anderer Prozess (haeufig ein haengender frueherer Receiver).
            var blocked = (!f10, !f11) switch
            {
                (true, true) => "F10 und F11",
                (true, false) => "F10",
                _ => "F11",
            };
            MessageBox.Show(this,
                $"Der globale Hotkey {blocked} konnte nicht registriert werden.\n\n" +
                "Vermutlich belegt ihn bereits ein anderes Programm oder ein haengender " +
                "frueherer 'TextPinMvp.exe'-Prozess. Bitte solche Prozesse im Task-Manager " +
                "beenden und die Anwendung neu starten.\n\n" +
                "Die zugehoerigen Buttons funktionieren unabhaengig vom Hotkey weiter.",
                "radGENT Receiver - Hotkey belegt",
                MessageBoxButton.OK, MessageBoxImage.Warning);
        }
    }

    private void OnClosed(object? sender, EventArgs e)
    {
        _mirrorTimer.Stop();
        _hotkeys?.Dispose();
        _service.Dispose();
        _singleInstance.Dispose();
    }

    // ----------------------------------------------------------- Actions ----

    private void PinCurrentField()
    {
        var target = _service.PinCurrentFocusedElement();
        StatusText.Text = target?.ShortDescription ?? "(Pinnen fehlgeschlagen)";
        ResetMirror();
    }

    private void ResetMirror()
    {
        _lastMirrorText = null;
        _mirrorChanges = 0;
        MirrorText.Clear();
        MirrorStatus.Text = _service.Pinned == null ? "(kein Ziel fixiert)" : "(warte auf erste Spiegelung...)";
    }

    private async Task TransformPinnedFieldAsync()
    {
        if (_busy) return;
        _busy = true;
        try
        {
            if (_service.Pinned == null)
            {
                _log.Warn("Kein Ziel fixiert. Bitte zuerst in ein Textfeld klicken und F10 druecken.");
                return;
            }

            _log.Info("--- Transformation gestartet ---");

            var validate = _service.ValidatePinnedTarget();
            if (!validate.Success)
            {
                _log.Error($"Validierung fehlgeschlagen: {validate.Error}");
                StatusText.Text = "Fixiertes Feld nicht mehr verfuegbar. Bitte erneut F10 druecken.";
                return;
            }

            var read = _service.ReadText();
            if (!read.Success)
            {
                _log.Error($"Lesen fehlgeschlagen: {read.Error}");
                return;
            }
            string original = read.Text ?? "";
            _log.Success($"Gelesen via {read.Strategy} ({original.Length} Zeichen).");
            _log.Detail($"  Original: \"{Shorten(original)}\"");

            string transformed = await _transformer.TransformAsync(original);
            _log.Detail($"  Transformiert: \"{Shorten(transformed)}\"");

            var write = _service.WriteText(transformed);
            if (write.Success)
                _log.Success($"Zurueckgeschrieben via {write.Strategy}.");
            else
                _log.Error($"Schreiben fehlgeschlagen: {write.Error}");

            _log.Info("--- Transformation beendet ---");
        }
        catch (Exception ex)
        {
            _log.Error($"Unerwarteter Fehler: {ex.Message}");
        }
        finally
        {
            _busy = false;
        }
    }

    private void ReadOnlyPinnedField()
    {
        if (_service.Pinned == null)
        {
            _log.Warn("Kein Ziel fixiert.");
            return;
        }
        var validate = _service.ValidatePinnedTarget();
        if (!validate.Success)
        {
            _log.Error($"Validierung fehlgeschlagen: {validate.Error}");
            return;
        }
        var read = _service.ReadText();
        if (read.Success)
        {
            _log.Success($"Gelesen via {read.Strategy} ({read.Text?.Length ?? 0} Zeichen).");
            _log.Detail($"  Inhalt: \"{Shorten(read.Text ?? "")}\"");
        }
        else
        {
            _log.Error($"Lesen fehlgeschlagen: {read.Error}");
        }
    }

    // ----------------------------------------------------- Button handlers ----

    private void PinButton_Click(object sender, RoutedEventArgs e) => PinCurrentField();

    private void TransformButton_Click(object sender, RoutedEventArgs e) => _ = TransformPinnedFieldAsync();

    private void ReadButton_Click(object sender, RoutedEventArgs e) => ReadOnlyPinnedField();

    private void ClearTargetButton_Click(object sender, RoutedEventArgs e)
    {
        _service.ClearPinnedTarget();
        StatusText.Text = "(kein Ziel fixiert)";
        ResetMirror();
    }

    private void CopyLogButton_Click(object sender, RoutedEventArgs e)
    {
        try
        {
            Clipboard.SetText(_log.DumpText());
            _log.Info("Log in die Zwischenablage kopiert.");
        }
        catch (Exception ex)
        {
            _log.Error($"Log kopieren fehlgeschlagen: {ex.Message}");
        }
    }

    private void ClearLogButton_Click(object sender, RoutedEventArgs e) => _log.Clear();

    private static string Shorten(string s)
    {
        s = s.Replace("\r", " ").Replace("\n", " ");
        return s.Length > 120 ? s[..120] + "..." : s;
    }
}
