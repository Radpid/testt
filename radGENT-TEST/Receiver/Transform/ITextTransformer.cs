namespace TextPinMvp.Transform;

/// <summary>
/// Austauschbare Texttransformation. Aktuell eine Dummy-Implementierung
/// (Woerter rueckwaerts); spaeter kann hier ein LLM-basierter Transformer
/// ohne Aenderung am restlichen Code eingehaengt werden.
/// </summary>
public interface ITextTransformer
{
    string Name { get; }
    Task<string> TransformAsync(string input, CancellationToken ct = default);
}
