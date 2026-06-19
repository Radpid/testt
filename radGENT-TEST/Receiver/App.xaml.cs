using System.Windows;
using TextPinMvp.Services;

namespace TextPinMvp;

public partial class App : Application
{
    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        // 1) Startargumente in eine (optionale) Kontext-Anforderung parsen.
        var parsed = ContextRequestParser.Parse(Environment.GetCommandLineArgs());

        // 2) Single-Instance pruefen.
        var singleInstance = new SingleInstanceManager();

        if (!singleInstance.IsFirstInstance)
        {
            // Es laeuft bereits eine Instanz. Diese App darf nur einmal laufen.
            // Eine evtl. vorhandene Anforderung wird an die laufende Instanz weitergereicht.
            bool forwarded = singleInstance.Forward(parsed.Message);
            singleInstance.Dispose();

            if (parsed.Message != null && !forwarded)
            {
                // Mutex belegt, aber die laufende Instanz war nicht erreichbar
                // (z. B. haengender/abgestuerzter Vorgaenger-Prozess).
                MessageBox.Show(
                    "Die Receiver-Anwendung scheint bereits zu laufen, konnte aber nicht erreicht werden.\n\n" +
                    "Moeglicherweise haengt ein frueherer Prozess. Bitte alle 'TextPinMvp.exe' im " +
                    "Task-Manager beenden und erneut starten.",
                    "radGENT Receiver - Kontext nicht zustellbar",
                    MessageBoxButton.OK, MessageBoxImage.Warning);
            }
            else if (parsed.Message == null)
            {
                // Reiner Doppelstart ohne Kontext: deutlich sichtbar machen.
                MessageBox.Show(
                    "Die Receiver-Anwendung laeuft bereits.\n\n" +
                    "Es kann nur eine Instanz gleichzeitig laufen. Das vorhandene Fenster wird in den " +
                    "Vordergrund geholt.",
                    "radGENT Receiver - bereits gestartet",
                    MessageBoxButton.OK, MessageBoxImage.Information);
            }
            // Bei erfolgreichem Forward eines Kontexts: keine Meldung (nahtloser Kontextwechsel).

            Shutdown();
            return;
        }

        // 3) Erste Instanz: Hauptfenster erzeugen, Server starten, Initial-Anforderung anwenden.
        var window = new MainWindow(singleInstance, parsed);
        window.Show();
    }
}
