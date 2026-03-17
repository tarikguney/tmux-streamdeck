import streamDeck from "@elgato/streamdeck";

// Window actions
import { NewWindowAction } from "./actions/window-actions";
import { CloseWindowAction } from "./actions/window-actions";
import { NextWindowAction } from "./actions/window-actions";
import { PrevWindowAction } from "./actions/window-actions";
import { RenameWindowAction } from "./actions/window-actions";

// Pane actions
import { SplitHorizontalAction } from "./actions/pane-actions";
import { SplitVerticalAction } from "./actions/pane-actions";
import { ClosePaneAction } from "./actions/pane-actions";
import { PaneUpAction } from "./actions/pane-actions";
import { PaneDownAction } from "./actions/pane-actions";
import { PaneLeftAction } from "./actions/pane-actions";
import { PaneRightAction } from "./actions/pane-actions";
import { ToggleZoomAction } from "./actions/pane-actions";

// Session actions
import { NewSessionAction } from "./actions/session-actions";
import { DetachAction } from "./actions/session-actions";
import { SwitchSessionAction } from "./actions/session-actions";
import { RenameSessionAction } from "./actions/session-actions";
import { KillSessionAction } from "./actions/session-actions";

// Misc actions
import { CopyModeAction } from "./actions/misc-actions";
import { CommandPromptAction } from "./actions/misc-actions";
import { ReloadConfigAction } from "./actions/misc-actions";

// Register all actions
streamDeck.actions.registerAction(new NewWindowAction());
streamDeck.actions.registerAction(new CloseWindowAction());
streamDeck.actions.registerAction(new NextWindowAction());
streamDeck.actions.registerAction(new PrevWindowAction());
streamDeck.actions.registerAction(new RenameWindowAction());

streamDeck.actions.registerAction(new SplitHorizontalAction());
streamDeck.actions.registerAction(new SplitVerticalAction());
streamDeck.actions.registerAction(new ClosePaneAction());
streamDeck.actions.registerAction(new PaneUpAction());
streamDeck.actions.registerAction(new PaneDownAction());
streamDeck.actions.registerAction(new PaneLeftAction());
streamDeck.actions.registerAction(new PaneRightAction());
streamDeck.actions.registerAction(new ToggleZoomAction());

streamDeck.actions.registerAction(new NewSessionAction());
streamDeck.actions.registerAction(new DetachAction());
streamDeck.actions.registerAction(new SwitchSessionAction());
streamDeck.actions.registerAction(new RenameSessionAction());
streamDeck.actions.registerAction(new KillSessionAction());

streamDeck.actions.registerAction(new CopyModeAction());
streamDeck.actions.registerAction(new CommandPromptAction());
streamDeck.actions.registerAction(new ReloadConfigAction());

streamDeck.connect();
