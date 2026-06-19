using Microsoft.Win32;

namespace TextPinMvp.Services;

/// <summary>
/// Registriert das Custom-URI-Schema (radgent://) im aktuellen Benutzerkontext.
/// Bewusst unter HKEY_CURRENT_USER\Software\Classes -> keine Administratorrechte noetig.
/// Idempotent: schreibt nur, wenn der hinterlegte Pfad noch nicht stimmt.
/// </summary>
public static class UriSchemeRegistrar
{
    private static readonly string SchemeKeyPath = $@"Software\Classes\{ContextRequestParser.UriScheme}";

    /// <summary>
    /// Stellt sicher, dass radgent:// auf die aktuelle ausfuehrbare Datei zeigt.
    /// Fehler werden geloggt, aber nicht geworfen (die App soll trotzdem starten).
    /// </summary>
    public static void EnsureRegistered(AppLog log)
    {
        string? exePath = Environment.ProcessPath;
        if (string.IsNullOrEmpty(exePath))
        {
            log.Warn("URI-Schema: Pfad zur ausfuehrbaren Datei nicht ermittelbar - Registrierung uebersprungen.");
            return;
        }

        string expectedCommand = $"\"{exePath}\" \"%1\"";

        try
        {
            using var existing = Registry.CurrentUser.OpenSubKey($@"{SchemeKeyPath}\shell\open\command");
            if (existing?.GetValue(null) as string == expectedCommand)
            {
                log.Detail($"URI-Schema '{ContextRequestParser.UriScheme}://' bereits korrekt registriert.");
                return;
            }
        }
        catch { /* weiter zur Neuschreibung */ }

        try
        {
            using var schemeKey = Registry.CurrentUser.CreateSubKey(SchemeKeyPath);
            schemeKey.SetValue(null, $"URL:radGENT Context Protocol");
            schemeKey.SetValue("URL Protocol", "");

            using var commandKey = Registry.CurrentUser.CreateSubKey($@"{SchemeKeyPath}\shell\open\command");
            commandKey.SetValue(null, expectedCommand);

            log.Success($"URI-Schema '{ContextRequestParser.UriScheme}://' fuer aktuellen Benutzer registriert.");
            log.Detail($"  Befehl: {expectedCommand}");
        }
        catch (Exception ex)
        {
            log.Error($"URI-Schema-Registrierung fehlgeschlagen: {ex.Message}");
        }
    }
}
