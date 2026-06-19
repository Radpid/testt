using System.Text.Json;

namespace TextPinMvp.Models;

/// <summary>
/// Eine eingehende Kontext-Anforderung. Wird von allen Eingangskanaelen
/// (Kommandozeile, radgent://-URI, Single-Instance-Forwarding) als gemeinsame
/// Nutzlast verwendet und ueber die Named-Pipe an die laufende Instanz weitergereicht.
/// </summary>
/// <param name="ContextId">Fachlicher Schluessel (z. B. PatientId). Validierung in ContextService.</param>
/// <param name="Info">Optionaler Freitext, der zusaetzlich angezeigt wird.</param>
/// <param name="Source">Herkunft der Anforderung: "cmd-arg", "custom-uri", "forwarded".</param>
/// <param name="SentAt">Zeitpunkt der Erzeugung.</param>
/// <param name="SchemaVersion">Versionsmarker, damit ein Mismatch erkennbar bleibt.</param>
public sealed record ContextMessage(
    string ContextId,
    string? Info,
    string Source,
    DateTimeOffset SentAt,
    int SchemaVersion = 1);

/// <summary>
/// Gemeinsame Konstanten fuer den lokalen Single-Instance-Kanal (Named Pipe).
/// </summary>
public static class ContextChannel
{
    /// <summary>Name der lokalen Named Pipe fuer das Single-Instance-Forwarding.</summary>
    public const string PipeName = "radGENT.TextPinMvp.ContextChannel";

    /// <summary>Marker, den eine zweite Instanz sendet, wenn keine Nutzlast vorliegt (nur Fenster nach vorne holen).</summary>
    public const string FocusOnlyMarker = "__focus__";

    public static readonly JsonSerializerOptions Json = new() { WriteIndented = false };
}
