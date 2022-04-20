# eslint-plugin-vue-pug

Extends [eslint-plugin-vue](https://eslint.vuejs.org/) to support pug templates.

## Installation

```sh
npm install --save-dev eslint@8 eslint-plugin-vue eslint-plugin-vue-pug vue-eslint-parser@next vue-eslint-parser-template-tokenizer-pug

```

## Usage

Most [eslint-plugin-vue](https://eslint.vuejs.org/) rules work out of the box with just adding this plugin in your eslint config:

```js
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue-pug/vue3-recommended'
  ]
}
```

If you are changing `parserOptions` yourself, add `templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }` to `parserOptions`.


## Supported Syntax

This plugin only lints pug syntax that directly corresponds to html syntax.
Pug syntax that is not supported includes mixins, js code, loops, if/else, case, include/extends.
The linter will just skip those features, which means that tags inside mixins will **not** be linted.
The rule [no-pug-control-flow](docs/rules/no-pug-control-flow.md) will help you to avoid unsupported pug syntax.

## Open Questions

### Comment Directive

Do we want own docs for that? Also, pug has no inline comments.

### #id and .class shorthands
Shorthands get dropped from attributes list to not affect attribute order. We need to add separate linter rules for those.
- `no-useless-template-attributes` checks for class on `template`, we need to also check shorthands.
- `no-restricted-class` needs special handling

### brace style

Existing rule fails at fixing and does not replace " quotes with `.

### parsing commas in dynamic attribute names

pug splits up attribute names like `:[[a,b,][1]]`


### spaces added by fix
`first-attribute-linebreak` adds a space between `tag(` and `attr=""` in certain scenarios.

### attribute separators
Things like `max-attributes-per-line` would need to include the `,` in the attribute range for some fixes to work correctly, but this would break `attribute-order`.

### HTML tokens
there are some rules relying on HTML* tokens, like `no-multi-spaces`.

### Splitting low level mustache tokens

### template attributes

having both lang and src attributes on template, what does that even do?

### HTML rules

Rules for HTML don't apply to pug, but do not seem to interfere with pug templates since they check `HTML*` tokens, which we don't emit. Should we still disable those rules or leave them on?
