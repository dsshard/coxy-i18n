import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx', 'bin/*'],
  format: ['cjs', 'esm'],
  target: 'esnext',
  clean: true,
  dts: true,
  treeshake: true,
  splitting: false,
  minify: true,
  sourcemap: true,
  esbuildOptions(o) {
    o.drop = ['console', 'debugger']
    o.minifyIdentifiers = true
    o.minifySyntax = true
    o.minifyWhitespace = true
    o.define = { 'process.env.NODE_ENV': '"production"' }
  },
  external: ['crypto', 'net'],
})
