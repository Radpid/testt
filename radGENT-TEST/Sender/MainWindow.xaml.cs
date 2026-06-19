using System.Diagnostics;
using System.IO;
using System.Windows;

namespace SenderApp;

/// <summary>
/// Test-Sender. Bewusst OHNE jede Kenntnis interner Receiver-Mechanismen (keine Named Pipe):
/// er emuliert exakt das, was eine fremde, nicht von uns kontrollierte Anwendung tun kann -
/// entweder ein radgent://-URI oeffnen oder die Receiver-EXE mit Argumenten starten.
/// </summary>
public partial class MainWindow : Window
{
    private const string UriScheme = "radgent";
    private const string UriHost = "set-context";

    public MainWindow()
    {
        InitializeComponent();
        ReceiverPathBox.Text = GuessReceiverPath();
        Log("Bereit. ContextId eingeben und eine Sende-Methode waehlen.");
    }

    private void SendUriButton_Click(object sender, RoutedEventArgs e)
    {
        var contextId = ContextIdBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(contextId))
        {
            Log("FEHLER: ContextId ist leer.");
            return;
        }

        var uri = $"{UriScheme}://{UriHost}?contextId={Uri.EscapeDataString(contextId)}";
        var info = InfoBox.Text.Trim();
        if (!string.IsNullOrWhiteSpace(info))
            uri += $"&info={Uri.EscapeDataString(info)}";

        try
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = uri,
                UseShellExecute = true
            });
            Log($"URI gesendet: {uri}");
        }
        catch (Exception ex)
        {
            Log($"FEHLER beim Oeffnen der URI: {ex.Message}");
            Log("  Hinweis: Receiver muss mindestens einmal gestartet worden sein (registriert radgent:// fuer den Benutzer).");
        }
    }

    private void SendArgButton_Click(object sender, RoutedEventArgs e)
    {
        var contextId = ContextIdBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(contextId))
        {
            Log("FEHLER: ContextId ist leer.");
            return;
        }

        var exePath = ReceiverPathBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(exePath) || !File.Exists(exePath))
        {
            Log($"FEHLER: Receiver-EXE nicht gefunden: \"{exePath}\"");
            return;
        }

        var psi = new ProcessStartInfo { FileName = exePath, UseShellExecute = false };
        psi.ArgumentList.Add($"--context={contextId}");
        var info = InfoBox.Text.Trim();
        if (!string.IsNullOrWhiteSpace(info))
            psi.ArgumentList.Add($"--info={info}");

        try
        {
            Process.Start(psi);
            Log($"EXE gestartet: \"{exePath}\" --context={contextId}" +
                (string.IsNullOrWhiteSpace(info) ? "" : $" --info={info}"));
        }
        catch (Exception ex)
        {
            Log($"FEHLER beim Start der Receiver-EXE: {ex.Message}");
        }
    }

    private void ClearLogButton_Click(object sender, RoutedEventArgs e) => LogList.Items.Clear();

    /// <summary>Bester Versuch, die gebaute Receiver-EXE relativ zum Sender zu finden.</summary>
    private static string GuessReceiverPath()
    {
        var config = "Debug";
#if !DEBUG
        config = "Release";
#endif
        try
        {
            // Sender liegt unter Sender\bin\<config>\net8.0-windows -> 4 Ebenen hoch ist der Repo-Ordner.
            var repoRoot = new DirectoryInfo(AppContext.BaseDirectory).Parent?.Parent?.Parent?.Parent?.FullName;
            if (repoRoot != null)
            {
                var candidate = Path.Combine(repoRoot, "Receiver", "bin", config, "net8.0-windows", "TextPinMvp.exe");
                return Path.GetFullPath(candidate);
            }
        }
        catch { /* Fallback unten */ }

        return @"..\Receiver\bin\Debug\net8.0-windows\TextPinMvp.exe";
    }

    private void Log(string message)
    {
        LogList.Items.Add($"{DateTime.Now:HH:mm:ss}  {message}");
        if (LogList.Items.Count > 0)
            LogList.ScrollIntoView(LogList.Items[^1]);
    }
}
