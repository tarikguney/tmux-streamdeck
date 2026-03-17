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

function detectMultiplexer(): "tmux" | "psmux" {
  const psmuxDir = join(homedir(), ".psmux");
  return existsSync(psmuxDir) ? "psmux" : "tmux";
}

export async function executeTmuxCommand(
  command: string,
  tmuxPath?: string,
  socketPath?: string,
  targetSession?: string,
  useWsl?: boolean,
  multiplexer?: "tmux" | "psmux"
): Promise<CommandResult> {
  const mux = multiplexer ?? detectMultiplexer();
  const tmux = tmuxPath ?? (mux === "psmux" ? "psmux" : "tmux");
  const commandArgs = command.split(/\s+/);

  const socketArgs = socketPath ? ["-S", socketPath] : [];

  // psmux requires -t <session> when TMUX env var is not set
  const sessionArgs =
    mux === "psmux" ? (() => {
      const session = resolveTargetSession(targetSession);
      return session ? ["-t", session] : [];
    })() : [];

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
    return { success: false, error: `${mux} command failed: ${message}` };
  }
}

export async function checkTmuxAvailable(
  tmuxPath?: string,
  socketPath?: string,
  useWsl?: boolean,
  multiplexer?: "tmux" | "psmux"
): Promise<boolean> {
  const mux = multiplexer ?? detectMultiplexer();
  const tmux = tmuxPath ?? (mux === "psmux" ? "psmux" : "tmux");
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
