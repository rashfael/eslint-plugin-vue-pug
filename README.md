# eslint-plugin-vue-pug

Extends [eslint-plugin-vue](https://eslint.vuejs.org/) to support pug templates

## Installation

```sh
npm install --save-dev eslint eslint-plugin-vue eslint-plugin-vue-pug
```

## Usage

Most [eslint-plugin-vue](https://eslint.vuejs.org/) work out of the box with just configuring 

If you are changing `parserOptions` yourself, add `templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }` to `parserOptions`.

## Notes

### Comment Directive

Do we want own docs for that? Also, pug has no inline comments.
