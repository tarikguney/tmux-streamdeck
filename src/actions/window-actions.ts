import { action } from "@elgato/streamdeck";
import { TmuxAction } from "./tmux-action";

@action({ UUID: "com.tarikguney.tmux.new-window" })
export class NewWindowAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.new-window",
      defaultCliCommand: "new-window",
      defaultKeystroke: "c",
      category: "window",
      displayName: "New Window",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.close-window" })
export class CloseWindowAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.close-window",
      defaultCliCommand: "kill-window",
      defaultKeystroke: "&",
      category: "window",
      displayName: "Close Window",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.next-window" })
export class NextWindowAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.next-window",
      defaultCliCommand: "next-window",
      defaultKeystroke: "n",
      category: "window",
      displayName: "Next Window",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.prev-window" })
export class PrevWindowAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.prev-window",
      defaultCliCommand: "previous-window",
      defaultKeystroke: "p",
      category: "window",
      displayName: "Previous Window",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.rename-window" })
export class RenameWindowAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.rename-window",
      defaultCliCommand: "rename-window",
      defaultKeystroke: ",",
      category: "window",
      displayName: "Rename Window",
      keystrokeOnly: true,
    });
  }
}
