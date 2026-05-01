/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

/*
This script updates `lib/index.ts` from rule's meta data.
*/

const fs = require('fs')
const path = require('path')
const { FlatESLint } = require('eslint/use-at-your-own-risk')
const rules = require('./lib/rules')

const filePath = path.resolve(__dirname, '../lib/index.ts')
const ownRules = rules.filter((rule) => rule.ruleId.startsWith('vue-pug/'))

function camelify(name) {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

const ruleImports = ownRules
  .map((rule) => `import ${camelify(rule.name)} from './rules/${rule.name}.ts'`)
  .join('\n')

const ruleEntries = ownRules
  .map((rule) => `    '${rule.name}': ${camelify(rule.name)}`)
  .join(',\n')

const content = `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
import plugin from './plugin.ts'

import base from './configs/base.ts'
import vue2Essential from './configs/vue2-essential.ts'
import vue2StronglyRecommended from './configs/vue2-strongly-recommended.ts'
import vue2Recommended from './configs/vue2-recommended.ts'
import vue3Essential from './configs/vue3-essential.ts'
import vue3StronglyRecommended from './configs/vue3-strongly-recommended.ts'
import vue3Recommended from './configs/vue3-recommended.ts'

import flatBase from './configs/flat/base.ts'
import flatVue2Essential from './configs/flat/vue2-essential.ts'
import flatVue2StronglyRecommended from './configs/flat/vue2-strongly-recommended.ts'
import flatVue2Recommended from './configs/flat/vue2-recommended.ts'
import flatVue3Essential from './configs/flat/vue3-essential.ts'
import flatVue3StronglyRecommended from './configs/flat/vue3-strongly-recommended.ts'
import flatVue3Recommended from './configs/flat/vue3-recommended.ts'

${ruleImports}

export default {
  ...plugin,
  rules: {
${ruleEntries}
  },
  configs: {
    // eslintrc configs
    base,
    'vue2-essential': vue2Essential,
    'vue2-strongly-recommended': vue2StronglyRecommended,
    'vue2-recommended': vue2Recommended,
    essential: vue3Essential,
    'strongly-recommended': vue3StronglyRecommended,
    recommended: vue3Recommended,

    // flat configs
    'flat/base': flatBase,
    'flat/vue2-essential': flatVue2Essential,
    'flat/vue2-strongly-recommended': flatVue2StronglyRecommended,
    'flat/vue2-recommended': flatVue2Recommended,
    'flat/essential': flatVue3Essential,
    'flat/strongly-recommended': flatVue3StronglyRecommended,
    'flat/recommended': flatVue3Recommended
  }
}
`

fs.writeFileSync(filePath, content)

async function format() {
  const linter = new FlatESLint({ fix: true })
  const report = await linter.lintFiles([filePath])
  FlatESLint.outputFixes(report)
}

format()
