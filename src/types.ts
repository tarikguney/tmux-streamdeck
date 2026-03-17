export type TmuxActionSettings = {
  multiplexer?: "tmux" | "psmux";
  commandMethod?: "cli" | "keystroke";
  customCommand?: string;
  prefixKey?: string;
  tmuxPath?: string;
  socketPath?: string;
  targetSession?: string;
  useWsl?: boolean;
  keystrokeOnly?: boolean;
  [key: string]: string | boolean | undefined;
};

export interface TmuxActionConfig {
  uuid: string;
  defaultCliCommand: string;
  defaultKeystroke: string;
  category: "window" | "pane" | "session" | "misc";
  displayName: string;
  keystrokeOnly?: boolean;
}

export interface CommandResult {
  success: boolean;
  error?: string;
}

export interface ICommandExecutor {
  execute(...args: string[]): Promise<CommandResult>;
}
