# Stream Deck tmux Plugin — Dev Machine Setup & Testing Instructions

You are helping test and iterate on a Stream Deck plugin for tmux shortcuts. The plugin is already built and pushed to GitHub. Your job is to get it running on this dev machine where the Stream Deck hardware is connected.

## Project Context

- **Repo**: https://github.com/tarikguney/tmux-streamdeck
- **SDK**: Elgato Stream Deck SDK v2 (Node.js 20 / TypeScript)
- **Build tool**: Rollup
- **Plugin UUID**: `com.tarikguney.tmux`
- **Plugin directory**: `com.tarikguney.tmux.sdPlugin/`

## Step 1: Clone and Build

```bash
git clone https://github.com/tarikguney/tmux-streamdeck.git
cd tmux-streamdeck
npm install
npm run build
```

Verify `com.tarikguney.tmux.sdPlugin/bin/plugin.js` exists after build.

## Step 2: Link Plugin to Stream Deck

```bash
npx @elgato/cli link com.tarikguney.tmux.sdPlugin
```

This symlinks the plugin into the Stream Deck app's plugin directory. The Stream Deck app must be running. After linking, restart the Stream Deck app or run:

```bash
npx @elgato/cli restart com.tarikguney.tmux
```

## Step 3: Verify in Stream Deck App

1. Open the Stream Deck app
2. Look for the **"tmux Shortcuts"** category in the action list on the right
3. Drag any action (e.g., "New Window") onto a key
4. Click the key's gear icon to open the Property Inspector
5. Ensure "CLI Command" is selected as the command method

## Step 4: Test Actions

### Prerequisites
- tmux must be installed and accessible from the terminal
- Start a tmux session: `tmux new -s test`

### CLI Mode Testing (default)
Press the Stream Deck button — it should execute the tmux command. Verify with:
```bash
tmux list-windows
tmux list-panes
tmux list-sessions
```

A green checkmark flash = success. A yellow warning triangle = command failed (check logs).

### Keystroke Mode Testing
1. Open Property Inspector for an action
2. Change "Command Method" to "Keystroke Simulation"
3. Make sure your terminal with tmux is focused/frontmost
4. Press the Stream Deck button

**macOS**: Uses AppleScript (`osascript`) — may prompt for Accessibility permissions in System Settings > Privacy & Security > Accessibility. Grant permission to the Stream Deck app.

**Windows**: Uses PowerShell `SendKeys` — terminal must be the foreground window.

### WSL Mode (Windows only)
If tmux runs under WSL:
1. Open Property Inspector
2. Check "Use WSL (Windows)"
3. CLI commands will be prefixed with `wsl tmux ...`

## Step 5: View Logs

Plugin logs are in:
- **macOS**: `~/Library/Logs/ElgatoStreamDeck/com.tarikguney.tmux`
- **Windows**: `%APPDATA%\Elgato\StreamDeck\logs\com.tarikguney.tmux`

Or enable debug mode in `manifest.json` (already enabled):
```json
"Nodejs": { "Version": "20", "Debug": "enabled" }
```

Then attach a debugger to the Node.js process.

## Step 6: Development Workflow

For iterative changes:

```bash
npm run watch
```

This rebuilds on file changes. After each rebuild, restart the plugin:

```bash
npx @elgato/cli restart com.tarikguney.tmux
```

## Architecture Quick Reference

| File | Purpose |
|---|---|
| `src/actions/tmux-action.ts` | Base class — all `onKeyDown` logic |
| `src/actions/window-actions.ts` | 5 window actions (new, close, next, prev, rename) |
| `src/actions/pane-actions.ts` | 8 pane actions (split, close, navigate, zoom) |
| `src/actions/session-actions.ts` | 5 session actions (new, detach, switch, rename, kill) |
| `src/actions/misc-actions.ts` | 3 misc actions (copy mode, command prompt, reload config) |
| `src/executors/cli-executor.ts` | Runs `tmux <cmd>` via `child_process` |
| `src/executors/keystroke-executor.ts` | Dispatches to macOS or Windows keystroke sender |
| `src/platform/macos-keys.ts` | AppleScript keystroke simulation |
| `src/platform/windows-keys.ts` | PowerShell SendKeys simulation |
| `com.tarikguney.tmux.sdPlugin/manifest.json` | Plugin manifest (all 21 actions defined here) |
| `com.tarikguney.tmux.sdPlugin/ui/tmux-action.html` | Shared Property Inspector UI |

## Known Issues / Things to Watch For

1. **macOS Accessibility permissions**: Keystroke mode won't work until Stream Deck is granted Accessibility access
2. **Placeholder PNG icons**: The plugin-level icons (`imgs/plugin/*.png`) are solid dark placeholders — replace with proper tmux-branded artwork
3. **tmux not in PATH**: If tmux is installed via Homebrew or a non-standard location, set the "tmux Path" in the Property Inspector (e.g., `/opt/homebrew/bin/tmux`)
4. **No active tmux session**: CLI commands will fail with an error if no session is running — the button will flash a warning triangle

## Packaging for Distribution

When ready to distribute:

```bash
npx @elgato/cli pack com.tarikguney.tmux.sdPlugin
```

This creates a `.streamDeckPlugin` file that can be double-clicked to install.
