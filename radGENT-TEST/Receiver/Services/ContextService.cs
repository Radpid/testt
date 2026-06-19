using System.Text.RegularExpressions;
using TextPinMvp.Models;

namespace TextPinMvp.Services;

/// <summary>
/// Zentrale, einzige Stelle fuer Kontextwechsel. Alle Eingangskanaele
/// (Kommandozeile, radgent://-URI, Single-Instance-Forwarding) muessen
/// ueber diesen Service gehen, damit Validierung und Logging nicht dupliziert werden.
/// </summary>
public sealed class ContextService
{
    private readonly AppLog _log;

    /// <summary>Erlaubtes ContextId-Format: Buchstaben/Ziffern/Bindestrich/Unterstrich, 1-64 Zeichen.</summary>
    private static readonly Regex ContextIdPattern =
        new("^[A-Za-z0-9_-]{1,64}$", RegexOptions.Compiled);

    /// <summary>Der zuletzt erfolgreich gesetzte Kontext (null, falls noch keiner).</summary>
    public ContextMessage? Current { get; private set; }

    /// <summary>Wird nach einem erfolgreichen, validierten Kontextwechsel ausgeloest.</summary>
    public event Action<ContextMessage>? ContextChanged;

    public ContextService(AppLog log) => _log = log;

    /// <summary>
    /// Validiert die Anforderung und setzt bei Erfolg den aktiven Kontext.
    /// Gibt true bei Erfolg zurueck. Wirft nie - ungueltige externe Eingaben
    /// werden geloggt und verworfen.
    /// </summary>
    public bool SetContext(string? contextId, string? info, string source)
    {
        _log.Info($"Kontext-Anforderung von '{source}' erhalten.");

        if (string.IsNullOrWhiteSpace(contextId))
        {
            _log.Warn("Kontext abgelehnt: contextId fehlt.");
            return false;
        }

        contextId = contextId.Trim();
        if (!ContextIdPattern.IsMatch(contextId))
        {
            // Bewusst KEINE Ausgabe des Roh-Wertes (koennte sensibel/manipuliert sein).
            _log.Warn($"Kontext abgelehnt: ungueltiges contextId-Format ({contextId.Length} Zeichen).");
            return false;
        }

        var message = new ContextMessage(contextId, NormalizeInfo(info), source, DateTimeOffset.Now);
        Current = message;

        _log.Success($"Kontext gesetzt: {contextId} (Quelle: {source}).");
        ContextChanged?.Invoke(message);
        return true;
    }

    private static string? NormalizeInfo(string? info)
    {
        if (string.IsNullOrWhiteSpace(info)) return null;
        info = info.Trim();
        return info.Length > 4096 ? info[..4096] : info;
    }
}
