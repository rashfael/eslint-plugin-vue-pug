/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

'use strict'

const fs = require('fs')
const path = require('path')
const IGNORED_RULES = require('./ignored-rules')
const UPSTREAM_RULES_DIST = path.resolve(
  __dirname,
  '../../eslint-plugin-vue/dist/rules'
)
const UPSTREAM_TESTS_ROOT = path.resolve(
  __dirname,
  '../../tests/lib/rules/eslint-plugin-vue'
)
const OWN_RULES_ROOT = path.resolve(__dirname, '../../lib/rules')
const OWN_RULES_DIST = path.resolve(__dirname, '../../dist/rules')

function loadRuleMeta(ruleDistDir, name) {
  const mod = require(path.join(ruleDistDir, name))
  const ruleModule = mod.default || mod
  return ruleModule && ruleModule.meta ? { ...ruleModule.meta } : {}
}

const testedUpstreamRules = fs.existsSync(UPSTREAM_TESTS_ROOT)
  ? fs
      .readdirSync(UPSTREAM_TESTS_ROOT)
      .filter((file) => file.endsWith('.test.ts'))
      .map((file) => file.replace(/\.test\.ts$/, ''))
  : []

const ownRuleNames = fs
  .readdirSync(OWN_RULES_ROOT)
  .filter((file) => /\.(ts|js)$/.test(file))
  .map((file) => path.basename(file, path.extname(file)))

const ownRules = ownRuleNames.map((name) => {
  const meta = loadRuleMeta(OWN_RULES_DIST, name)
  if (meta.docs && !meta.docs.categories && meta.docs.category) {
    meta.docs = { ...meta.docs }
    meta.docs.categories = [meta.docs.category]
  }
  return { ruleId: `vue-pug/${name}`, name, meta }
})

const upstreamRules = fs.existsSync(UPSTREAM_RULES_DIST)
  ? fs
      .readdirSync(UPSTREAM_RULES_DIST)
      .filter((file) => file.endsWith('.js'))
      .map((file) => path.basename(file, '.js'))
      .filter((name) => !ownRules.some((rule) => rule.name === name))
      .map((name) => {
        const meta = loadRuleMeta(UPSTREAM_RULES_DIST, name)
        if (meta.docs && !meta.docs.categories && meta.docs.category) {
          meta.docs = { ...meta.docs }
          meta.docs.categories = [meta.docs.category]
        }
        return {
          ruleId: `vue/${name}`,
          name,
          meta,
          todo: !testedUpstreamRules.includes(name),
          ignored: IGNORED_RULES.includes(name)
        }
      })
  : []

module.exports = [...upstreamRules, ...ownRules]
