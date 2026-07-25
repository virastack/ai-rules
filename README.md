# ViraStack AI

<div align="left">
  <a href="https://www.npmjs.com/package/@virastack/ai">
    <img src="https://img.shields.io/npm/v/@virastack/ai" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@virastack/ai">
    <img src="https://img.shields.io/npm/dt/@virastack/ai" alt="npm downloads" />
  </a>
  <a href="https://bundlephobia.com/package/@virastack/ai">
    <img src="https://img.shields.io/bundlephobia/minzip/@virastack/ai" alt="bundle size" />
  </a>
</div>

<br />

AI-native architecture kit for modern React. Transforms your LLM (Cursor, Claude Code, Windsurf) into a highly disciplined, specialized Senior Frontend Architect.

Coding agents often hallucinate, write messy code, or mix up frameworks. ViraStack AI prevents this by injecting a strict "constitution" into your project.

### [Read the full documentation →](https://virastack.com/ai/)

## Why ViraStack AI?

- **Zero Hallucination:** Automatically detects your framework (Next.js or TanStack Start) and loads only the relevant context.
- **Strict Boundaries:** Enforces separation of concerns (features vs. shared), Zod-first validation, and safe API layers.
- **Performance First:** Prevents layout shifts, blocks main-thread scripts, and enforces Core Web Vitals best practices.
- **End-to-End Type Safety:** Demands TypeScript strictness, proper error normalization (`ApiError`), and safe mutation returns.

## Quick Start

Initialize the elite protocols in your project with a single command:

```bash
npx @virastack/ai init
```

The CLI will read your `package.json`, detect your stack, and safely inject the necessary `.mdc` rules and `AGENTS.md` into your `.cursor/rules` directory.

### CLI Options

| Flag            | Description                                            |
| :-------------- | :----------------------------------------------------- |
| `--force`, `-f` | Overwrite existing rule files without prompting.       |
| `--framework`   | Explicitly set the framework (`nextjs` or `tanstack`). |
| `--tr`          | Run the CLI with Turkish prompts and success messages. |

## License

Licensed under the [MIT License](https://github.com/virastack/ai/blob/main/LICENSE).
