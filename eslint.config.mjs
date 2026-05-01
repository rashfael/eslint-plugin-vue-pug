import js from '@eslint/js'
import globals from 'globals'
import eslintPluginEslintPlugin from 'eslint-plugin-eslint-plugin'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tsEslintParser from '@typescript-eslint/parser'

export default [
  {
    ignores: [
      'dist/**',
      'eslint-plugin-vue/**',
      'docs/.vuepress/dist/**',
      'node_modules/**'
    ]
  },
  js.configs.recommended,
  eslintPluginEslintPlugin.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],
      'eslint-plugin/require-meta-docs-description': [
        'error',
        { pattern: '^(enforce|require|disallow).*[^.]$' }
      ],
      'eslint-plugin/require-meta-docs-url': 'off',
      'eslint-plugin/require-meta-docs-recommended': 'off',
      'eslint-plugin/require-meta-schema-description': 'off'
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        sourceType: 'module'
      }
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off'
    }
  },
  {
    files: ['tools/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  }
]
