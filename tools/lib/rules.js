/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

'use strict'

const fs = require('fs')
const path = require('path')
const IGNORED_RULES = require('./ignored-rules')
const UPSTREAM_RULES_ROOT = path.resolve(__dirname, '../../eslint-plugin-vue/lib/rules')
const UPSTREAM_TESTS_ROOT = path.resolve(__dirname, '../../tests/eslint-plugin-vue/rules')
const OWN_RULES_ROOT = path.resolve(__dirname, '../../lib/rules')


const testedUpstreamRules = fs
  .readdirSync(UPSTREAM_TESTS_ROOT)
  .filter((file) => path.extname(file) === '.js')
  .map((file) => path.basename(file, '.js'))

const ownRules = fs
  .readdirSync(OWN_RULES_ROOT)
  .filter((file) => path.extname(file) === '.js')
  .map((file) => path.basename(file, '.js'))
  .map((name) => {
    const meta = { ...require(path.join(OWN_RULES_ROOT, name)).meta }
    if (meta.docs && !meta.docs.categories && meta.docs.category) {
      // for vue3 migration
      meta.docs = { ...meta.docs }
      meta.docs.categories = [meta.docs.category]
    }
    return {
      ruleId: `vue-pug/${name}`,
      name,
      meta
    }
  })

const upstreamRules = fs
  .readdirSync(UPSTREAM_RULES_ROOT)
  .filter((file) => path.extname(file) === '.js')
  .map((file) => path.basename(file, '.js'))
  .filter((name) => !ownRules.some(rule => rule.name === name))
  .map((name) => {
    const meta = { ...require(path.join(UPSTREAM_RULES_ROOT, name)).meta }
    if (meta.docs && !meta.docs.categories && meta.docs.category) {
      // for vue3 migration
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

module.exports = [
  ...upstreamRules,
  ...ownRules
]
