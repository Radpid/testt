# radGENT Receiver - Context Signaling Integration Guide

This guide explains how an **external application** can tell the radGENT Receiver
(`TextPinMvp.exe`) to switch to a specific context (for example a patient/case id).

It is written for a developer who wants to add "send context to radGENT" to their
own application. You do **not** need any library, SDK, or source code from us.
You only need to be able to do one of two ordinary Windows operations:

1. **Launch an executable with an argument**, or
2. **Open a URL** (a custom URI).

That's the whole integration surface. There is intentionally nothing to link
against and no network protocol to implement on your side.

---

## 1. Concept

```text
Your application  --->  (command line OR radgent:// URI)  --->  radGENT Receiver
                                                                 shows / switches context
```

A "context" consists of:

| Field       | Required | Meaning                                             |
|-------------|----------|-----------------------------------------------------|
| `contextId` | yes      | The key to switch to (e.g. a patient id).           |
| `info`      | no       | Optional free text shown next to the id.            |

The Receiver enforces that **only one instance runs**. If it is already running,
your trigger is delivered to the running instance (it does not open a second
window). If it is not running, your trigger starts it and the context is applied
on startup.

---

## 2. Method A - Command line (start the EXE with arguments)

Start `TextPinMvp.exe` with a `--context` argument:

```text
TextPinMvp.exe --context=12345
TextPinMvp.exe --context=12345 --info=Mustermann
```

Supported flags (case-insensitive):

| Flag                       | Maps to     | Notes                                  |
|----------------------------|-------------|----------------------------------------|
| `--context`, `--contextId` | `contextId` | Primary form.                          |
| `--patientId`              | `contextId` | Convenience alias.                     |
| `--info`                   | `info`      | Optional.                              |

Both `--key=value` and `--key value` are accepted.

### Examples

PowerShell:

```powershell
Start-Process "C:\Path\To\TextPinMvp.exe" -ArgumentList '--context=12345','--info=Mustermann, Max'
```

C# (.NET):

```csharp
var psi = new ProcessStartInfo
{
    FileName = @"C:\Path\To\TextPinMvp.exe",
    UseShellExecute = false
};
psi.ArgumentList.Add("--context=12345");
psi.ArgumentList.Add("--info=Mustermann, Max"); // optional
Process.Start(psi);
```

> Tip: use `ArgumentList` (not a single argument string). It quotes each value
> correctly, so spaces in `info` are handled for you.

Classic batch / `cmd`:

```bat
start "" "C:\Path\To\TextPinMvp.exe" --context=12345
```

Use Method A when your application can be configured to "call an external
program" with a placeholder (a very common pattern in clinic/practice software,
where you configure the path plus an argument template like `--context={ID}`).

---

## 3. Method B - Custom URI (`radgent://`)

Open a URL with this shape:

```text
radgent://set-context?contextId=12345
radgent://set-context?contextId=12345&info=Mustermann
```

Rules:

- Scheme must be `radgent`.
- Command (host) must be `set-context`.
- Query parameters: `contextId` (required), `info` (optional).
- `patientId` is accepted as an alias for `contextId`.
- **URL-encode** parameter values (e.g. a space becomes `%20`).

### Examples

C# (.NET):

```csharp
var contextId = Uri.EscapeDataString("12345");
var info      = Uri.EscapeDataString("Mustermann, Max");
var url = $"radgent://set-context?contextId={contextId}&info={info}";

Process.Start(new ProcessStartInfo { FileName = url, UseShellExecute = true });
```

PowerShell:

```powershell
Start-Process "radgent://set-context?contextId=12345&info=Mustermann%2C%20Max"
```

HTML link (e.g. inside an internal web app or portal):

```html
<a href="radgent://set-context?contextId=12345&info=Mustermann">Open in radGENT</a>
```

Use Method B when your application (or a web page) can open URLs but cannot
configure an executable path, or when you simply prefer a stable, location-
independent trigger.

### URI registration

The `radgent://` scheme is registered automatically the first time the Receiver
runs, per user, under `HKEY_CURRENT_USER\Software\Classes\radgent` (no admin
rights required). So: **run the Receiver once**, then `radgent://` links work.

For manual setup or deployment, see `Receiver/uri-scheme.reg` (adjust the path
to the installed `TextPinMvp.exe`). An installer can write the same key with the
final installed path.

---

## 4. Behavior you can rely on

| Situation                          | What happens                                                        |
|------------------------------------|---------------------------------------------------------------------|
| Receiver not running               | It starts, then applies the context on startup.                     |
| Receiver already running           | The context is delivered to the running instance; no second window. |
| Already running, valid context     | Window comes to the foreground and the context display updates.     |
| Double-start without a context     | A "already running" notice is shown; the existing window is raised. |
| Invalid / missing `contextId`      | Request is rejected and logged; the app does not crash.             |
| Unknown command/scheme (e.g. typo) | Request is rejected and logged.                                     |

---

## 5. Validation rules

The Receiver validates `contextId` before accepting it:

- Allowed characters: letters `A-Z a-z`, digits `0-9`, dash `-`, underscore `_`.
- Length: 1 to 64 characters.
- Regex: `^[A-Za-z0-9_-]{1,64}$`.
- Leading/trailing whitespace is trimmed before validation.

`info` is optional free text (trimmed; very long values are truncated). If your
ids contain other characters (dots, slashes, spaces), they will be rejected -
adjust your id format or ask us to widen the rule.

---

## 6. Quick test without writing code

A small test sender ships in this repository (`Sender/`, project `Sender.exe`):

1. Build and run the Receiver once (registers `radgent://`).
2. Run `Sender.exe`, enter a `contextId` (and optional `info`).
3. Click **"Senden via URI"** or **"Senden via Argument"**.
4. Watch the Receiver's "Empfangener Kontext" panel update.

You can also test by hand:

- Press `Win+R` and enter `radgent://set-context?contextId=12345`.
- Or run `TextPinMvp.exe --context=12345` from a terminal.

---

## 7. Security notes (please read)

- Triggers are **unauthenticated and locally spoofable**. Any local process - and
  even a crafted link opened in a browser - can invoke
  `radgent://set-context?contextId=...`. Because the action is only "show/switch
  context" (no destructive operation), the risk is limited, but you should not
  treat an incoming context as a trusted/authenticated event.
- Do not put secrets in `contextId` or `info`; they may appear in logs, the URL,
  process arguments, and the UI.
- If you need authenticity (verify *who* sent the context), that requires a
  different channel (e.g. a local HTTP endpoint bound to `127.0.0.1` with a
  shared token). The URI/argument approach cannot be secured. Contact us if this
  is a requirement.

---

## 8. Troubleshooting

| Symptom                                   | Likely cause / fix                                                                 |
|-------------------------------------------|------------------------------------------------------------------------------------|
| `radgent://` does nothing                 | Receiver was never started on this user account -> run it once to register.        |
| "URI ohne contextId" in the log           | Missing/empty `contextId` query parameter.                                         |
| "Nicht unterstuetztes URI-Kommando"       | Host must be exactly `set-context` (e.g. `radgent://set-context?...`).             |
| "ungueltiges contextId-Format"            | `contextId` violates the regex in section 5.                                       |
| Context "not delivered" warning           | A previous Receiver process is hung. End all `TextPinMvp.exe` in Task Manager.     |
| Second window expected but none appears   | By design - only one instance runs; the trigger went to the existing instance.    |

---

## 9. Reference summary

- Executable: `TextPinMvp.exe`
- Command line: `--context=<id>` (aliases: `--contextId`, `--patientId`; optional `--info=<text>`)
- URI: `radgent://set-context?contextId=<id>&info=<text>`
- `contextId` format: `^[A-Za-z0-9_-]{1,64}$`
- Single instance: enforced (mutex); extra launches are delivered to the running instance.
