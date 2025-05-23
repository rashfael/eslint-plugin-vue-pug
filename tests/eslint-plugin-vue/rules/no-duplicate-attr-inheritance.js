// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-duplicate-attr-inheritance.js
/**
 * @fileoverview Disable inheritAttrs when using v-bind=&#34;$attrs&#34;
 * @author Hiroki Osame
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../eslint-plugin-vue/lib/rules/no-duplicate-attr-inheritance')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
    }
  }
})
tester.run('no-duplicate-attr-inheritance', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div
</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
div
  div
</template>
        <script>
        export default { inheritAttrs: true }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
div
  div
</template>
        <script>
        const data = {};
        export default {
          ...data,
          inheritAttrs: true
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
div
  div
</template>
        <script>
        const inheritAttrs = false;
        export default { inheritAttrs }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
div
  div(v-bind="\$attrs")
</template>
        <script>
        export default { inheritAttrs: false }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
div
  div(v-bind="\$attrs")
</template>
        <script>
        export default { inheritAttrs: 0 }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
div
  div(v-bind:foo="\$attrs")
</template>
        <script>
        export default {  }
        </script>`
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-bind="\$attrs")
</template>`,
      errors: ['Set "inheritAttrs" to false.']
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
div
  div(v-bind="\$attrs")
</template>
        <script>
        export default {
          inheritAttrs: true
        }
        </script>`,
      errors: ['Set "inheritAttrs" to false.']
    }
  ]
})
