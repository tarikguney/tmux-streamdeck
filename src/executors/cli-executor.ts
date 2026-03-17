import { execFile } from "child_process";
import { promisify } from "util";
import { homedir } from "os";
import { join } from "path";
import { existsSync, readFileSync } from "fs";
import { isWindows } from "../platform/platform";
import type { CommandResult } from "../types";

const execFileAsync = promisify(execFile);

function resolveTargetSession(targetSession?: string): string | undefined {
  if (targetSession) return targetSession;

  // Auto-detect psmux last session from ~/.psmux/last_session
  const lastSessionFile = join(homedir(), ".psmux", "last_session");
  if (existsSync(lastSessionFile)) {
    try {
      const session = readFileSync(lastSessionFile, "utf-8").trim();
      if (session) return session;
    } catch {
      // ignore read errors
    }
  }

  return undefined;
}

export async function executeTmuxCommand(
  command: string,
  tmuxPath?: string,
  socketPath?: string,
  targetSession?: string,
  useWsl?: boolean
): Promise<CommandResult> {
  const tmux = tmuxPath ?? "tmux";
  const commandArgs = command.split(/\s+/);
  const session = resolveTargetSession(targetSession);

  const socketArgs = socketPath ? ["-S", socketPath] : [];
  const sessionArgs = session ? ["-t", session] : [];

  let cmd: string;
  let cmdArgs: string[];

  if (isWindows && useWsl) {
    cmd = "wsl";
    cmdArgs = [tmux, ...socketArgs, ...sessionArgs, ...commandArgs];
  } else {
    cmd = tmux;
    cmdArgs = [...socketArgs, ...sessionArgs, ...commandArgs];
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
  socketPath?: string,
  useWsl?: boolean
): Promise<boolean> {
  const tmux = tmuxPath ?? "tmux";
  const socketArgs = socketPath ? ["-S", socketPath] : [];

  let cmd: string;
  let args: string[];

  if (isWindows && useWsl) {
    cmd = "wsl";
    args = [tmux, ...socketArgs, "-V"];
  } else {
    cmd = tmux;
    args = [...socketArgs, "-V"];
  }

  try {
    await execFileAsync(cmd, args, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}
