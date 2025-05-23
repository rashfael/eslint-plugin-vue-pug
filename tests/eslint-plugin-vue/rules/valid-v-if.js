// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/valid-v-if.js
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../eslint-plugin-vue/lib/rules/valid-v-if')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    ecmaVersion: 2015,
    parserOptions: {
      templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
    }
  }
})

tester.run('valid-v-if', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-if="foo")
</template>`
    },
    // parsing error
    {
      filename: 'parsing-error.vue',
      code: `<template lang="pug">div(v-if=".")</template>`
    },
    // comment value (parsing error)
    {
      filename: 'comment-value.vue',
      code: `<template lang="pug">div(v-if="/**/")</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-if="foo", v-else)
</template>`,
      errors: [
        "'v-if' and 'v-else' directives can't exist on the same element. You may want 'v-else-if' directives."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-if="foo", v-else-if="bar")
</template>`,
      errors: [
        "'v-if' and 'v-else-if' directives can't exist on the same element."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-if:aaa="foo")
</template>`,
      errors: ["'v-if' directives require no argument."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-if.aaa="foo")
</template>`,
      errors: ["'v-if' directives require no modifier."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-if)
</template>`,
      errors: ["'v-if' directives require that attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.vue',
      code: `<template lang="pug">
div
  div(v-if="")
</template>`,
      errors: ["'v-if' directives require that attribute value."]
    }
  ]
})
