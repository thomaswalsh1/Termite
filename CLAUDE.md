# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (from repo root)
pnpm install

# Build all packages (core first, then react, per Turbo dependency graph)
pnpm build

# Development watch mode (all packages in parallel)
pnpm dev

# Run the example app
cd examples/react-app-example && npm run dev
```

There are no test or lint commands at the repo root level. The example app has ESLint (`npm run lint` inside `examples/react-app-example`).

## Architecture

This is a **pnpm + Turbo monorepo** with two publishable packages and one example app:

### Packages

**`packages/core`** — framework-agnostic, zero-dependency library.  
Manages terminal state purely and immutably: every function (`setInput`, `setCwd`, `clearHistory`, `execute`) takes a `TerminalState` and returns a new one. Command execution is delegated entirely to a user-supplied `TerminalHandler` (a `(input: string) => Promise<string>` callback). The core has no knowledge of React or the DOM.

**`packages/react`** — React wrapper around core.  
Exports two things: the `<Terminal />` component and the `useTerminal(handler)` hook. The hook owns React state and wires core functions to React callbacks (`onInput`, `onSubmit`, `onClear`). Styles are injected into `<head>` at runtime via `injectStyles()` in [packages/react/src/styles.ts](packages/react/src/styles.ts) — there are no external CSS files to import.

**`examples/react-app-example`** — Vite + React 19 demo. Not part of the published packages; used to manually verify rendering and theming.

### Build

Both packages use **tsup** (esbuild + tsc) and emit ES modules only (no CJS). React and React DOM are marked external in the react package. Turbo enforces that `core` always builds before `react` via `^build` dependency.

### Customization model

`<Terminal />` accepts a `classNames` prop with up to 9 named slots (e.g. `root`, `body`, `inputLine`) that override the default `.termite-*` class names. Theme tokens are CSS custom properties (`--termite-bg`, `--termite-text`, `--termite-font-size`, etc.) so consumers can restyle without touching classNames.
