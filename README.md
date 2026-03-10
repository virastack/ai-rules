# Kaide

**AI-native** architecture kit for modern React. High-discipline protocols for autonomous agents.

> **Kaide** (Etymology: Turkish): A fundamental rule, principle, or base that provides structural integrity. The name cleverly embeds **AI** (K**ai**de), reflecting its core mission.

<img src="kaide.png" alt="Kaide" width="610px" />

## Getting Started

### Installation & Setup

1. Run the CLI to automatically install the configuration files:

   ```bash
   npx kaide init
   ```
2. (Recommended) For maximum adherence, point your AI tool to your identity in **Settings/Project Rules**:

> **Adhere to `AGENTS.md` for persona/planning and `docs/` for architectural constitutions.**

### Usage Workflow
This kit follows a **Plan-First Protocol**:
- **Initialize:** Ask the AI to read the rules: `Read all .mdc files and AGENTS.md.`
- **Plan:** Propose a feature: `I want to build a [Feature Name]. Create an architectural plan.`
- **Execute:** After approving the plan, the AI will generate code following the strict constraints of the relevant `.mdc` files.

## The Problem We Solve

**Kaide** provides the missing governance layer to turn AI from a simple coder into a high-level Staff Engineer.

Without a structured architectural constitution, AI agents often suffer from:
- **Hallucinations & Drift:** Generating outdated patterns or mixing incompatible framework logics.
- **Context Bloat:** Wasting tokens and losing focus by re-learning project rules in every session.
- **Architectural Erosion:** Degrading code quality over time due to a lack of enforced modularity.
- **Inefficient Execution:** Writing boilerplate-heavy code instead of precise, feature-driven logic.

## Core Architecture
The system operates on a **Three-Layer Governance** model:

- **Global Constitution (`core-principles.mdc`):** Universal rules for code integrity, naming, and error management.
- **Framework Adapters (`nextjs.mdc`, `tanstack-start.mdc`):** Optimized protocols for Next.js 16 and TanStack Start, ensuring the AI utilizes the best patterns for each.
- **Technical Standards (`api.mdc`, `forms.mdc`, `testing.mdc`, etc.):** Domain-specific constraints for state, validation, and performance.

## Key Features
- **Elite AI Persona:** Integrated `AGENTS.md` to transform your LLM into a specialized Staff Architect.
- **Feature-Driven Design:** Everything is organized by domain in `src/features/`.
- **Zod-First Type Safety:** End-to-end type safety derived from schemas.
- **Optimized for Modern Tech:** Seamless support for Next.js and TanStack Start for world-class web applications.
- **Performance-First:** Built-in rules for LCP optimization, CLS prevention, and maximum efficiency.

## LLM Agnostic Usage
While optimized for Cursor (`.mdc`), **Kaide** is built on pure Markdown and works with any "Agentic" AI (Claude Code, Windsurf, GitHub Copilot CLI, etc.):
- All `.mdc` files are standard Markdown. No conversion is needed.
- **Tip:** Simply tell your agent: *"Read all rules in `.cursor/rules/` and follow the `AGENTS.md` persona"* at the start of your session.

## Technical Standards
| Layer | Tech Stack | Tooling |
| :--- | :--- | :--- |
| **Server State** | TanStack Query | `tanstack-query.mdc` |
| **Client State** | Zustand | `state-management.mdc` |
| **Validation** | Zod | `typescript.mdc` |
| **Testing** | Vitest + RTL | `testing.mdc` |
| **Styling** | Tailwind CSS | `ui-components.mdc` |

## Security & Performance
- **Zero Inline Script:** Strictly enforced CSP compliance.
- **Locked Boundaries:** Server-only logic is isolated from client bundles.
- **Optimized Assets:** Automatic enforcement of modern formats and performance patterns for peak scores.
