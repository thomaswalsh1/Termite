import { defineConfig } from 'tsup'

// checks /packages/core/src/index.ts, and formats + splits it.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
})