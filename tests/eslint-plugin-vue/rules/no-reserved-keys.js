// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-reserved-keys.js
/**
 * @fileoverview Prevent overwrite reserved keys
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const semver = require('semver')
const rule = require('../../../eslint-plugin-vue/lib/rules/no-reserved-keys')
const RuleTester = require('eslint').RuleTester

const languageOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester()
tester.run('no-reserved-keys', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          props: ['foo'],
          computed: {
            bar () {
            }
          },
          data () {
            return {
              dat: null
            }
          },
          methods: {
            _foo () {},
            test () {
            }
          }
        }
      `,
      languageOptions
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: ['foo'],
          computed: {
            bar () {
            }
          },
          data: () => {
            return {
              dat: null
            }
          },
          methods: {
            _foo () {},
            test () {
            }
          }
        }
      `,
      languageOptions
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: ['foo'],
          computed: {
            bar () {
            }
          },
          data: () => ({
            dat: null
          }),
          methods: {
            _foo () {},
            test () {
            }
          }
        }
      `,
      languageOptions
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: ['foo'],
          computed: {
            bar () {
            }
          },
          data: () => ({
            dat: null
          }),
          methods: {
            _foo () {},
            test () {
            }
          },
          setup () {
            return {
              _bar: () => {}
            }
          }
        }
      `,
      languageOptions
    }
  ],

  invalid: [
    {
      filename: 'test.js',
      code: `
        new Vue({
          props: {
            $el: String
          }
        })
      `,
      languageOptions: {
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Key '$el' is reserved.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          setup () {
            return {
              $el: ''
            }
          }
        })
      `,
      languageOptions: {
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Key '$el' is reserved.",
          line: 5
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          asyncData () {
            return {
              $el: ''
            }
          }
        })
      `,
      languageOptions: {
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Key '$el' is reserved.",
          line: 5
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          data: {
            _foo: String
          }
        })
      `,
      languageOptions: {
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Keys starting with '_' are reserved in '_foo' group.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          data: () => {
            return {
              _foo: String
            }
          }
        })
      `,
      planguageOptions: {
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Keys starting with '_' are reserved in '_foo' group.",
          line: 5
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          data: () => ({
            _foo: String
          })
        })
      `,
      languageOptions: {
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Keys starting with '_' are reserved in '_foo' group.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          asyncData: () => ({
            _foo: String
          })
        })
      `,
      languageOptions: {
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Keys starting with '_' are reserved in '_foo' group.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          foo: {
            bar: String
          }
        })
      `,
      options: [{ reserved: ['bar'], groups: ['foo'] }],
      languageOptions: {
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Key 'bar' is reserved.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
        defineProps({
          $el: String
        })
      </script>
      `,
      languageOptions: {
        parser: require('vue-eslint-parser'),
        ecmaVersion: 6,
        parserOptions: {
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Key '$el' is reserved.",
          line: 4
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <script setup lang="ts">
        defineProps<{$el: string}>()
      </script>
      `,
      languageOptions: {
        ecmaVersion: 6,
        parser: require('vue-eslint-parser'),
        parserOptions: {
          parser: require('@typescript-eslint/parser'),
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
      errors: [
        {
          message: "Key '$el' is reserved.",
          line: 3
        }
      ]
    },
    ...(semver.lt(
      require('@typescript-eslint/parser/package.json').version,
      '4.0.0'
    )
      ? []
      : [
          {
            filename: 'test.vue',
            code: `
      <script setup lang="ts">
        interface Props {
          $el: string
        }
        defineProps<Props>()
      </script>
      `,
      languageOptions: {
        ecmaVersion: 6,
        parser: require('vue-eslint-parser'),
        parserOptions: {
          parser: require('@typescript-eslint/parser'),
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
            errors: [
              {
                message: "Key '$el' is reserved.",
                line: 4
              }
            ]
          },
          {
            filename: 'test.vue',
            code: `
      <script setup lang="ts">
        type A = {
          $el: string
        }
        defineProps<A>()
      </script>
      `,
      languageOptions: {
        ecmaVersion: 6,
        parser: require('vue-eslint-parser'),
        parserOptions: {
          parser: require('@typescript-eslint/parser'),
          templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
        }
      },
            errors: [
              {
                message: "Key '$el' is reserved.",
                line: 4
              }
            ]
          }
        ])
  ]
})
