using System.Drawing;
using System.Text;
using System.Windows;
using FlaUI.Core.AutomationElements;
using FlaUI.Core.Definitions;
using FlaUI.UIA3;
using TextPinMvp.Interop;
using TextPinMvp.Models;

namespace TextPinMvp.Services;

/// <summary>
/// Kernlogik: fixiert ein fremdes Textfeld, validiert/findet es wieder und
/// liest/schreibt Text ueber eine Fallback-Kette
/// (UIA ValuePattern -> UIA TextPattern -> Win32 -> Clipboard/Paste).
/// Jeder Schritt wird ins AppLog geschrieben.
/// </summary>
public sealed class TextTargetService : IDisposable
{
    private readonly UIA3Automation _automation = new();
    private readonly AppLog _log;

    /// <summary>
    /// Lebende UIA-Referenz vom Pin-Zeitpunkt. Entscheidend fuer windowless
    /// Controls (WPF/Praxissoftware), deren ControlHwnd 0 ist und die per
    /// Komplett-Neusuche nach Fokusverlust oft nicht mehr gefunden werden.
    /// </summary>
    private AutomationElement? _pinnedElement;

    public PinnedTextTarget? Pinned { get; private set; }

    public TextTargetService(AppLog log) => _log = log;

    // ---------------------------------------------------------------- Pin ----

    public PinnedTextTarget? PinCurrentFocusedElement()
    {
        AutomationElement? focused;
        try
        {
            focused = _automation.FocusedElement();
        }
        catch (Exception ex)
        {
            _log.Error($"Fokussiertes Element konnte nicht ermittelt werden: {ex.Message}");
            return null;
        }

        if (focused == null)
        {
            _log.Warn("Kein fokussiertes UI-Element gefunden.");
            return null;
        }

        var target = BuildTarget(focused);
        Pinned = target;
        _pinnedElement = focused;
        LogPinFeedback(target);
        return target;
    }

    private PinnedTextTarget BuildTarget(AutomationElement el)
    {
        var controlHwnd = Safe(() => el.Properties.NativeWindowHandle.ValueOrDefault, IntPtr.Zero);
        var topLevel = ResolveTopLevelHwnd(el, controlHwnd);
        int pid = Safe(() => el.Properties.ProcessId.ValueOrDefault, 0);

        var target = new PinnedTextTarget
        {
            ProcessId = pid,
            ProcessName = GetProcessName(pid),
            ControlHwnd = controlHwnd,
            TopLevelHwnd = topLevel,
            TopLevelTitle = Win32.GetWindowTitle(topLevel),
            RuntimeId = Safe(() => el.Properties.RuntimeId.ValueOrDefault, (int[]?)null),
            AutomationId = Safe(() => el.Properties.AutomationId.ValueOrDefault, ""),
            Name = Safe(() => el.Properties.Name.ValueOrDefault, ""),
            ClassName = Safe(() => el.Properties.ClassName.ValueOrDefault, ""),
            ControlType = Safe(() => el.Properties.ControlType.ValueOrDefault.ToString(), "Unknown"),
            BoundingRectangle = Safe(() => el.Properties.BoundingRectangle.ValueOrDefault, Rectangle.Empty),
            SupportsValuePattern = Safe(() => el.Patterns.Value.IsSupported, false),
            SupportsTextPattern = Safe(() => el.Patterns.Text.IsSupported, false),
            SupportsLegacyIAccessiblePattern = Safe(() => el.Patterns.LegacyIAccessible.IsSupported, false),
        };

        if (target.SupportsValuePattern)
            target.IsValuePatternReadOnly = Safe(() => el.Patterns.Value.Pattern.IsReadOnly.ValueOrDefault, false);

        // Aktueller Text + Selektion zum Pin-Zeitpunkt (best effort).
        target.LastKnownText = TryReadAny(el, out _);
        target.LastKnownSelection = TryReadSelection(el);

        return target;
    }

    private void LogPinFeedback(PinnedTextTarget t)
    {
        _log.Success($"Ziel fixiert: {t.ShortDescription}");
        _log.Detail($"  Prozess: {t.ProcessName} (PID {t.ProcessId})");
        _log.Detail($"  Top-Level: HWND=0x{t.TopLevelHwnd.ToInt64():X} \"{t.TopLevelTitle}\"");
        _log.Detail($"  Control:   HWND=0x{t.ControlHwnd.ToInt64():X} Class=\"{t.ClassName}\"");
        _log.Detail($"  ControlType: {t.ControlType}");
        _log.Detail($"  AutomationId: \"{t.AutomationId}\"  Name: \"{t.Name}\"");
        _log.Detail($"  RuntimeId: {t.RuntimeIdString}");
        _log.Detail($"  BoundingRect: {t.BoundingRectangle}");
        _log.Detail($"  Patterns: Value={t.SupportsValuePattern}" +
                    $"{(t.SupportsValuePattern ? $"(readonly={t.IsValuePatternReadOnly})" : "")}, " +
                    $"Text={t.SupportsTextPattern}, Legacy={t.SupportsLegacyIAccessiblePattern}");

        bool textLike = t.SupportsValuePattern || t.SupportsTextPattern ||
                        LooksLikeEdit(t.ClassName) ||
                        t.ControlType is "Edit" or "Document" or "Text";
        if (textLike)
            _log.Info("  -> Element wirkt textaehnlich. Lesen/Schreiben sollte moeglich sein.");
        else
            _log.Warn("  -> Element wirkt NICHT textaehnlich. Zugriff evtl. nur ueber Clipboard-Fallback.");

        if (t.LastKnownText != null)
            _log.Detail($"  Aktueller Text ({t.LastKnownText.Length} Zeichen): \"{Preview(t.LastKnownText)}\"");
        else
            _log.Detail("  Aktueller Text: (nicht lesbar beim Pinnen)");
        if (t.LastKnownSelection != null)
            _log.Detail($"  Selektion: {t.LastKnownSelection}");
    }

    // ----------------------------------------------------------- Validate ----

    public AccessResult ValidatePinnedTarget()
    {
        if (Pinned == null)
            return AccessResult.Fail("validate", "Kein Ziel fixiert. Bitte zuerst Hotkey im Zielfeld druecken.");

        var t = Pinned;

        if (t.ProcessId != 0 && !IsProcessRunning(t.ProcessId))
            return AccessResult.Fail("validate", $"Zielprozess (PID {t.ProcessId}) laeuft nicht mehr.");

        if (t.TopLevelHwnd != IntPtr.Zero && !Win32.IsWindow(t.TopLevelHwnd))
            return AccessResult.Fail("validate", "Top-Level-Fenster existiert nicht mehr.");

        bool controlOk = t.ControlHwnd != IntPtr.Zero && Win32.IsWindow(t.ControlHwnd) && ControlBelongsToProcess(t);
        _log.Detail($"  Validate: Prozess ok, Top-Level ok, ControlHwnd {(controlOk ? "gueltig" : "ungueltig/leer -> Neusuche noetig")}.");
        return AccessResult.Ok("validate");
    }

    // ------------------------------------------------------------ Resolve ----

    /// <summary>
    /// Stellt das UIA-Element wieder her: per HWND oder per Neusuche im Top-Level-Fenster.
    /// <paramref name="quiet"/> unterdrueckt das Logging (fuer das Live-Polling des Spiegels).
    /// </summary>
    public AutomationElement? ResolvePinnedTarget(bool quiet = false)
    {
        if (Pinned == null) return null;
        var t = Pinned;

        // 1) Direkt ueber das Control-HWND, falls noch gueltig (klassische Win32-Controls).
        if (t.ControlHwnd != IntPtr.Zero && Win32.IsWindow(t.ControlHwnd) && ControlBelongsToProcess(t))
        {
            var fromHandle = Safe(() => _automation.FromHandle(t.ControlHwnd), (AutomationElement?)null);
            if (fromHandle != null)
            {
                if (!quiet) _log.Detail("  Resolve: Element direkt aus ControlHwnd wiederhergestellt.");
                return fromHandle;
            }
        }

        // 2) Zwischengespeichertes lebendes Element wiederverwenden.
        //    Wichtig fuer windowless WPF-Controls (ControlHwnd=0), die nach
        //    Fokusverlust per Komplett-Neusuche oft nicht mehr auffindbar sind.
        if (_pinnedElement != null && IsElementAlive(_pinnedElement))
        {
            if (!quiet) _log.Detail("  Resolve: zwischengespeichertes UIA-Element noch gueltig, wird wiederverwendet.");
            return _pinnedElement;
        }

        // 3) Neusuche im Top-Level-Fenster.
        if (t.TopLevelHwnd == IntPtr.Zero || !Win32.IsWindow(t.TopLevelHwnd))
        {
            if (!quiet) _log.Warn("  Resolve: Top-Level-Fenster nicht verfuegbar.");
            return null;
        }

        var top = Safe(() => _automation.FromHandle(t.TopLevelHwnd), (AutomationElement?)null);
        if (top == null)
        {
            if (!quiet) _log.Warn("  Resolve: Top-Level-Fenster konnte nicht als UIA-Element geladen werden.");
            return null;
        }

        return ReSearchInWindow(top, t, quiet);
    }

    /// <summary>
    /// Sucht das Element im Fenster neu. Schneller nativer Weg per AutomationId,
    /// danach (falls noetig) gescoorte Komplettsuche als Fallback.
    /// </summary>
    private AutomationElement? ReSearchInWindow(AutomationElement top, PinnedTextTarget t, bool quiet)
    {
        var pool = new List<AutomationElement>();

        // Schnellpfad: native Suche per AutomationId (vermeidet langsamen Komplett-Walk).
        if (!string.IsNullOrEmpty(t.AutomationId))
        {
            try { pool.AddRange(top.FindAllDescendants(cf => cf.ByAutomationId(t.AutomationId))); }
            catch (Exception ex) { if (!quiet) _log.Detail($"  Resolve: AutomationId-Suche fehlgeschlagen: {ex.Message}"); }
            if (pool.Count > 0 && !quiet)
                _log.Detail($"  Resolve: {pool.Count} Treffer per AutomationId-Schnellsuche.");
        }

        // Fallback: kompletter Descendants-Walk (kann langsam sein).
        if (pool.Count == 0)
        {
            try { pool.AddRange(top.FindAllDescendants()); }
            catch (Exception ex)
            {
                if (!quiet) _log.Warn($"  Resolve: Descendants-Suche fehlgeschlagen: {ex.Message}");
                return null;
            }
        }

        var scored = pool
            .Select(c => (Element: c, Score: ScoreCandidate(c, t)))
            .Where(x => x.Score > 0)
            .OrderByDescending(x => x.Score)
            .ToList();

        if (scored.Count == 0)
        {
            if (!quiet) _log.Warn("  Resolve: Kein passendes Element im Fenster gefunden. Bitte erneut fixieren.");
            return null;
        }

        var best = scored[0];
        bool ambiguous = scored.Count > 1 && scored[1].Score == best.Score && best.Score < 5;
        if (ambiguous)
        {
            if (!quiet) _log.Warn($"  Resolve: Mehrere gleich plausible Felder (Score {best.Score}). " +
                                  "Kein sicheres Ziel -> bitte erneut fixieren.");
            return null;
        }

        if (!quiet) _log.Detail($"  Resolve: Element per Neusuche gefunden (Score {best.Score}, {scored.Count} Kandidat(en)).");
        return best.Element;
    }

    /// <summary>
    /// Nicht-intrusives Lesen fuer den Live-Spiegel: nur lesende Strategien
    /// (UIA Value/Text/Legacy, Win32 WM_GETTEXT). KEIN Clipboard/Fokuswechsel,
    /// damit das Polling die Zielanwendung nicht stoert.
    /// </summary>
    public AccessResult ReadForMirror()
    {
        if (Pinned == null)
            return AccessResult.Fail("mirror", "kein Ziel fixiert");

        var el = ResolvePinnedTarget(quiet: true);
        if (el == null)
            return AccessResult.Fail("mirror", "Ziel nicht auffindbar");

        if (Safe(() => el.Patterns.Value.IsSupported, false))
        {
            var r = Try(() => el.Patterns.Value.Pattern.Value.ValueOrDefault, "ValuePattern");
            if (r.Success) return r;
        }
        if (Safe(() => el.Patterns.Text.IsSupported, false))
        {
            var r = Try(() => el.Patterns.Text.Pattern.DocumentRange.GetText(-1), "TextPattern");
            if (r.Success) return r;
        }
        if (Safe(() => el.Patterns.LegacyIAccessible.IsSupported, false))
        {
            var r = Try(() => el.Patterns.LegacyIAccessible.Pattern.Value.ValueOrDefault, "Legacy");
            if (r.Success && !string.IsNullOrEmpty(r.Text)) return r;
        }
        if (Pinned.ControlHwnd != IntPtr.Zero && Win32.IsWindow(Pinned.ControlHwnd))
        {
            var r = ReadViaWin32(Pinned.ControlHwnd);
            if (r.Success) return r;
        }

        return AccessResult.Fail("mirror", "nur Clipboard moeglich - nicht spiegelbar");
    }

    private static bool IsElementAlive(AutomationElement el)
    {
        try
        {
            _ = el.Properties.ControlType.Value;
            return true;
        }
        catch
        {
            return false;
        }
    }

    private int ScoreCandidate(AutomationElement e, PinnedTextTarget t)
    {
        int score = 0;
        if (!string.IsNullOrEmpty(t.AutomationId) &&
            Safe(() => e.Properties.AutomationId.ValueOrDefault, "") == t.AutomationId)
            score += 5;
        if (Safe(() => e.Properties.ControlType.ValueOrDefault.ToString(), "") == t.ControlType)
            score += 2;
        if (!string.IsNullOrEmpty(t.ClassName) &&
            Safe(() => e.Properties.ClassName.ValueOrDefault, "") == t.ClassName)
            score += 2;
        if (!string.IsNullOrEmpty(t.Name) &&
            Safe(() => e.Properties.Name.ValueOrDefault, "") == t.Name)
            score += 2;

        // Weicher Tiebreak ueber Position - bewusst nur +1 (Position ist fragil).
        var rect = Safe(() => e.Properties.BoundingRectangle.ValueOrDefault, Rectangle.Empty);
        if (!rect.IsEmpty && !t.BoundingRectangle.IsEmpty &&
            Math.Abs(rect.X - t.BoundingRectangle.X) < 8 &&
            Math.Abs(rect.Y - t.BoundingRectangle.Y) < 8)
            score += 1;

        // Nur text-faehige Kandidaten sind ueberhaupt sinnvoll.
        if (score > 0 && !(Safe(() => e.Patterns.Value.IsSupported, false) ||
                           Safe(() => e.Patterns.Text.IsSupported, false)))
            score -= 1;

        return score;
    }

    // --------------------------------------------------------------- Read ----

    public AccessResult ReadText()
    {
        var el = ResolvePinnedTarget();
        if (el == null)
            return AccessResult.Fail("read", "Ziel nicht auffindbar. Bitte erneut fixieren.");

        // 1) UIA ValuePattern
        if (Safe(() => el.Patterns.Value.IsSupported, false))
        {
            var r = Try(() => el.Patterns.Value.Pattern.Value.ValueOrDefault, "UIA ValuePattern");
            if (r.Success) return r;
        }

        // 2) UIA TextPattern
        if (Safe(() => el.Patterns.Text.IsSupported, false))
        {
            var r = Try(() => el.Patterns.Text.Pattern.DocumentRange.GetText(-1), "UIA TextPattern");
            if (r.Success) return r;
        }

        // 3) UIA LegacyIAccessible
        if (Safe(() => el.Patterns.LegacyIAccessible.IsSupported, false))
        {
            var r = Try(() => el.Patterns.LegacyIAccessible.Pattern.Value.ValueOrDefault, "UIA LegacyIAccessible");
            if (r.Success && !string.IsNullOrEmpty(r.Text)) return r;
        }

        // 4) Win32 WM_GETTEXT
        if (Pinned!.ControlHwnd != IntPtr.Zero && Win32.IsWindow(Pinned.ControlHwnd))
        {
            var r = ReadViaWin32(Pinned.ControlHwnd);
            if (r.Success) return r;
            _log.Detail($"  Read: Win32 uebersprungen ({r.Error}).");
        }

        // 5) Clipboard-Fallback
        return ReadViaClipboard(el);
    }

    private AccessResult ReadViaWin32(IntPtr hwnd)
    {
        string cls = Win32.GetClassNameOf(hwnd);
        if (!LooksLikeEdit(cls))
            return AccessResult.Fail("Win32", $"Class '{cls}' ist kein Edit/RichEdit");

        try
        {
            Win32.SendMessageTimeout(hwnd, Win32.WM_GETTEXTLENGTH, IntPtr.Zero, IntPtr.Zero,
                Win32.SMTO_ABORTIFHUNG, 1000, out var lenRes);
            int len = lenRes.ToInt32();
            var sb = new StringBuilder(len + 1);
            Win32.SendMessageTimeout(hwnd, Win32.WM_GETTEXT, (IntPtr)(len + 1), sb,
                Win32.SMTO_ABORTIFHUNG, 2000, out _);
            return AccessResult.Ok($"Win32 WM_GETTEXT ({cls})", sb.ToString());
        }
        catch (Exception ex)
        {
            return AccessResult.Fail("Win32", ex.Message);
        }
    }

    private AccessResult ReadViaClipboard(AutomationElement el)
    {
        string? backup = BackupClipboardText();
        try
        {
            if (!FocusElement(el))
                return AccessResult.Fail("Clipboard", "Ziel konnte nicht fokussiert werden (evtl. Rechte/UIPI).");

            Win32.SendCtrlCombo(Win32.VK_A);
            Thread.Sleep(50);
            Win32.SendCtrlCombo(Win32.VK_C);
            Thread.Sleep(150);

            string text = Clipboard.ContainsText() ? Clipboard.GetText() : "";
            return AccessResult.Ok("Clipboard (Ctrl+A/Ctrl+C)", text);
        }
        catch (Exception ex)
        {
            return AccessResult.Fail("Clipboard", ex.Message);
        }
        finally
        {
            RestoreClipboardText(backup);
        }
    }

    // -------------------------------------------------------------- Write ----

    public AccessResult WriteText(string newText)
    {
        var el = ResolvePinnedTarget();
        if (el == null)
            return AccessResult.Fail("write", "Ziel nicht auffindbar. Bitte erneut fixieren.");

        // 1) UIA ValuePattern.SetValue (ersetzt den gesamten Inhalt)
        if (Safe(() => el.Patterns.Value.IsSupported, false))
        {
            bool readOnly = Safe(() => el.Patterns.Value.Pattern.IsReadOnly.ValueOrDefault, false);
            if (!readOnly)
            {
                try
                {
                    el.Patterns.Value.Pattern.SetValue(newText);
                    return AccessResult.Ok("UIA ValuePattern.SetValue");
                }
                catch (Exception ex)
                {
                    _log.Detail($"  Write: ValuePattern.SetValue fehlgeschlagen ({ex.Message}).");
                }
            }
            else
            {
                _log.Detail("  Write: ValuePattern ist read-only -> naechste Strategie.");
            }
        }

        // 2) Win32 WM_SETTEXT
        if (Pinned!.ControlHwnd != IntPtr.Zero && Win32.IsWindow(Pinned.ControlHwnd))
        {
            var r = WriteViaWin32(Pinned.ControlHwnd, newText);
            if (r.Success) return r;
            _log.Detail($"  Write: Win32 uebersprungen ({r.Error}).");
        }

        // 3) Clipboard-Paste-Fallback (Ctrl+A -> Ctrl+V)
        return WriteViaClipboard(el, newText);
    }

    private AccessResult WriteViaWin32(IntPtr hwnd, string text)
    {
        string cls = Win32.GetClassNameOf(hwnd);
        if (!LooksLikeEdit(cls))
            return AccessResult.Fail("Win32", $"Class '{cls}' ist kein Edit/RichEdit");

        try
        {
            var res = Win32.SendMessageTimeout(hwnd, Win32.WM_SETTEXT, IntPtr.Zero, text,
                Win32.SMTO_ABORTIFHUNG, 2000, out var ok);
            if (res != IntPtr.Zero && ok != IntPtr.Zero)
                return AccessResult.Ok($"Win32 WM_SETTEXT ({cls})");
            return AccessResult.Fail("Win32", "WM_SETTEXT lieferte kein Erfolgssignal.");
        }
        catch (Exception ex)
        {
            return AccessResult.Fail("Win32", ex.Message);
        }
    }

    private AccessResult WriteViaClipboard(AutomationElement el, string text)
    {
        string? backup = BackupClipboardText();
        try
        {
            if (!FocusElement(el))
                return AccessResult.Fail("Clipboard", "Ziel konnte nicht fokussiert werden (evtl. Rechte/UIPI).");

            Clipboard.SetText(text);
            Thread.Sleep(60);
            Win32.SendCtrlCombo(Win32.VK_A);
            Thread.Sleep(50);
            Win32.SendCtrlCombo(Win32.VK_V);
            Thread.Sleep(120);
            return AccessResult.Ok("Clipboard (Ctrl+A -> Ctrl+V)");
        }
        catch (Exception ex)
        {
            return AccessResult.Fail("Clipboard", ex.Message);
        }
        finally
        {
            RestoreClipboardText(backup);
        }
    }

    public AccessResult ReplaceSelection(string text)
    {
        var el = ResolvePinnedTarget();
        if (el == null)
            return AccessResult.Fail("replace-selection", "Ziel nicht auffindbar. Bitte erneut fixieren.");

        // Einfacher MVP-Weg: Selektion durch Paste ueberschreiben.
        string? backup = BackupClipboardText();
        try
        {
            if (!FocusElement(el))
                return AccessResult.Fail("Clipboard", "Ziel konnte nicht fokussiert werden.");
            Clipboard.SetText(text);
            Thread.Sleep(60);
            Win32.SendCtrlCombo(Win32.VK_V);
            Thread.Sleep(120);
            return AccessResult.Ok("Clipboard Paste (Selektion ersetzt)");
        }
        catch (Exception ex)
        {
            return AccessResult.Fail("Clipboard", ex.Message);
        }
        finally
        {
            RestoreClipboardText(backup);
        }
    }

    // -------------------------------------------------------------- Focus ----

    public bool FocusPinnedTarget()
    {
        var el = ResolvePinnedTarget();
        return el != null && FocusElement(el);
    }

    private bool FocusElement(AutomationElement el)
    {
        try
        {
            if (Pinned?.TopLevelHwnd != IntPtr.Zero)
                Win32.SetForegroundWindow(Pinned!.TopLevelHwnd);
            Thread.Sleep(60);
            el.Focus();
            Thread.Sleep(80);
            return true;
        }
        catch (Exception ex)
        {
            _log.Detail($"  Focus fehlgeschlagen: {ex.Message}");
            return false;
        }
    }

    public void ClearPinnedTarget()
    {
        Pinned = null;
        _pinnedElement = null;
        _log.Info("Fixiertes Ziel geloescht.");
    }

    // ------------------------------------------------------------ Helpers ----

    private IntPtr ResolveTopLevelHwnd(AutomationElement el, IntPtr controlHwnd)
    {
        if (controlHwnd != IntPtr.Zero)
            return Win32.GetAncestor(controlHwnd, Win32.GA_ROOT);

        // Element ist windowless (z. B. WPF): nach oben laufen bis ein HWND gefunden wird.
        try
        {
            var walker = _automation.TreeWalkerFactory.GetControlViewWalker();
            var cur = el;
            int guard = 0;
            while (cur != null && guard++ < 50)
            {
                var h = Safe(() => cur!.Properties.NativeWindowHandle.ValueOrDefault, IntPtr.Zero);
                if (h != IntPtr.Zero)
                    return Win32.GetAncestor(h, Win32.GA_ROOT);
                cur = walker.GetParent(cur);
            }
        }
        catch { /* ignore */ }

        return IntPtr.Zero;
    }

    private string? TryReadAny(AutomationElement el, out string strategy)
    {
        strategy = "";
        if (Safe(() => el.Patterns.Value.IsSupported, false))
        {
            var v = Safe(() => el.Patterns.Value.Pattern.Value.ValueOrDefault, (string?)null);
            if (v != null) { strategy = "Value"; return v; }
        }
        if (Safe(() => el.Patterns.Text.IsSupported, false))
        {
            var v = Safe(() => el.Patterns.Text.Pattern.DocumentRange.GetText(-1), (string?)null);
            if (v != null) { strategy = "Text"; return v; }
        }
        return null;
    }

    private TextSelectionInfo? TryReadSelection(AutomationElement el)
    {
        if (!Safe(() => el.Patterns.Text.IsSupported, false))
            return null;
        try
        {
            var ranges = el.Patterns.Text.Pattern.GetSelection();
            if (ranges == null || ranges.Length == 0) return null;
            var selText = ranges[0].GetText(-1);
            return new TextSelectionInfo { Start = 0, Length = selText.Length, SelectedText = selText };
        }
        catch
        {
            return null;
        }
    }

    private bool ControlBelongsToProcess(PinnedTextTarget t)
    {
        if (t.ControlHwnd == IntPtr.Zero) return false;
        Win32.GetWindowThreadProcessId(t.ControlHwnd, out uint pid);
        return pid == (uint)t.ProcessId;
    }

    private AccessResult Try(Func<string?> read, string strategy)
    {
        try
        {
            var text = read();
            if (text == null)
                return AccessResult.Fail(strategy, "null zurueckgegeben");
            return AccessResult.Ok(strategy, text);
        }
        catch (Exception ex)
        {
            return AccessResult.Fail(strategy, ex.Message);
        }
    }

    private static bool LooksLikeEdit(string className)
        => !string.IsNullOrEmpty(className) &&
           (className.Contains("edit", StringComparison.OrdinalIgnoreCase) ||
            className.Contains("richedit", StringComparison.OrdinalIgnoreCase));

    private static string GetProcessName(int pid)
    {
        if (pid == 0) return "(unbekannt)";
        try { return System.Diagnostics.Process.GetProcessById(pid).ProcessName; }
        catch { return "(unbekannt)"; }
    }

    private static bool IsProcessRunning(int pid)
    {
        try { System.Diagnostics.Process.GetProcessById(pid); return true; }
        catch { return false; }
    }

    private static string? BackupClipboardText()
    {
        try { return Clipboard.ContainsText() ? Clipboard.GetText() : null; }
        catch { return null; }
    }

    private static void RestoreClipboardText(string? backup)
    {
        try
        {
            if (backup != null) Clipboard.SetText(backup);
        }
        catch { /* best effort */ }
    }

    private static string Preview(string s)
    {
        s = s.Replace("\r", " ").Replace("\n", " ");
        return s.Length > 80 ? s[..80] + "..." : s;
    }

    private static T Safe<T>(Func<T> f, T fallback)
    {
        try { return f(); }
        catch { return fallback; }
    }

    public void Dispose() => _automation.Dispose();
}
