/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

/*
This script updates `lib/configs/*.js` files from rule's meta data.
*/

const fs = require('fs')
const path = require('path')
const { FlatESLint } = require('eslint/use-at-your-own-risk')
const { categories } = require('./lib/categories')

const errorCategories = new Set(['base', 'vue2-essential', 'vue3-essential'])

const extendsCategories = {
  base: null,
  'vue2-essential': 'base',
  'vue3-essential': 'base',
  'vue2-strongly-recommended': 'vue2-essential',
  'vue3-strongly-recommended': 'vue3-essential',
  'vue2-recommended': 'vue2-strongly-recommended',
  'vue3-recommended': 'vue3-strongly-recommended',
  'vue2-use-with-caution': 'vue2-recommended',
  'vue3-use-with-caution': 'vue3-recommended'
}

const disableUpstreamRules = [
  'component-name-in-template-casing',
  'html-self-closing',
  'html-end-tags',
  'multiline-html-element-content-newline',
  'singleline-html-element-content-newline'
]

function formatRules(rules, categoryId) {
  let disabledRules = {}
  if (categoryId === 'base') {
    disabledRules = disableUpstreamRules.reduce((setting, rule) => {
      setting[`vue/${rule}`] = 'off'
      return setting
    }, {})
  }
  const obj = {
    ...disabledRules,
    ...Object.fromEntries(rules
      .filter((rule) => rule.ruleId.startsWith('vue-pug/'))
      .map(( rule) => {
        let options = errorCategories.has(categoryId) ? 'error' : 'warn'
        const defaultOptions =
          rule.meta && rule.meta.docs && rule.meta.docs.defaultOptions
        if (defaultOptions) {
          const v = categoryId.startsWith('vue3') ? 3 : 2
          const defaultOption = defaultOptions[`vue${v}`]
          if (defaultOption) {
            options = [options, ...defaultOption]
          }
        }
        return [rule.ruleId, options]
      }, {})
    )
  }
  return JSON.stringify(obj, null, 2)
}

function formatCategory(category) {
  const extendsCategoryId = extendsCategories[category.categoryId]
  if (extendsCategoryId == null) {
    return `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
module.exports = {
  plugins: [
    'vue-pug'
  ],
  rules: ${formatRules(category.rules, category.categoryId)},
  overrides: [
    {
      files: '*.vue',
      parser: require.resolve('vue-eslint-parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
      },
    }
  ]
}
`
  }
  return `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
module.exports = {
  extends: require.resolve('./${extendsCategoryId}'),
  rules: ${formatRules(category.rules, category.categoryId)}
}
`
}

// Update files.
const ROOT = path.resolve(__dirname, '../lib/configs/')
categories.forEach((category) => {
  const filePath = path.join(ROOT, `${category.categoryId}.js`)
  const content = formatCategory(category)

  fs.writeFileSync(filePath, content)
})

// Format files.
async function format() {
  const linter = new FlatESLint({ fix: true })
  const report = await linter.lintFiles([ROOT])
  FlatESLint.outputFixes(report)
}

format()
