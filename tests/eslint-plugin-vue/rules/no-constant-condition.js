// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-constant-condition.js
/**
 * @author Flo Edelmann
 */
'use strict'

const { RuleTester } = require('eslint')
const rule = require('../../../eslint-plugin-vue/lib/rules/no-constant-condition.js')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 6,
    templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
  }
})

tester.run('no-constant-condition', rule, {
  valid: [
    `<template lang="pug">CustomButton(v-if="a")</template>`,
    `<template lang="pug">CustomButton(v-if="a == 0")</template>`,
    `<template lang="pug">CustomButton(v-if="a == f()")</template>`,
    `<template lang="pug">CustomButton(v-other-directive="true")</template>`
  ],
  invalid: [
    {
      code: `<template lang="pug">CustomButton(v-if="-2")</template>`,
      errors: [
        {
          messageId: 'unexpected',
          type: 'UnaryExpression',
          column: 41,
          endColumn: 43
        }
      ]
    },
    {
      code: `<template lang="pug">CustomButton(v-else-if="true")</template>`,
      errors: [
        {
          messageId: 'unexpected',
          type: 'Literal',
          column: 46,
          endColumn: 50
        }
      ]
    },
    {
      code: `<template lang="pug">CustomButton(v-if="1")</template>`,
      errors: [
        {
          messageId: 'unexpected',
          type: 'Literal',
          column: 41,
          endColumn: 42
        }
      ]
    },
    {
      code: `<template lang="pug">CustomButton(v-show="{}")</template>`,
      errors: [
        {
          messageId: 'unexpected',
          type: 'ObjectExpression',
          column: 43,
          endColumn: 45
        }
      ]
    },
    {
      code: `<template lang="pug">CustomButton(v-if="0 < 1")</template>`,
      errors: [
        {
          messageId: 'unexpected',
          type: 'BinaryExpression',
          column: 41,
          endColumn: 46
        }
      ]
    },
    {
      code: `<template lang="pug">CustomButton(v-if="0 || 1")</template>`,
      errors: [
        {
          messageId: 'unexpected',
          type: 'LogicalExpression',
          column: 41,
          endColumn: 47
        }
      ]
    }

    // failing in Node.js v8, because template literals are not supported there:
    // {
    //   code: '<template><CustomButton v-if="`foo`" /></template>',
    //   errors: [
    //     {
    //       messageId: 'unexpected',
    //       type: 'TemplateLiteral',
    //       column: 31,
    //       endColumn: 36
    //     }
    //   ]
    // },
    // {
    //   code: '<template><CustomButton v-if="``" /></template>',
    //   errors: [
    //     {
    //       messageId: 'unexpected',
    //       type: 'TemplateLiteral',
    //       column: 31,
    //       endColumn: 33
    //     }
    //   ]
    // }
  ]
})
