#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const command = process.argv[2];

if (command !== "init") {
  console.log("Usage: npx @virastack/ai-rules init");
  process.exit(1);
}

let createdCount = 0;
let skippedCount = 0;

async function copyDir(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  await fs.mkdir(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
      continue;
    }

    try {
      await fs.access(destPath);
      skippedCount++;
    } catch {
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(srcPath, destPath);
      createdCount++;
    }
  }
}

async function main() {
  const templateDir = path.resolve(__dirname, "../templates");
  const targetDir = process.cwd();

  try {
    await fs.access(templateDir);
    await copyDir(templateDir, targetDir);

    console.log(`\n${createdCount} created • ${skippedCount} skipped`);
    console.log("✅ ViraStack AI Rules is ready. Try: Ask AI to plan a new feature.");
  } catch (err) {
    console.error("CLI setup failed:", err.message);
    process.exit(1);
  }
}

main();
