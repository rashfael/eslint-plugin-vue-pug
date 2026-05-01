import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/lib/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 60_000,
    globals: true,
    // Force eslint-plugin-vue's CJS dist through Vite's transform so the
    // `Object.defineProperty(exports, 'default', { get })` re-export resolves
    // identically here and in our own compiled CJS output.
    server: {
      deps: {
        inline: ['eslint-plugin-vue']
      }
    }
  }
})
