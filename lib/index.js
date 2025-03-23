/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
'use strict'

const plugin = {
  meta: require('./meta'),
  configs: {
    // eslintrc configs
    base: require('./configs/base'),

    'vue2-essential': require('./configs/vue2-essential'),
    'vue2-strongly-recommended': require('./configs/vue2-strongly-recommended'),
    'vue2-recommended': require('./configs/vue2-recommended'),

    essential: require('./configs/vue3-essential'),
    'strongly-recommended': require('./configs/vue3-strongly-recommended'),
    recommended: require('./configs/vue3-recommended'),

    // flat configs
    'flat/base': require('./configs/flat/base.js'),

    'flat/vue2-essential': require('./configs/flat/vue2-essential.js'),
    'flat/vue2-strongly-recommended': require('./configs/flat/vue2-strongly-recommended.js'),
    'flat/vue2-recommended': require('./configs/flat/vue2-recommended.js'),

    'flat/essential': require('./configs/flat/vue3-essential.js'),
    'flat/strongly-recommended': require('./configs/flat/vue3-strongly-recommended.js'),
    'flat/recommended': require('./configs/flat/vue3-recommended.js')
  },
  rules: {
    'component-name-in-template-casing': require('./rules/component-name-in-template-casing'),
    'no-parsing-error': require('./rules/no-parsing-error'),
    'no-pug-control-flow': require('./rules/no-pug-control-flow')
  }
}

module.exports = plugin
