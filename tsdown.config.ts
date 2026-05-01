import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['lib/index.ts', 'lib/configs/**/*.ts'],
  format: ['cjs'],
  copy: ['lib/index.d.ts'],
  dts: false,
  unbundle: true,
  fixedExtension: false
})
