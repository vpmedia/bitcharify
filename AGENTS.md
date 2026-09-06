# AGENTS.md

## Overview

A bitmap font generator targeting the Phaser game engine (v2 and v3 via separate add-on packages). Codebase originates from the Pixi.js bitmap text implementation.

## Tech Stack

Read [package.json](package.json) for the language, runtime, dependencies and tooling.

## Documentation

- Lefthook: https://lefthook.dev/llms.txt
- OXC (oxlint, oxfmt): https://oxc.rs/llms.txt
- Phaser 3: https://context7.com/phaserjs/phaser/llms.txt
- Rolldown: https://rolldown.rs/llms.txt
- TypeScript: https://context7.com/websites/typescriptlang/llms.txt
- Vitest: https://vitest.dev/llms.txt

## Commands

- **Install:** `pnpm install`
- **Build:** `pnpm build` (clears `dist/`, runs Rolldown, emits `.d.ts`)
- **Test (with coverage):** `pnpm test`
- **Lint:** `pnpm lint`
- **Format:** `pnpm format`
- **Typecheck:** `pnpm typecheck`
- **All checks:** `pnpm check` (lint + test + typecheck)

## Conventions

- **Commits:** Conventional Commits (`@commitlint/config-conventional`)
- **Modules:** ESM only; use `.ts` source, `.js` extensions in import specifiers as required by `tsconfig`
- **Style:** Enforced by oxlint + oxfmt — do not hand-format

## Testing

- Tests are co-located with source as `*.test.ts` under `src/`
- Run a single file: `pnpm test src/bitcharify/core/toFontString.test.ts`
- DOM APIs available via happy-dom environment

happy-dom ships no canvas, and this package is nothing but canvas work, so
`installCanvasContext2D()` from `src/testing/canvas.ts` supplies a deterministic 2D context: a
character is eight pixels wide at a 16px font, the ascent is four fifths of the font size and the
descent the remaining fifth. Every expected number in the generator tests is derived from those
ratios, so changing the fixture rewrites the suite. `src/testing/` is excluded from
`tsconfig.build.json`, and nothing `src/index.ts` reaches imports it, so it stays out of `dist/`.

`measureText` caches its measuring surface in module scope and prefers an `OffscreenCanvas`. A test
that needs different metrics stubs `OffscreenCanvas` and re-imports the module through
`vi.resetModules()`; happy-dom's own `OffscreenCanvas` returns no 2D context, so the unstubbed path
falls through to `document.createElement('canvas')`.

`vitest.config.ts` carries a `coverage.thresholds` block set just under where the suite stands.
Re-base the numbers when coverage genuinely moves; never lower one to turn a red run green.

## Reference Documentation

Read on demand:

- [clean-code.md](docs/agents/clean-code.md) — general clean-code guidelines: naming, functions, comments, error handling, classes, testing, and refactoring.
