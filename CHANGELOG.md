# Changelog

## [v1.3.0] - 2026-07-24

### Added
- **Framework Isolation**: Complete separation of Core, Next.js, and TanStack Start rules. Agents no longer see cross-framework noise.
- **Framework-Specific AGENTS.md**: `AGENTS.md` is now generated specifically for the active framework, preventing hallucination.
- **Mandatory Patterns**: Added strict, non-negotiable coding patterns to rules (e.g., `queryOptions` factory, Zod Safe Parsing, Tailwind `cn()` utility, Safe Return Pattern).
- **CLI Enhancements**: Added `--framework <name>` flag for seamless, non-interactive integration with ViraStack Start CLI.
- **Testing**: Added CLI tests via `vitest`.

### Changed
- **Folder Structure**: Templates are now organized into `core/`, `nextjs/`, and `tanstack/` directories.
- **Rule Refinement**: Rules are now shorter, stricter, and purely in English to optimize token usage and agent comprehension.
- **Performance Rules**: Extracted framework-agnostic performance rules into `core` and moved Next.js specific optimizations (`next/image`, `next/dynamic`, etc.) into `nextjs.mdc` to prevent hallucination in TanStack projects.
- **TanStack Query Rules**: Moved `tanstack-query.mdc` to `core` so both Next.js and TanStack Start projects benefit from strict query boundaries.

## [v1.2.2] - 2026-07-24

### Changed

- **API Errors:** `api.mdc` now standardizes on `ApiError` (`message`, `status`, `data`) instead of the ambiguous `AppError` name.

## [v1.2.1] - 2026-07-24

### Changed

- **API Client SSOT:** Architecture guide and `api.mdc` now treat a native `fetch` wrapper as the ViraStack default; Axios remains optional when present in `package.json`.
- **API Examples:** Correct examples match fetch (`T`) vs axios (`{ data }`) return shapes.
- **Validation Commands:** `AGENTS.md` and `core-principles.mdc` use `pnpm typecheck` (aligned with ViraStack Start scripts).
- **Shared Layer Wording:** Clarified global `src/` folders; removed ambiguous `src/shared` guidance.
- **TanStack Query Ban Example:** Incorrect example no longer implies Axios is required.

## [v1.2.0] - 2026-07-23

### Added

- **Smart Framework Detection**: The `npx @virastack/ai init` command now automatically detects the project's framework (Next.js or TanStack Start) by reading `package.json` and skips copying irrelevant `.mdc` rule files to prevent AI hallucination.
- **Interactive Overwrite & Force Flag**: The CLI now prompts `[y/N]` before overwriting existing files, preventing accidental data loss. You can bypass prompts and overwrite all files using the `--force` or `-f` flag.
- **Turkish Language Support**: Added `--tr` flag to `@virastack/ai init` for Turkish prompts and success messages.
- **Improved UX**: Refined the success message with a modern "Tip:" format for better CLI developer experience, and added a specific informational message when all files are skipped.

## [v1.1.1] - 2026-07-22

### Added

- **CLAUDE.md**: Entry point for Claude Code — points to `AGENTS.md` and `.cursor/rules/` without duplicating content.
- **Tool compatibility table** in `AGENTS.md` for Cursor, Claude Code, and other agents.
- **Tailwind CSS v4 Standards**: Added a rule to `ui-components.mdc` to enforce Tailwind CSS v4 syntax and canonical classes (e.g., `bg-linear-to-*`, `size-*`).

## [v1.1.0] - 2026-07-22

### Added

- **Dynamic Package Checks**: Added `CRITICAL CHECK` logic to rules. AI agents will now inspect `package.json` before writing code to ensure perfect alignment with installed libraries.
- **URL State Protocol**: Added strict rules for managing URL state (pagination, filters). Enforces `nuqs` if installed, otherwise native search params.
- **HTTP Client Agnosticism**: Removed strict `axios` requirement. The API layer rule now dynamically adapts to use either a centralized `axios` instance or a native `fetch` wrapper based on project dependencies.
- **UI Primitives Agnosticism**: Removed strict `Radix UI` assumptions. The UI components rule now dynamically adapts to use `@base-ui/react`, `@radix-ui/*`, or native HTML elements based on project dependencies.
- **Strict Naming Conventions**: Added comprehensive, non-negotiable naming conventions (`kebab-case` for files, `PascalCase` for components) and import alias (`@/`) rules to `core-principles.mdc`.

## [v1.0.0] - 2026-07-22

### Initial Release

- **@virastack/ai**: AI-native architecture kit and high-discipline protocols for modern React applications is now live!
- **CLI**: `npx @virastack/ai init` command to inject specialized `.mdc` files into your `.cursor/rules` directory.
- **Protocols**: Elite engineering protocols for UI/UX, API Layer, Performance, State, and Frameworks (Next.js 16 & TanStack Start).
