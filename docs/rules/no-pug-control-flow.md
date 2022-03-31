---
pageClass: rule-details
sidebarDepth: 0
title: vue-pug/no-pug-control-flow
description: disallow pug control flow features.
---
# vue-pug/no-pug-control-flow

> disallow pug control flow features.

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- :gear: This rule is included in all of `"plugin:vue/vue3-strongly-recommended"`, `"plugin:vue/strongly-recommended"`, `"plugin:vue/vue3-recommended"` and `"plugin:vue/recommended"`.

## :book: Rule Details

This rule aims to prevent usage of pug control flow syntax like conditionals, loops and code. They break further linting and have better vue equivalents.

Forbidden pug features/syntax are:

- [code](https://pugjs.org/language/code.html)
- `if`, `else if`, `else` [conditionals](https://pugjs.org/language/conditionals.html)
- `each`, `for`, `while` [iteration](https://pugjs.org/language/iteration.html)
- `case`, `when` [case](https://pugjs.org/language/case.html)
- [includes](https://pugjs.org/language/includes.html)
- `extends`, `block` [inheritance](https://pugjs.org/language/inheritance.html)
- [interpolation](https://pugjs.org/language/interpolation.html)
- [mixins](https://pugjs.org/language/mixins.html)

<eslint-code-block :rules="{'vue/no-pug-control-flow': ['error']}">

```vue
<template lang="pug">
// ✗ BAD
- var foo = 'bar'
if foo
	p= foo
else
	each bar in foo
</template>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :mag: Implementation

- [Rule source](https://github.com/rashfael/eslint-plugin-vue-pug/blob/main/lib/rules/no-pug-control-flow.js)
- [Test source](https://github.com/rashfael/eslint-plugin-vue-pug/blob/main/tests/lib/rules/no-pug-control-flow.js)
