using TextPinMvp.Models;

namespace TextPinMvp.Services;

/// <summary>
/// Ergebnis des Parsens der Startargumente. Genau eine der Eigenschaften ist gesetzt:
/// <see cref="Message"/> bei Erfolg, <see cref="Error"/> bei einer erkennbar fehlerhaften
/// Anforderung. Sind beide null, enthielten die Argumente keine Kontext-Anforderung.
/// </summary>
public sealed record ParsedContextRequest(ContextMessage? Message, string? Error)
{
    public static readonly ParsedContextRequest None = new(null, null);
    public bool HasMessage => Message != null;
    public bool HasError => Error != null;
}

/// <summary>
/// Wandelt Startargumente in eine <see cref="ContextMessage"/>. Unterstuetzt zwei
/// gleichwertige Eingangsformen, die eine fremde App ohne unseren Code ausloesen kann:
///   1) Kommandozeile:  --context=12345  (auch --contextId, --info), Quelle "cmd-arg"
///   2) Custom-URI:      radgent://set-context?contextId=12345&amp;info=...  , Quelle "custom-uri"
/// </summary>
public static class ContextRequestParser
{
    public const string UriScheme = "radgent";
    public const string UriHost = "set-context";

    /// <summary>
    /// <paramref name="args"/> sind die Rohargumente inkl. Programmpfad
    /// (z. B. aus <c>Environment.GetCommandLineArgs()</c>).
    /// </summary>
    public static ParsedContextRequest Parse(string[] args)
    {
        // args[0] ist der Programmpfad -> ueberspringen.
        var relevant = args.Skip(1).ToArray();

        // 1) Custom-URI hat Vorrang (so startet Windows uns bei radgent://...).
        foreach (var arg in relevant)
        {
            if (arg.StartsWith($"{UriScheme}://", StringComparison.OrdinalIgnoreCase))
                return ParseUri(arg);
        }

        // 2) Klassische Kommandozeilen-Flags.
        return ParseFlags(relevant);
    }

    private static ParsedContextRequest ParseUri(string uriText)
    {
        if (!Uri.TryCreate(uriText, UriKind.Absolute, out var uri))
            return new ParsedContextRequest(null, "Ungueltige Protokoll-URI.");

        if (!string.Equals(uri.Scheme, UriScheme, StringComparison.OrdinalIgnoreCase))
            return new ParsedContextRequest(null, $"Nicht unterstuetztes URI-Schema '{uri.Scheme}'.");

        if (!string.Equals(uri.Host, UriHost, StringComparison.OrdinalIgnoreCase))
            return new ParsedContextRequest(null, $"Nicht unterstuetztes URI-Kommando '{uri.Host}'.");

        var query = ParseQuery(uri.Query);
        query.TryGetValue("contextId", out var contextId);
        if (string.IsNullOrWhiteSpace(contextId))
            query.TryGetValue("patientId", out contextId); // Komfort-Alias
        query.TryGetValue("info", out var info);

        if (string.IsNullOrWhiteSpace(contextId))
            return new ParsedContextRequest(null, "URI ohne contextId.");

        return new ParsedContextRequest(
            new ContextMessage(contextId!, info, "custom-uri", DateTimeOffset.Now), null);
    }

    private static ParsedContextRequest ParseFlags(string[] args)
    {
        string? contextId = null;
        string? info = null;

        for (int i = 0; i < args.Length; i++)
        {
            var (key, inlineValue) = SplitFlag(args[i]);
            if (key == null) continue;

            string? Value()
            {
                if (inlineValue != null) return inlineValue;
                if (i + 1 < args.Length && !args[i + 1].StartsWith("--"))
                    return args[++i];
                return null;
            }

            switch (key)
            {
                case "context":
                case "contextid":
                case "patientid":
                    contextId = Value();
                    break;
                case "info":
                    info = Value();
                    break;
            }
        }

        if (string.IsNullOrWhiteSpace(contextId))
            return ParsedContextRequest.None; // keine Kontext-Anforderung in den Argumenten

        return new ParsedContextRequest(
            new ContextMessage(contextId!, info, "cmd-arg", DateTimeOffset.Now), null);
    }

    private static (string? key, string? inlineValue) SplitFlag(string arg)
    {
        if (!arg.StartsWith("--", StringComparison.Ordinal))
            return (null, null);

        var body = arg[2..];
        int eq = body.IndexOf('=');
        if (eq >= 0)
            return (body[..eq].ToLowerInvariant(), body[(eq + 1)..]);
        return (body.ToLowerInvariant(), null);
    }

    private static Dictionary<string, string> ParseQuery(string query)
    {
        var result = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        if (string.IsNullOrEmpty(query)) return result;

        foreach (var pair in query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            int eq = pair.IndexOf('=');
            if (eq < 0)
            {
                result[Uri.UnescapeDataString(pair)] = "";
            }
            else
            {
                var key = Uri.UnescapeDataString(pair[..eq]);
                var value = Uri.UnescapeDataString(pair[(eq + 1)..]);
                result[key] = value;
            }
        }
        return result;
    }
}
