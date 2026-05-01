/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
import plugin from '../../plugin.ts'

export default [
  {
    name: 'vue-pug/base/setup',
    plugins: {
      get 'vue-pug'() {
        return plugin
      }
    }
  },
  {
    name: 'vue-pug/base/setup-for-vue',
    files: ['*.vue', '**/*.vue'],
    plugins: {
      get 'vue-pug'() {
        return plugin
      }
    },
    languageOptions: {
      parserOptions: {
        templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
      }
    },
    rules: {
      'vue/component-name-in-template-casing': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-end-tags': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off'
    }
  }
]
