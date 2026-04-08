import { defineConfig } from 'tsup'

// checks /react/src/index.ts, then splits it into js and type declarations
// also ensures that react and react-dom aren't bundled with it
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
})