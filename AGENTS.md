# AGENTS.md

## Overview

A bitmap font generator targeting the Phaser game engine (v2 and v3 via separate add-on packages). Codebase originates from the Pixi.js bitmap text implementation.

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js
- **Package Manager:** pnpm (workspaces)
- **Build:** Rolldown + `tsc --emitDeclarationOnly`
- **Testing:** Vitest, @vitest/coverage-v8, jsdom
- **Lint/Format:** oxlint (+ `oxlint-tsgolint`), oxfmt
- **Type Checking:** TypeScript
- **Tooling:** lefthook (git hooks), commitlint (conventional commits)

## Documentation

- Lefthook: https://lefthook.dev/llms.txt
- OXC (oxlint, oxfmt): https://oxc.rs/llms.txt
- Phaser 3: https://context7.com/phaserjs/phaser/llms.txt
- Rolldown: https://rolldown.rs/llms.txt
- TypeScript: https://www.typescriptlang.org/llms.txt
- Vitest: https://vitest.dev/llms.txt

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
