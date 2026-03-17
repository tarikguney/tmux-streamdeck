import { action } from "@elgato/streamdeck";
import { TmuxAction } from "./tmux-action";

@action({ UUID: "com.tarikguney.tmux.new-session" })
export class NewSessionAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.new-session",
      defaultCliCommand: "new-session -d",
      defaultKeystroke: "",
      category: "session",
      displayName: "New Session",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.detach" })
export class DetachAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.detach",
      defaultCliCommand: "detach-client",
      defaultKeystroke: "d",
      category: "session",
      displayName: "Detach",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.switch-session" })
export class SwitchSessionAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.switch-session",
      defaultCliCommand: "choose-session",
      defaultKeystroke: "s",
      category: "session",
      displayName: "Switch Session",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.rename-session" })
export class RenameSessionAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.rename-session",
      defaultCliCommand: "rename-session",
      defaultKeystroke: "$",
      category: "session",
      displayName: "Rename Session",
      keystrokeOnly: true,
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.kill-session" })
export class KillSessionAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.kill-session",
      defaultCliCommand: "kill-session",
      defaultKeystroke: "",
      category: "session",
      displayName: "Kill Session",
    });
  }
}
