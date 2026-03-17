import sharp from "sharp";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

const PLUGIN_DIR = "com.tarikguney.tmux.sdPlugin/imgs";

async function convertSvg(svgPath, outputPath, size) {
  const svgBuffer = await readFile(svgPath);
  await sharp(svgBuffer, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(outputPath);
  console.log(`  ${outputPath} (${size}x${size})`);
}

async function main() {
  // 1. Plugin icon: 256x256 + 512x512 @2x
  console.log("Plugin icons:");
  await convertSvg(
    join(PLUGIN_DIR, "plugin/tmux-plugin.svg"),
    join(PLUGIN_DIR, "plugin/tmux-plugin.png"),
    256
  );
  await convertSvg(
    join(PLUGIN_DIR, "plugin/tmux-plugin.svg"),
    join(PLUGIN_DIR, "plugin/tmux-plugin@2x.png"),
    512
  );

  // 2. Category icon: 28x28 + 56x56 @2x
  console.log("Category icons:");
  await convertSvg(
    join(PLUGIN_DIR, "plugin/tmux-category.svg"),
    join(PLUGIN_DIR, "plugin/tmux-category.png"),
    28
  );
  await convertSvg(
    join(PLUGIN_DIR, "plugin/tmux-category.svg"),
    join(PLUGIN_DIR, "plugin/tmux-category@2x.png"),
    56
  );

  // 3. Action icons: 20x20 + 40x40 @2x
  console.log("Action icons:");
  const actionsDir = join(PLUGIN_DIR, "actions");
  const actionFiles = (await readdir(actionsDir)).filter((f) =>
    f.endsWith(".svg")
  );
  for (const svg of actionFiles) {
    const name = svg.replace(".svg", "");
    await convertSvg(
      join(actionsDir, svg),
      join(actionsDir, `${name}.png`),
      20
    );
    await convertSvg(
      join(actionsDir, svg),
      join(actionsDir, `${name}@2x.png`),
      40
    );
  }

  // 4. State/key images: 72x72 + 144x144 @2x
  console.log("State icons:");
  const statesDir = join(PLUGIN_DIR, "states");
  const stateFiles = (await readdir(statesDir)).filter((f) =>
    f.endsWith(".svg")
  );
  for (const svg of stateFiles) {
    const name = svg.replace(".svg", "");
    await convertSvg(
      join(statesDir, svg),
      join(statesDir, `${name}.png`),
      72
    );
    await convertSvg(
      join(statesDir, svg),
      join(statesDir, `${name}@2x.png`),
      144
    );
  }

  console.log("\nDone! All PNGs generated.");
}

main().catch(console.error);
