using System.Collections.ObjectModel;
using System.Text;

namespace TextPinMvp.Services;

public enum LogLevel { Info, Success, Warn, Error, Detail }

public sealed class LogEntry
{
    public DateTime Timestamp { get; init; } = DateTime.Now;
    public LogLevel Level { get; init; }
    public string Message { get; init; } = "";

    public string Display => $"{Timestamp:HH:mm:ss.fff}  [{Level.ToString().ToUpperInvariant()}]  {Message}";
}

/// <summary>
/// Einfacher, an die UI gebundener Log-Sink. Wird vom MainWindow an eine
/// ListBox gebunden, damit jeder Schritt live sichtbar ist.
/// </summary>
public sealed class AppLog
{
    public ObservableCollection<LogEntry> Entries { get; } = new();

    public event Action<LogEntry>? EntryAdded;

    public void Info(string message) => Add(LogLevel.Info, message);
    public void Success(string message) => Add(LogLevel.Success, message);
    public void Warn(string message) => Add(LogLevel.Warn, message);
    public void Error(string message) => Add(LogLevel.Error, message);
    public void Detail(string message) => Add(LogLevel.Detail, message);

    public void Add(LogLevel level, string message)
    {
        var entry = new LogEntry { Level = level, Message = message };
        Entries.Add(entry);
        EntryAdded?.Invoke(entry);
    }

    public void Clear() => Entries.Clear();

    public string DumpText()
    {
        var sb = new StringBuilder();
        foreach (var e in Entries)
            sb.AppendLine(e.Display);
        return sb.ToString();
    }
}
