/*
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

import componentNameInTemplateCasing from './rules/component-name-in-template-casing.ts'
import noParsingError from './rules/no-parsing-error.ts'
import noPugControlFlow from './rules/no-pug-control-flow.ts'

export default {
  ...plugin,
  rules: {
    'component-name-in-template-casing': componentNameInTemplateCasing,
    'no-parsing-error': noParsingError,
    'no-pug-control-flow': noPugControlFlow
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
