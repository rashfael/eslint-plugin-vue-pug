import type { ESLint, Linter } from 'eslint'

declare const plugin: ESLint.Plugin & {
  configs: Record<string, Linter.LegacyConfig | Linter.Config[]>
  rules: NonNullable<ESLint.Plugin['rules']>
}

export default plugin
