import streamDeck, { SingletonAction, type KeyDownEvent, type WillAppearEvent, type PropertyInspectorDidAppearEvent } from "@elgato/streamdeck";
import { executeTmuxCommand } from "../executors/cli-executor";
import { executeKeystroke } from "../executors/keystroke-executor";
import { isWindows } from "../platform/platform";
import type { TmuxActionConfig, TmuxActionSettings } from "../types";

export class TmuxAction extends SingletonAction {
  #config: TmuxActionConfig;

  constructor(config: TmuxActionConfig) {
    super();
    this.#config = config;
  }

  override async onWillAppear(ev: WillAppearEvent<TmuxActionSettings>): Promise<void> {
    const settings = ev.payload.settings;
    const updates: Partial<TmuxActionSettings> = {};

    // Auto-select multiplexer based on OS if not explicitly set
    if (!settings.multiplexer) {
      updates.multiplexer = isWindows ? "psmux" : "tmux";
    }

    // Force keystroke mode for interactive actions
    if (this.#config.keystrokeOnly && settings.commandMethod !== "keystroke") {
      updates.commandMethod = "keystroke";
    }

    if (Object.keys(updates).length > 0) {
      await ev.action.setSettings({ ...settings, ...updates });
    }
  }

  override async onPropertyInspectorDidAppear(ev: PropertyInspectorDidAppearEvent<TmuxActionSettings>): Promise<void> {
    if (this.#config.keystrokeOnly) {
      await (ev.action as any).sendToPropertyInspector({ keystrokeOnly: true });
    }
  }

  override async onKeyDown(ev: KeyDownEvent<TmuxActionSettings>): Promise<void> {
    const settings = ev.payload.settings;
    const method = this.#config.keystrokeOnly ? "keystroke" : (settings.commandMethod ?? "cli");

    let result;

    if (method === "cli") {
      const cmd = settings.customCommand ?? this.#config.defaultCliCommand;
      result = await executeTmuxCommand(cmd, settings.tmuxPath, settings.socketPath, settings.targetSession, settings.useWsl, settings.multiplexer);
    } else {
      if (!this.#config.defaultKeystroke) {
        await ev.action.showAlert();
        streamDeck.logger.warn(
          `No keystroke defined for ${this.#config.displayName}. Use CLI mode instead.`
        );
        return;
      }
      const prefix = settings.prefixKey ?? "ctrl+b";
      result = await executeKeystroke(prefix, this.#config.defaultKeystroke);
    }

    if (result.success) {
      await ev.action.showOk();
    } else {
      await ev.action.showAlert();
      streamDeck.logger.error(`${this.#config.displayName}: ${result.error}`);
    }
  }
}
