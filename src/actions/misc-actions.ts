import { action } from "@elgato/streamdeck";
import { TmuxAction } from "./tmux-action";

@action({ UUID: "com.abguney.tmux.copy-mode" })
export class CopyModeAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.abguney.tmux.copy-mode",
      defaultCliCommand: "copy-mode",
      defaultKeystroke: "[",
      category: "misc",
      displayName: "Copy Mode",
    });
  }
}

@action({ UUID: "com.abguney.tmux.command-prompt" })
export class CommandPromptAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.abguney.tmux.command-prompt",
      defaultCliCommand: "command-prompt",
      defaultKeystroke: ":",
      category: "misc",
      displayName: "Command Prompt",
    });
  }
}

@action({ UUID: "com.abguney.tmux.reload-config" })
export class ReloadConfigAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.abguney.tmux.reload-config",
      defaultCliCommand: "source-file ~/.tmux.conf",
      defaultKeystroke: "",
      category: "misc",
      displayName: "Reload Config",
    });
  }
}
