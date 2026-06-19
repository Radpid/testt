namespace TextPinMvp.Models;

/// <summary>
/// Ergebnis eines Lese-/Schreibversuchs einer einzelnen Strategie.
/// Wird fuer transparentes Debug-Logging genutzt (welche Strategie hat funktioniert?).
/// </summary>
public class AccessResult
{
    public bool Success { get; init; }
    public string Strategy { get; init; } = "";
    public string? Text { get; init; }
    public string? Error { get; init; }

    public static AccessResult Ok(string strategy, string? text = null)
        => new() { Success = true, Strategy = strategy, Text = text };

    public static AccessResult Fail(string strategy, string error)
        => new() { Success = false, Strategy = strategy, Error = error };
}
