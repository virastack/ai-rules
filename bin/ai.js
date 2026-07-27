#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

const isTr = args.includes("--tr");
const force = args.includes("--force") || args.includes("-f");

let specifiedFramework = null;
const frameworkIndex = args.indexOf("--framework");
if (frameworkIndex !== -1 && args[frameworkIndex + 1]) {
  specifiedFramework = args[frameworkIndex + 1];
}

const t = {
  usage: isTr
    ? "Kullanım: npx @virastack/ai init [--force] [--tr] [--framework nextjs|tanstack]"
    : "Usage: npx @virastack/ai init [--force] [--tr] [--framework nextjs|tanstack]",
  overwrite: isTr
    ? "Bazı dosyalar zaten var. Tümünün üzerine yazılsın mı? [y/N] "
    : "Some files already exist. Overwrite all? [y/N] ",
  summary: (c, u, s) =>
    isTr
      ? `\n${c} oluşturuldu • ${u} güncellendi • ${s} atlandı`
      : `\n${c} created • ${u} updated • ${s} skipped`,
  success: isTr
    ? "✅ ViraStack AI kuralları hazır.\n💡 İpucu: Yapay zekadan yeni bir özellik planlamasını isteyin."
    : "✅ ViraStack AI rules are ready.\n💡 Tip: Ask AI to plan a new feature.",
  skippedAll: isTr
    ? "ℹ️ Mevcut kurallar korundu. Projenizde herhangi bir değişiklik yapılmadı."
    : "ℹ️ Existing rules preserved. No changes were made to your project.",
  failed: isTr ? "Kurulum başarısız oldu:" : "CLI setup failed:",
  detecting: isTr ? "Framework tespit ediliyor..." : "Detecting framework...",
  detected: (fw) =>
    isTr ? `${fw} tespit edildi.` : `Detected ${fw}.`,
  unknown: isTr
    ? "Framework tespit edilemedi. Lütfen --framework bayrağını kullanın."
    : "Could not detect framework. Please use the --framework flag.",
};

if (args[0] !== "init") {
  console.log(t.usage);
  process.exit(1);
}

let createdCount = 0;
let updatedCount = 0;
let skippedCount = 0;
let overwriteAll = false;
let hasAskedOverwrite = false;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function copyDir(src, dest, framework) {
  try {
    const entries = await fs.readdir(src, { withFileTypes: true });
    await fs.mkdir(dest, { recursive: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath, framework);
        continue;
      }

      let fileContent = null;
      if (entry.name === "AGENTS.md") {
        fileContent = await fs.readFile(srcPath, "utf-8");
        fileContent = fileContent.replace(/\{FRAMEWORK_NAME\}/g, framework === "nextjs" ? "Next.js 16" : "TanStack Start");
        fileContent = fileContent.replace(/\{FRAMEWORK_RULE_FILE\}/g, framework === "nextjs" ? "nextjs.mdc" : "tanstack-start.mdc");

        if (framework === "nextjs") {
          const nextjsBlock = `<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in \`dist/docs/\` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

`;
          fileContent = nextjsBlock + fileContent;
        }
      }

      try {
        await fs.access(destPath);
        // File exists
        if (force || overwriteAll) {
          if (fileContent !== null) {
            await fs.writeFile(destPath, fileContent);
          } else {
            await fs.copyFile(srcPath, destPath);
          }
          updatedCount++;
        } else if (!process.stdout.isTTY) {
          // Skip if not in an interactive terminal and no --force flag
          skippedCount++;
        } else {
          if (!hasAskedOverwrite) {
            hasAskedOverwrite = true;
            const answer = await askQuestion(t.overwrite);
            const normalized = answer.trim().toLowerCase();

            if (normalized === "y") {
              overwriteAll = true;
              if (fileContent !== null) {
                await fs.writeFile(destPath, fileContent);
              } else {
                await fs.copyFile(srcPath, destPath);
              }
              updatedCount++;
            } else {
              skippedCount++;
            }
          } else {
            // If we already asked and they said no, skip remaining files
            skippedCount++;
          }
        }
      } catch {
        // File does not exist
        await fs.mkdir(path.dirname(destPath), { recursive: true });
        if (fileContent !== null) {
          await fs.writeFile(destPath, fileContent);
        } else {
          await fs.copyFile(srcPath, destPath);
        }
        createdCount++;
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
}

async function detectFramework(targetDir) {
  try {
    const pkgPath = path.join(targetDir, "package.json");
    const pkgContent = await fs.readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(pkgContent);
    
    if (pkg.virastack && pkg.virastack.template) {
      return pkg.virastack.template;
    }

    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    if (deps["next"]) return "nextjs";
    if (deps["@tanstack/react-router"] || deps["@tanstack/start"] || deps["@tanstack/react-start"])
      return "tanstack";
  } catch {
    // Ignore errors (no package.json or invalid JSON)
  }
  return "unknown";
}

async function main() {
  const templatesDir = path.resolve(__dirname, "../templates");
  const targetDir = process.cwd();

  try {
    let framework = specifiedFramework;
    
    if (!framework) {
      console.log(t.detecting);
      framework = await detectFramework(targetDir);
      if (framework !== "unknown") {
        console.log(t.detected(framework));
      }
    }

    if (framework !== "nextjs" && framework !== "tanstack") {
      console.error(t.unknown);
      process.exitCode = 1;
      return;
    }

    // 1. Copy core templates
    const coreDir = path.join(templatesDir, "core");
    await copyDir(coreDir, targetDir, framework);

    // 2. Copy framework specific templates
    const frameworkDir = path.join(templatesDir, framework);
    await copyDir(frameworkDir, targetDir, framework);

    console.log(t.summary(createdCount, updatedCount, skippedCount));
    if (createdCount === 0 && updatedCount === 0) {
      console.log(t.skippedAll);
    } else {
      console.log(t.success);
    }
  } catch (err) {
    console.error(t.failed, err.message);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();
