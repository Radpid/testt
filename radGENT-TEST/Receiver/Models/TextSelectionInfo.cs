namespace TextPinMvp.Models;

/// <summary>
/// Bekannte Selektion/Cursorposition zum Zeitpunkt des Pinnings bzw. des letzten Zugriffs.
/// </summary>
public class TextSelectionInfo
{
    public int Start { get; set; }
    public int Length { get; set; }
    public string? SelectedText { get; set; }

    public override string ToString()
        => $"Start={Start}, Length={Length}, Text=\"{Preview(SelectedText)}\"";

    private static string Preview(string? s)
    {
        if (string.IsNullOrEmpty(s)) return "";
        s = s.Replace("\r", " ").Replace("\n", " ");
        return s.Length > 40 ? s[..40] + "..." : s;
    }
}
