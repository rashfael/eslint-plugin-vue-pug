import { RuleTester } from '../../eslint-compat'
import vueEslintParser from 'vue-eslint-parser'
import rule from '../../../lib/rules/no-parsing-error.ts'

const tester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
    ecmaVersion: 2015,
    parserOptions: {
      templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
    }
  }
})

// TODO add more test cases
tester.run('no-parsing-error', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:a="3") {{ 3 + 4 }}</template>`
    }
  ],
  invalid: [
    // NO_END_BRACKET
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(a</template>`,
      errors: [
        'Parsing error: The end of the string reached with no closing bracket ) found.'
      ]
    },
    // UNEXPECTED_TEXT
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(a))</template>`,
      errors: ['Parsing error: unexpected text ")".']
    }
  ]
})
