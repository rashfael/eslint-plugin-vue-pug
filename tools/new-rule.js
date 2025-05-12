const path = require('path')
const fs = require('fs')
const cp = require('child_process')
const logger = console

// main
;((ruleId) => {
  if (ruleId == null) {
    logger.error('Usage: npm run new <RuleID>')
    process.exitCode = 1
    return
  }
  if (!/^[\w-]+$/u.test(ruleId)) {
    logger.error("Invalid RuleID '%s'.", ruleId)
    process.exitCode = 1
    return
  }

  const ruleFile = path.resolve(__dirname, `../lib/rules/${ruleId}.js`)
  const testFile = path.resolve(__dirname, `../tests/rules/${ruleId}.js`)
  const docFile = path.resolve(__dirname, `../docs/rules/${ruleId}.md`)

  fs.writeFileSync(
    ruleFile,
    `const utils = require('../utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '',
      categories: undefined,
      url: ''
    },
    fixable: null,
    schema: [],
    messages: {
      // ...
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    // ...

    return utils.defineTemplateBodyVisitor(context, {
      // ...
    })
  }
}
`
  )
  fs.writeFileSync(
    testFile,
    `const RuleTester = require('eslint').RuleTester
const rule = require('../../lib/rules/${ruleId}')

const tester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    ecmaVersion: 2020,
    sourceType: 'module',
    parserOptions: {
      templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
    }
  }
})

tester.run('${ruleId}', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: \`<template lang="pug">

</template>\`
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: \`<template lang="pug">

</template>\`,
      errors: [
        {
          message: '...',
          line: 'line',
          column: 'col'
        },
      ]
    }
  ]
})
`
  )
  fs.writeFileSync(
    docFile,
    `---
pageClass: rule-details
sidebarDepth: 0
title: vue/${ruleId}
description: xxx
---
# vue/${ruleId}

> xxx

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

## :book: Rule Details

This rule ....

<eslint-code-block :rules="{'vue/${ruleId}': ['error']}">

\`\`\`vue
<template lang="pug">

</template>
\`\`\`

</eslint-code-block>

## :wrench: Options

Nothing.

`
  )

  cp.execSync(`code "${ruleFile}"`)
  cp.execSync(`code "${testFile}"`)
  cp.execSync(`code "${docFile}"`)
})(process.argv[2])
