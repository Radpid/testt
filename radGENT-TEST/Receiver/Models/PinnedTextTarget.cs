using System.Drawing;

namespace TextPinMvp.Models;

/// <summary>
/// Robuster Descriptor des fixierten Zieltextfelds. Bewusst mit mehreren
/// Identifikationsmerkmalen, weil HWND/RuntimeId allein nicht zuverlaessig sind.
/// </summary>
public class PinnedTextTarget
{
    public int ProcessId { get; set; }
    public string ProcessName { get; set; } = "";

    public IntPtr TopLevelHwnd { get; set; }
    public string TopLevelTitle { get; set; } = "";

    public IntPtr ControlHwnd { get; set; }

    public int[]? RuntimeId { get; set; }

    public string AutomationId { get; set; } = "";
    public string Name { get; set; } = "";
    public string ClassName { get; set; } = "";
    public string ControlType { get; set; } = "";

    public Rectangle BoundingRectangle { get; set; }

    public bool SupportsTextPattern { get; set; }
    public bool SupportsValuePattern { get; set; }
    public bool SupportsLegacyIAccessiblePattern { get; set; }
    public bool IsValuePatternReadOnly { get; set; }

    public string? LastKnownText { get; set; }
    public TextSelectionInfo? LastKnownSelection { get; set; }

    public DateTime PinnedAtUtc { get; set; } = DateTime.UtcNow;

    public string ShortDescription
        => $"{ProcessName} (PID {ProcessId}) - \"{TopLevelTitle}\" - {ControlType}/{ClassName}";

    public string RuntimeIdString
        => RuntimeId == null ? "(none)" : string.Join(".", RuntimeId);
}
