import streamDeck, { SingletonAction, type KeyDownEvent } from "@elgato/streamdeck";
import { executeTmuxCommand } from "../executors/cli-executor";
import { executeKeystroke } from "../executors/keystroke-executor";
import type { TmuxActionConfig, TmuxActionSettings } from "../types";

export class TmuxAction extends SingletonAction {
  #config: TmuxActionConfig;

  constructor(config: TmuxActionConfig) {
    super();
    this.#config = config;
  }

  override async onKeyDown(ev: KeyDownEvent<TmuxActionSettings>): Promise<void> {
    const settings = ev.payload.settings;
    const method = settings.commandMethod ?? "cli";

    let result;

    if (method === "cli") {
      const cmd = settings.customCommand ?? this.#config.defaultCliCommand;
      result = await executeTmuxCommand(cmd, settings.tmuxPath, settings.socketPath, settings.targetSession, settings.useWsl);
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
