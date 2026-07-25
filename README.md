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

- **Smart Framework Isolation:** Automatically detects your framework (Next.js or TanStack Start) via `package.json` to inject only the relevant rules and prevent cross-framework hallucinations.
- **Dependency-Aware Intelligence:** Rules dynamically adapt to your installed packages (e.g., enforces `fetch` vs `axios`, native params vs `nuqs`, base-ui vs Radix).
- **Multi-Agent Ready:** Ships with unified `AGENTS.md` and `CLAUDE.md` entry points, ensuring Cursor, Claude Code, and Windsurf all follow the exact same architecture.
- **Strict Feature Boundaries:** Enforces feature-sliced design, blocking cross-feature imports and mandating Zod-first validation at the API edge.
- **Mandatory Patterns:** Imposes non-negotiable coding standards like TanStack Query `queryOptions` factories, Safe Return Patterns, and strict error normalization (`ApiError`).

## Injected Rule Coverage

The initialization command safely injects `.mdc` files into your `.cursor/rules` directory, covering:

- **Architecture:** Core Principles, Feature Boundaries, React Best Practices
- **Data & State:** TanStack Query, Zustand, API & Error Normalization
- **UI & Performance:** UI Components, Tailwind, Forms, Core Web Vitals
- **Quality:** TypeScript Strictness, Testing

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
