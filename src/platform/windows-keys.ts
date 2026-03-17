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
  if (keystroke.length === 1 && SPECIAL_KEYS[keystroke]) {
    return SPECIAL_KEYS[keystroke];
  }
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

  const psScript = `
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.SendKeys]::SendWait("${prefix}")
Start-Sleep -Milliseconds 50
[System.Windows.Forms.SendKeys]::SendWait("${key}")
`.trim();

  try {
    await execFileAsync(
      "powershell",
      ["-NoProfile", "-NonInteractive", "-Command", psScript],
      { timeout: 5000 }
    );
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: `Windows keystroke failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
