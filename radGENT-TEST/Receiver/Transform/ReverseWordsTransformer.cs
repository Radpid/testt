using System.Text;
using System.Text.RegularExpressions;

namespace TextPinMvp.Transform;

/// <summary>
/// Dummy-Transformation: dreht jedes einzelne Wort um, laesst Whitespace
/// (inkl. Zeilenumbrueche) und Position der Trenner unveraendert.
/// Beispiel: "Hallo Welt" -> "ollaH tleW".
/// </summary>
public sealed class ReverseWordsTransformer : ITextTransformer
{
    public string Name => "Dummy: Woerter rueckwaerts";

    public Task<string> TransformAsync(string input, CancellationToken ct = default)
    {
        if (string.IsNullOrEmpty(input))
            return Task.FromResult(input);

        // Token an Wortgrenzen splitten, Trenner (Whitespace/Satzzeichen) erhalten.
        var sb = new StringBuilder(input.Length);
        foreach (Match m in Regex.Matches(input, @"\w+|\W+"))
        {
            if (m.Value.Length > 0 && char.IsLetterOrDigit(m.Value[0]))
            {
                var chars = m.Value.ToCharArray();
                Array.Reverse(chars);
                sb.Append(chars);
            }
            else
            {
                sb.Append(m.Value);
            }
        }

        return Task.FromResult(sb.ToString());
    }
}
