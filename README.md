<div align="center">

<img src="https://raw.githubusercontent.com/virastack/ai/main/assets/virastack-ai.png" alt="ViraStack AI" height="120" style="max-width: 100%;" />

*AI-native architecture kit for modern React — disciplined agent rules in one command.*

[![ViraStack AI](https://img.shields.io/badge/ViraStack-AI-%23d946ef)](https://virastack.com/ai)
[![npm version](https://img.shields.io/npm/v/@virastack/ai)](https://www.npmjs.com/package/@virastack/ai)
[![npm downloads](https://img.shields.io/npm/dt/@virastack/ai)](https://www.npmjs.com/package/@virastack/ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/virastack/ai/blob/main/LICENSE)
[![@virastack](https://img.shields.io/badge/-%40virastack-black?logo=x&logoColor=white)](https://x.com/virastack)

</div>

---

### [Read the full documentation →](https://virastack.com/ai/)

## Why ViraStack AI?

- **Smart Framework Isolation:** Automatically detects your framework (Next.js or TanStack Start) via `package.json` to inject only the relevant rules and prevent cross-framework hallucinations.
- **Strict Feature Boundaries:** Enforces feature-sliced design, blocking cross-feature imports and mandating Zod-first validation at the API edge.
- **Multi-Agent Ready:** Ships with unified `AGENTS.md` and `CLAUDE.md` entry points, ensuring Cursor, Claude Code, and Windsurf all follow the exact same architecture.
- **Mandatory Patterns:** Imposes non-negotiable coding standards like TanStack Query `queryOptions` factories, Safe Return Patterns, and strict error normalization (`ApiError`).

## Injected Rule Coverage

The initialization command safely injects `.mdc` files into your `.cursor/rules` directory, covering:

- **Architecture:** Core Principles, Feature Boundaries, React Best Practices
- **Data & State:** TanStack Query, Zustand, API & Error Normalization
- **UI & Performance:** UI Components, Tailwind, Forms, Core Web Vitals
- **Quality:** TypeScript Strictness, Testing

## Quick Start

```bash
npx @virastack/ai init
```

The CLI reads your `package.json`, detects your stack, and injects `.mdc` rules and `AGENTS.md` into `.cursor/rules`.

**Starting a new project?** [ViraStack Start](https://virastack.com/start/) scaffolds Next.js or TanStack Start with these rules pre-installed.

## Options

| Flag            | Description                                            |
| :-------------- | :----------------------------------------------------- |
| `--force`, `-f` | Overwrite existing rule files without prompting.       |
| `--framework`   | Explicitly set the framework (`nextjs` or `tanstack`). |
| `--tr`          | Run the CLI with Turkish prompts and success messages. |

## License

Licensed under the [MIT License](https://github.com/virastack/ai/blob/main/LICENSE).
