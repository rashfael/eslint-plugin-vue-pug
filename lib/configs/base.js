/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
module.exports = {
  plugins: ['vue-pug'],
  rules: {
    'vue/component-name-in-template-casing': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-end-tags': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  },
  overrides: [
    {
      files: '*.vue',
      parser: require.resolve('vue-eslint-parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
      }
    }
  ]
}
