// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-spaces-around-equal-signs-in-attribute.js
/**
 * @author Yosuke Ota
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../eslint-plugin-vue/lib/rules/no-spaces-around-equal-signs-in-attribute')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    parserOptions: {
      templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
    }
  }
})

tester.run('no-spaces-around-equal-signs-in-attribute', rule, {
  valid: [
    `<template lang="pug">div(attr="value")</template>`,
    `<template lang="pug">div(attr)</template>`,
    `<template lang="pug">div</template>`,
    `<template lang="pug">#uniqueID(is="header", v-for="item in items", v-if="!visible", v-once, ref="header", v-model="headerData", myProp="prop", @click="functionCall", v-text="textContent")</template>`
  ],
  invalid: [
    {
      code: `<template lang="pug">div(attr = "value")</template>`,
      output: `<template lang="pug">div(attr="value")</template>`,
      errors: [
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 1,
          column: 30,
          endLine: 1,
          endColumn: 33
        }
      ]
    },
    {
      code: `<template lang="pug">div(attr = 'value')</template>`,
      output: `<template lang="pug">div(attr='value')</template>`,
      errors: [
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 1,
          column: 30,
          endLine: 1,
          endColumn: 33
        }
      ]
    },
    {
      code: `<template lang="pug">div(attr \t = \t "value")</template>`,
      output: `<template lang="pug">div(attr="value")</template>`,
      errors: [
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 1,
          column: 30,
          endLine: 1,
          endColumn: 37
        }
      ]
    },
    // {
    //   code: `<!-- CONVERT ERROR -->Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).<template><div attr \t\n   =   \t\n "value" /></template>`,
    //   output: `<template lang="pug">div(attr="value")</template>`,
    //   errors: [
    //     {
    //       message: 'Unexpected spaces found around equal signs.',
    //       line: 1,
    //       column: 30,
    //       endLine: 3,
    //       endColumn: 2
    //     }
    //   ]
    // },
    {
      code: `<template lang="pug">div(attr ="value")</template>`,
      output: `<template lang="pug">div(attr="value")</template>`,
      errors: [
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 1,
          column: 30,
          endLine: 1,
          endColumn: 32
        }
      ]
    },
    {
      code: `<template lang="pug">div(attr= "value")</template>`,
      output: `<template lang="pug">div(attr="value")</template>`,
      errors: [
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 1,
          column: 30,
          endLine: 1,
          endColumn: 32
        }
      ]
    },
    {
      code: `<template lang="pug">
div(
  is = "header",
  v-for = "item in items",
  v-if = "!visible",
  v-once,
  id = "uniqueID",
  ref = "header",
  v-model = "headerData",
  myProp = "prop",
  @click = "functionCall",
  v-text = "textContent"
)</template>`,
      output: `<template lang="pug">
div(
  is="header",
  v-for="item in items",
  v-if="!visible",
  v-once,
  id="uniqueID",
  ref="header",
  v-model="headerData",
  myProp="prop",
  @click="functionCall",
  v-text="textContent"
)</template>`,
      errors: [
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 8
        },
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 4,
          column: 8,
          endLine: 4,
          endColumn: 11
        },
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 5,
          column: 7,
          endLine: 5,
          endColumn: 10
        },
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 7,
          column: 5,
          endLine: 7,
          endColumn: 8
        },
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 8,
          column: 6,
          endLine: 8,
          endColumn: 9
        },
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 9,
          column: 10,
          endLine: 9,
          endColumn: 13
        },
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 10,
          column: 9,
          endLine: 10,
          endColumn: 12
        },
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 11,
          column: 9,
          endLine: 11,
          endColumn: 12
        },
        {
          message: 'Unexpected spaces found around equal signs.',
          line: 12,
          column: 9,
          endLine: 12,
          endColumn: 12
        }
      ]
    }
  ]
})
