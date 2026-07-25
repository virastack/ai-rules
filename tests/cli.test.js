import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execSync } from "child_process";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, "../bin/ai.js");
const TEMP_DIR = path.resolve(__dirname, "temp-test-dir");

describe("@virastack/ai CLI", () => {
  beforeAll(async () => {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  });

  afterAll(async () => {
    await fs.rm(TEMP_DIR, { recursive: true, force: true });
  });

  const runCli = (args = []) => {
    return execSync(`node ${CLI_PATH} init ${args.join(" ")}`, {
      cwd: TEMP_DIR,
      encoding: "utf-8",
      stdio: "pipe",
    });
  };

  it("fails if unknown framework and no --framework flag is provided", async () => {
    // Write an empty package.json
    await fs.writeFile(path.join(TEMP_DIR, "package.json"), JSON.stringify({}));
    
    let error;
    try {
      runCli();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.stderr || error.stdout).toMatch(/Could not detect framework/);
  });

  it("detects nextjs from package.json", async () => {
    await fs.writeFile(path.join(TEMP_DIR, "package.json"), JSON.stringify({
      dependencies: { "next": "14.0.0" }
    }));
    
    const output = runCli(["--force"]);
    expect(output).toMatch(/Detected nextjs/);
    
    // Check if core files are copied
    const coreRule = await fs.stat(path.join(TEMP_DIR, ".cursor/rules/core-principles.mdc"));
    expect(coreRule.isFile()).toBe(true);

    // Check if nextjs specific files are copied
    const nextRule = await fs.stat(path.join(TEMP_DIR, ".cursor/rules/nextjs.mdc"));
    expect(nextRule.isFile()).toBe(true);
  });

  it("respects --framework tanstack override", async () => {
    // Ensure we start fresh
    await fs.rm(path.join(TEMP_DIR, ".cursor"), { recursive: true, force: true });

    // Despite nextjs in package.json, flag should override
    const output = runCli(["--force", "--framework", "tanstack"]);
    
    const tanstackRule = await fs.stat(path.join(TEMP_DIR, ".cursor/rules/tanstack-start.mdc"));
    expect(tanstackRule.isFile()).toBe(true);

    // Should not copy nextjs rules
    let hasNextRule = false;
    try {
      await fs.stat(path.join(TEMP_DIR, ".cursor/rules/nextjs.mdc"));
      hasNextRule = true;
    } catch (e) {}
    
    expect(hasNextRule).toBe(false);
  });
});
