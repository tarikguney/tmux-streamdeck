import { isMacOS, isWindows } from "../platform/platform";
import { sendKeystrokeMacOS } from "../platform/macos-keys";
import { sendKeystrokeWindows } from "../platform/windows-keys";
import type { CommandResult } from "../types";

export async function executeKeystroke(
  prefixKey: string,
  keystroke: string
): Promise<CommandResult> {
  if (isMacOS) {
    return sendKeystrokeMacOS(prefixKey, keystroke);
  }
  if (isWindows) {
    return sendKeystrokeWindows(prefixKey, keystroke);
  }
  return { success: false, error: "Unsupported platform for keystroke simulation" };
}
