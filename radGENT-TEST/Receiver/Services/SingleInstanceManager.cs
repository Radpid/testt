using System.IO;
using System.IO.Pipes;
using System.Text.Json;
using TextPinMvp.Models;

namespace TextPinMvp.Services;

/// <summary>
/// Sorgt dafuer, dass nur eine Instanz laeuft, und reicht Kontext-Anforderungen
/// einer neu gestarteten (zweiten) Instanz ueber eine lokale Named Pipe an die
/// bereits laufende Instanz weiter. So oeffnet ein radgent://- oder Kommandozeilen-
/// Start kein zweites Fenster, sondern aktualisiert das vorhandene.
/// </summary>
public sealed class SingleInstanceManager : IDisposable
{
    private const string MutexName = @"Local\radGENT.TextPinMvp.SingleInstance";

    private readonly Mutex _mutex;
    private CancellationTokenSource? _cts;
    private Task? _loop;

    /// <summary>true, wenn dies die erste/laufende Instanz ist.</summary>
    public bool IsFirstInstance { get; }

    public SingleInstanceManager()
    {
        _mutex = new Mutex(initiallyOwned: true, MutexName, out bool createdNew);
        IsFirstInstance = createdNew;
    }

    /// <summary>
    /// Startet (nur in der ersten Instanz) den Pipe-Server. Der Callback wird bei
    /// jeder weitergereichten Anforderung aufgerufen; <c>null</c> bedeutet
    /// "nur Fenster nach vorne holen" (kein Nutzlast-Wechsel).
    /// </summary>
    public void StartServer(Action<ContextMessage?> onReceived)
    {
        if (!IsFirstInstance)
            throw new InvalidOperationException("StartServer darf nur in der ersten Instanz aufgerufen werden.");

        _cts = new CancellationTokenSource();
        _loop = Task.Run(() => AcceptLoopAsync(onReceived, _cts.Token));
    }

    private async Task AcceptLoopAsync(Action<ContextMessage?> onReceived, CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            try
            {
                using var server = new NamedPipeServerStream(
                    ContextChannel.PipeName, PipeDirection.In, 1,
                    PipeTransmissionMode.Byte, PipeOptions.Asynchronous);

                await server.WaitForConnectionAsync(ct);

                using var reader = new StreamReader(server);
                string payload = (await reader.ReadToEndAsync(ct)).Trim();

                if (payload.Length == 0 || payload == ContextChannel.FocusOnlyMarker)
                {
                    onReceived(null);
                    continue;
                }

                ContextMessage? msg = null;
                try { msg = JsonSerializer.Deserialize<ContextMessage>(payload, ContextChannel.Json); }
                catch { /* fehlerhafte Nutzlast -> wie Focus-only behandeln */ }

                onReceived(msg);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch
            {
                // Defensiv: nicht im Hot-Loop drehen, falls die Pipe kurzzeitig fehlschlaegt.
                try { await Task.Delay(250, ct); } catch { break; }
            }
        }
    }

    /// <summary>
    /// Wird von der zweiten Instanz aufgerufen: verbindet sich mit der laufenden
    /// Instanz und sendet die Nutzlast (oder den Focus-only-Marker). Gibt true bei Erfolg zurueck.
    /// </summary>
    public bool Forward(ContextMessage? message, int connectTimeoutMs = 2000)
    {
        try
        {
            using var client = new NamedPipeClientStream(".", ContextChannel.PipeName, PipeDirection.Out);
            client.Connect(connectTimeoutMs);

            string payload = message == null
                ? ContextChannel.FocusOnlyMarker
                : JsonSerializer.Serialize(message, ContextChannel.Json);

            using var writer = new StreamWriter(client) { AutoFlush = true };
            writer.Write(payload);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public void Dispose()
    {
        try { _cts?.Cancel(); } catch { /* ignore */ }
        try { _loop?.Wait(1000); } catch { /* best effort */ }
        _cts?.Dispose();

        try
        {
            if (IsFirstInstance) _mutex.ReleaseMutex();
        }
        catch { /* ignore */ }
        _mutex.Dispose();
    }
}
