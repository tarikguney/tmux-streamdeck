export type TmuxActionSettings = {
  commandMethod?: "cli" | "keystroke";
  customCommand?: string;
  prefixKey?: string;
  tmuxPath?: string;
  useWsl?: boolean;
  [key: string]: string | boolean | undefined;
};

export interface TmuxActionConfig {
  uuid: string;
  defaultCliCommand: string;
  defaultKeystroke: string;
  category: "window" | "pane" | "session" | "misc";
  displayName: string;
}

export interface CommandResult {
  success: boolean;
  error?: string;
}

export interface ICommandExecutor {
  execute(...args: string[]): Promise<CommandResult>;
}
