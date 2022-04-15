const RuleTester = require('eslint').RuleTester
const rule = require('../../lib/rules/no-parsing-error')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2015,
    templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
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
    // {
    //   code: `<template lang="pug"></template>`,
    //   options: [{ '': false }]
    // },
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
    // {
    //   filename: 'test.vue',
    //   code: `<template lang="pug">

    // </template>`,
    //   errors: ['Parsing error: ']
    // },
  ]
})
