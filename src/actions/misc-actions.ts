import { action } from "@elgato/streamdeck";
import { TmuxAction } from "./tmux-action";

@action({ UUID: "com.tarikguney.tmux.copy-mode" })
export class CopyModeAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.copy-mode",
      defaultCliCommand: "copy-mode",
      defaultKeystroke: "[",
      category: "misc",
      displayName: "Copy Mode",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.command-prompt" })
export class CommandPromptAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.command-prompt",
      defaultCliCommand: "command-prompt",
      defaultKeystroke: ":",
      category: "misc",
      displayName: "Command Prompt",
      keystrokeOnly: true,
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.reload-config" })
export class ReloadConfigAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.reload-config",
      defaultCliCommand: "source-file ~/.tmux.conf",
      defaultKeystroke: "",
      category: "misc",
      displayName: "Reload Config",
    });
  }
}
