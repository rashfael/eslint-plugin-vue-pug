// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/35bf1009d9b85d88b558d1739ddaadf665bb17dd/tests/lib/rules/mustache-interpolation-spacing.js
/**
 * @fileoverview enforce unified spacing in mustache interpolations.
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../eslint-plugin-vue/lib/rules/mustache-interpolation-spacing')
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

tester.run('mustache-interpolation-spacing', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template></template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:style="  ", :class="       foo      ", v-if=foo)</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{ text }}</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{ }}</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{ }}</template>`,
      options: ['always']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{}}</template>`,
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{text}}</template>`,
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{ text }}</template>`,
      options: ['always']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{         }}</template>`,
      options: ['always']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{         }}</template>`,
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{   text   }}</template>`,
      options: ['always']
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{ text}}</template>`,
      output: `<template lang="pug">div {{ text }}</template>`,
      options: ['always'],
      errors: ["Expected 1 space before '}}', but not found."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{text }}</template>`,
      output: `<template lang="pug">div {{ text }}</template>`,
      options: ['always'],
      errors: ["Expected 1 space after '{{', but not found."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{ text}}</template>`,
      output: `<template lang="pug">div {{text}}</template>`,
      options: ['never'],
      errors: ["Expected no space after '{{', but found."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{text }}</template>`,
      output: `<template lang="pug">div {{text}}</template>`,
      options: ['never'],
      errors: ["Expected no space before '}}', but found."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{text}}</template>`,
      output: `<template lang="pug">div {{ text }}</template>`,
      options: ['always'],
      errors: [
        "Expected 1 space after '{{', but not found.",
        "Expected 1 space before '}}', but not found."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{ text }}</template>`,
      output: `<template lang="pug">div {{text}}</template>`,
      options: ['never'],
      errors: [
        "Expected no space after '{{', but found.",
        "Expected no space before '}}', but found."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div {{   text   }}</template>`,
      output: `<template lang="pug">div {{text}}</template>`,
      options: ['never'],
      errors: [
        "Expected no space after '{{', but found.",
        "Expected no space before '}}', but found."
      ]
    }
  ]
})
