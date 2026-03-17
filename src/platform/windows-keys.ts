import { execFile } from "child_process";
import { promisify } from "util";
import type { CommandResult } from "../types";

const execFileAsync = promisify(execFile);

const SENDKEYS_MAP: Record<string, string> = {
  ctrl: "^",
  alt: "%",
  shift: "+",
};

const SPECIAL_KEYS: Record<string, string> = {
  Up: "{UP}",
  Down: "{DOWN}",
  Left: "{LEFT}",
  Right: "{RIGHT}",
  Return: "{ENTER}",
  Escape: "{ESC}",
  "%": "{%}",
  "+": "{+}",
  "^": "{^}",
  "~": "{~}",
  "(": "{(}",
  ")": "{)}",
  "{": "{{}",
  "}": "{}}",
  "[": "{[}",
  "]": "{]}",
};

function toSendKeysNotation(prefixKey: string): string {
  const parts = prefixKey.toLowerCase().split("+").map((s) => s.trim());
  const key = parts.pop()!;
  const modifiers = parts.map((m) => SENDKEYS_MAP[m] ?? "").join("");
  return `${modifiers}${key}`;
}

function escapeKeystroke(keystroke: string): string {
  if (SPECIAL_KEYS[keystroke]) {
    return SPECIAL_KEYS[keystroke];
  }
  return keystroke;
}

export async function sendKeystrokeWindows(
  prefixKey: string,
  keystroke: string
): Promise<CommandResult> {
  const prefix = toSendKeysNotation(prefixKey);
  const key = escapeKeystroke(keystroke);

  // Strategy: capture the current foreground window handle immediately,
  // then re-focus it before sending keys. This ensures keystrokes go to
  // whatever window was active when the Stream Deck button was pressed,
  // even if PowerShell briefly steals focus during startup.
  const psScript = `
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class Win32 {
    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
}
'@

Add-Type -AssemblyName System.Windows.Forms

$target = [Win32]::GetForegroundWindow()
if ($target -eq [IntPtr]::Zero) {
    Write-Error "No foreground window found"
    exit 1
}
[Win32]::SetForegroundWindow($target) | Out-Null
Start-Sleep -Milliseconds 50
[System.Windows.Forms.SendKeys]::SendWait("${prefix}")
Start-Sleep -Milliseconds 100
[System.Windows.Forms.SendKeys]::SendWait("${key}")
`.trim();

  try {
    await execFileAsync(
      "powershell",
      ["-NoProfile", "-NonInteractive", "-WindowStyle", "Hidden", "-Command", psScript],
      { timeout: 10000, windowsHide: true }
    );
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: `Windows keystroke failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
