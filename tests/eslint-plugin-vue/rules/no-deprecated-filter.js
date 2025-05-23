// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-deprecated-filter.js
/**
 * @author Przemyslaw Falowski (@przemkow)
 * @fileoverview disallow using deprecated filters syntax
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../eslint-plugin-vue/lib/rules/no-deprecated-filter')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    ecmaVersion: 'latest',
    parserOptions: {
      templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
    }
  }
})

tester.run('no-deprecated-filter', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template lang="pug">| {{ msg }}</template>'
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">| {{ method(msg) }}</template>'
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">| {{ msg | filter }}</template>',
      parserOptions: {
        vueFeatures: {
          filter: false,
          templateTokenizer: {
            pug: 'vue-eslint-parser-template-tokenizer-pug'
          }
        }
      }
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: '<template lang="pug">| {{ msg | filter }}</template>',
      errors: ['Filters are deprecated.']
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">| {{ msg | filter(x) }}</template>',
      errors: ['Filters are deprecated.']
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">| {{ msg | filterA | filterB }}</template>',
      errors: ['Filters are deprecated.']
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div(v-for="msg in messages") {{ msg | filter }}</template>',
      errors: ['Filters are deprecated.']
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div(v-bind:id="msg | filter")</template>',
      errors: ['Filters are deprecated.']
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div(v-bind:id="msg | filter(aaa)")</template>',
      errors: ['Filters are deprecated.']
    },
    {
      filename: 'test.vue',
      code: '<template lang="pug">div(v-bind:id="msg | filterA | filterB")</template>',
      errors: ['Filters are deprecated.']
    }
  ]
})
