// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/35bf1009d9b85d88b558d1739ddaadf665bb17dd/tests/lib/rules/custom-event-name-casing.js
/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../eslint-plugin-vue/lib/rules/custom-event-name-casing')

const tester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    ecmaVersion: 2020,
    sourceType: 'module',
    parserOptions: {
      templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
    }
  }
})

tester.run('custom-event-name-casing', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('foo-bar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('update:fooBar', value)
              context.emit('foo-bar')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('foo-bar')
          }
        }
      }
      </script>`,
      options: ['kebab-case']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('update:fooBar', value)")</template>
      <script>
      export default {
        setup(props, {emit}) {
          return {
            onInput(value) {
              emit('update:fooBar', value)
              emit('foo-bar')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('update:fooBar', value)
          }
        }
      }
      </script>`,
      options: ['kebab-case']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="emit('fooBar')")</template>
      <script>
      export default {
        setup(context) {
          return {
            onInput(value) {
              context.emit('barBaz')
            }
          }
        },
        methods: {
          onClick() {
            $emit('bazQux')
          }
        }
      }
      </script>`,
      options: ['kebab-case']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit(fooBar)")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit(barBaz)
            }
          }
        },
        methods: {
          onClick() {
            this.$emit(bazQux)
          }
        }
      }
      </script>`,
      options: ['kebab-case']
    },
    {
      filename: 'test.vue',
      code: `
      <script>
      export default {
        setup(prop, ...context) {
          return {
            onInput(value) {
              context.emit('barBaz')
            }
          }
        },
      }
      </script>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <script>
      export default {
        setup(prop, [context]) {
          return {
            onInput(value) {
              context.emit('barBaz')
            }
          }
        },
      }
      </script>
      `,
      options: ['kebab-case']
    },
    {
      filename: 'test.vue',
      code: `
      <script>
      export default {
        setup(prop, {e}) {
          return {
            onInput(value) {
              e('barBaz')
            }
          }
        },
      }
      </script>
      `,
      options: ['kebab-case']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('fooBar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('barBaz')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('bazQux')
          }
        }
      }
      </script>`,
      options: ['kebab-case', { ignores: ['fooBar', 'barBaz', 'bazQux'] }]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
input(@click="\$emit('input:update')")
input(@click="\$emit('search:update')")
input(@click="\$emit('click:row')")
</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('input:update')
              context.emit('search:update')
              context.emit('click:row')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('input:update')
            this.$emit('search:update')
            this.$emit('click:row')
          }
        }
      }
      </script>`,
      options: [
        'kebab-case',
        { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }
      ]
    },

    // For backward compatibility
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('fooBar')")</template>`,
      options: [{ ignores: ['fooBar'] }]
    },

    // camelCase
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('fooBar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('barBaz')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('bazQux')
          }
        }
      }
      </script>`,
      options: ['camelCase']
    },
    // Default
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('fooBar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('barBaz')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('bazQux')
          }
        }
      }
      </script>`
    },

    // kebab-case
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('foo-bar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('bar-baz')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('baz-qux')
          }
        }
      }
      </script>`,
      options: ['kebab-case']
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('fooBar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('barBaz')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('bazQux')
          }
        }
      }
      </script>`,
      options: ['kebab-case'],
      errors: [
        {
          message: "Custom event name 'fooBar' must be kebab-case.",
          line: 1,
          column: 42,
          endLine: 1,
          endColumn: 50
        },
        {
          message: "Custom event name 'barBaz' must be kebab-case.",
          line: 7,
          column: 28,
          endLine: 7,
          endColumn: 36
        },
        {
          message: "Custom event name 'bazQux' must be kebab-case.",
          line: 13,
          column: 24,
          endLine: 13,
          endColumn: 32
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit?.('fooBar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context?.emit?.('barBaz')
            }
          }
        },
        methods: {
          onClick() {
            this?.$emit?.('bazQux')
          }
        }
      }
      </script>`,
      options: ['kebab-case'],
      errors: [
        "Custom event name 'fooBar' must be kebab-case.",
        "Custom event name 'barBaz' must be kebab-case.",
        "Custom event name 'bazQux' must be kebab-case."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit?.('fooBar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              (context?.emit)?.('barBaz')
            }
          }
        },
        methods: {
          onClick() {
            (this?.$emit)?.('bazQux')
          }
        }
      }
      </script>`,
      options: ['kebab-case'],
      errors: [
        "Custom event name 'fooBar' must be kebab-case.",
        "Custom event name 'barBaz' must be kebab-case.",
        "Custom event name 'bazQux' must be kebab-case."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('input/update')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('search/update')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('click/row')
          }
        }
      }
      </script>`,
      options: [
        'kebab-case',
        { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }
      ],
      errors: [
        "Custom event name 'input/update' must be kebab-case.",
        "Custom event name 'search/update' must be kebab-case.",
        "Custom event name 'click/row' must be kebab-case."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('input/update')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('search/update')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('click/row')
          }
        }
      }
      </script>`,
      options: [
        'kebab-case',
        { ignores: ['input:update', 'search:update', 'click:row'] }
      ],
      errors: [
        "Custom event name 'input/update' must be kebab-case.",
        "Custom event name 'search/update' must be kebab-case.",
        "Custom event name 'click/row' must be kebab-case."
      ]
    },
    // camelCase
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('foo-bar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('bar-baz')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('baz-qux')
          }
        }
      }
      </script>`,
      options: ['camelCase'],
      errors: [
        "Custom event name 'foo-bar' must be camelCase.",
        "Custom event name 'bar-baz' must be camelCase.",
        "Custom event name 'baz-qux' must be camelCase."
      ]
    },
    // Default
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('foo-bar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('bar-baz')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('baz-qux')
          }
        }
      }
      </script>`,
      errors: [
        "Custom event name 'foo-bar' must be camelCase.",
        "Custom event name 'bar-baz' must be camelCase.",
        "Custom event name 'baz-qux' must be camelCase."
      ]
    },
    // kebab-case
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(@click="\$emit('fooBar')")</template>
      <script>
      export default {
        setup(props, context) {
          return {
            onInput(value) {
              context.emit('barBaz')
            }
          }
        },
        methods: {
          onClick() {
            this.$emit('bazQux')
          }
        }
      }
      </script>`,
      options: ['kebab-case'],
      errors: [
        "Custom event name 'fooBar' must be kebab-case.",
        "Custom event name 'barBaz' must be kebab-case.",
        "Custom event name 'bazQux' must be kebab-case."
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      const emit = defineEmits({})
      emit('fooBar')
      emit('foo-bar')
      </script>
      `,
      errors: [
        {
          message: "Custom event name 'foo-bar' must be camelCase.",
          line: 5
        }
      ]
    }
  ]
})
