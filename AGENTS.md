# AGENTS.md

## Overview

A bitmap font generator targeting the Phaser game engine (v2 and v3 via separate add-on packages). Codebase originates from the Pixi.js bitmap text implementation.

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js
- **Package Manager:** pnpm (workspaces)
- **Domain:** Bitmap font generator (Phaser v2 / v3 compatible)
- **Build:** Rolldown + `tsc --emitDeclarationOnly`
- **Testing:** Vitest, @vitest/coverage-v8, jsdom
- **Lint/Format:** oxlint (+ `oxlint-tsgolint`), oxfmt
- **Type Checking:** TypeScript
- **Tooling:** lefthook (git hooks), commitlint (conventional commits)

## Commands

- **Install:** `pnpm install`
- **Build:** `pnpm build` (clears `dist/`, runs Rolldown, emits `.d.ts`)
- **Test (with coverage):** `pnpm test`
- **Lint:** `pnpm lint`
- **Format:** `pnpm format`
- **Typecheck:** `pnpm typecheck`
- **All checks:** `pnpm check` (lint + test + typecheck)

## Project Structure

- `src/index.ts` — public entry point
- `src/bitcharify/` — implementation modules
- `typedefs/` — ambient type declarations
- `dist/` — build output (gitignored)
- `docs/` — documentation
- `rolldown.config.ts`, `vitest.config.ts`, `tsconfig.json` — tool configs

## Conventions

- **Commits:** Conventional Commits (`@commitlint/config-conventional`)
- **Modules:** ESM only; use `.ts` source, `.js` extensions in import specifiers as required by `tsconfig`
- **Style:** Enforced by oxlint + oxfmt — do not hand-format

## Testing

- Tests are co-located with source as `*.test.ts` under `src/`
- Run a single file: `pnpm test src/bitcharify/core/toFontString.test.ts`
- DOM APIs available via jsdom environment
