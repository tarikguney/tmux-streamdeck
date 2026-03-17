import { execFile } from "child_process";
import { promisify } from "util";
import { isWindows } from "../platform/platform";
import type { CommandResult } from "../types";

const execFileAsync = promisify(execFile);

export async function executeTmuxCommand(
  command: string,
  tmuxPath?: string,
  useWsl?: boolean
): Promise<CommandResult> {
  const tmux = tmuxPath ?? "tmux";
  const args = command.split(/\s+/);

  let cmd: string;
  let cmdArgs: string[];

  if (isWindows && useWsl) {
    cmd = "wsl";
    cmdArgs = [tmux, ...args];
  } else {
    cmd = tmux;
    cmdArgs = args;
  }

  try {
    await execFileAsync(cmd, cmdArgs, { timeout: 5000 });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: `tmux command failed: ${message}` };
  }
}

export async function checkTmuxAvailable(
  tmuxPath?: string,
  useWsl?: boolean
): Promise<boolean> {
  const tmux = tmuxPath ?? "tmux";
  let cmd: string;
  let args: string[];

  if (isWindows && useWsl) {
    cmd = "wsl";
    args = [tmux, "-V"];
  } else {
    cmd = tmux;
    args = ["-V"];
  }

  try {
    await execFileAsync(cmd, args, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}
