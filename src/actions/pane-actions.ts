import { action } from "@elgato/streamdeck";
import { TmuxAction } from "./tmux-action";

@action({ UUID: "com.tarikguney.tmux.split-h" })
export class SplitHorizontalAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.split-h",
      defaultCliCommand: "split-window -h",
      defaultKeystroke: "%",
      category: "pane",
      displayName: "Split Horizontal",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.split-v" })
export class SplitVerticalAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.split-v",
      defaultCliCommand: "split-window -v",
      defaultKeystroke: '"',
      category: "pane",
      displayName: "Split Vertical",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.close-pane" })
export class ClosePaneAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.close-pane",
      defaultCliCommand: "kill-pane",
      defaultKeystroke: "x",
      category: "pane",
      displayName: "Close Pane",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.pane-up" })
export class PaneUpAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.pane-up",
      defaultCliCommand: "select-pane -U",
      defaultKeystroke: "Up",
      category: "pane",
      displayName: "Pane Up",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.pane-down" })
export class PaneDownAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.pane-down",
      defaultCliCommand: "select-pane -D",
      defaultKeystroke: "Down",
      category: "pane",
      displayName: "Pane Down",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.pane-left" })
export class PaneLeftAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.pane-left",
      defaultCliCommand: "select-pane -L",
      defaultKeystroke: "Left",
      category: "pane",
      displayName: "Pane Left",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.pane-right" })
export class PaneRightAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.pane-right",
      defaultCliCommand: "select-pane -R",
      defaultKeystroke: "Right",
      category: "pane",
      displayName: "Pane Right",
    });
  }
}

@action({ UUID: "com.tarikguney.tmux.toggle-zoom" })
export class ToggleZoomAction extends TmuxAction {
  constructor() {
    super({
      uuid: "com.tarikguney.tmux.toggle-zoom",
      defaultCliCommand: "resize-pane -Z",
      defaultKeystroke: "z",
      category: "pane",
      displayName: "Toggle Zoom",
    });
  }
}
