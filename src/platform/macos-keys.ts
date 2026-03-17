import { execFile } from "child_process";
import { promisify } from "util";
import type { CommandResult } from "../types";

const execFileAsync = promisify(execFile);

const MODIFIER_MAP: Record<string, string> = {
  ctrl: "control down",
  alt: "option down",
  shift: "shift down",
  cmd: "command down",
  command: "command down",
};

function buildAppleScript(prefixKey: string, keystroke: string): string {
  const parts = prefixKey.toLowerCase().split("+").map((s) => s.trim());
  const key = parts.pop()!;
  const modifiers = parts.map((m) => MODIFIER_MAP[m] ?? m).join(", ");

  const lines = [`tell application "System Events"`];

  if (modifiers) {
    lines.push(`  keystroke "${key}" using {${modifiers}}`);
  } else {
    lines.push(`  keystroke "${key}"`);
  }

  lines.push(`  delay 0.05`);

  if (keystroke.length === 1) {
    lines.push(`  keystroke "${keystroke}"`);
  } else {
    const keyCodeMap: Record<string, number> = {
      Up: 126,
      Down: 125,
      Left: 123,
      Right: 124,
      Return: 36,
      Escape: 53,
    };
    const code = keyCodeMap[keystroke];
    if (code !== undefined) {
      lines.push(`  key code ${code}`);
    } else {
      lines.push(`  keystroke "${keystroke}"`);
    }
  }

  lines.push(`end tell`);
  return lines.join("\n");
}

export async function sendKeystrokeMacOS(
  prefixKey: string,
  keystroke: string
): Promise<CommandResult> {
  const script = buildAppleScript(prefixKey, keystroke);
  try {
    await execFileAsync("osascript", ["-e", script], { timeout: 5000 });
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: `macOS keystroke failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
