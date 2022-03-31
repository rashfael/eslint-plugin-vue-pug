const RuleTester = require('eslint').RuleTester
const rule = require('../../lib/rules/no-pug-control-flow')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' }
  }
})

tester.run('no-pug-control-flow', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div(v-if="foo"): bar {{ 3 - 4 }}
</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">
- var foo = 'bar'
</template>`,
      errors: [
        {
          message: 'Using pug inline javascript code is forbidden.',
          line: 2,
          column: 1
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
#user
  if user.description
    h2.green Description
    p.description= user.description
  else if authorised
    h2.blue Description
    p.description.
      User has no description,
      why not add one...
  else
    h2.red Description
    p.description User has no description
</template>`,
      errors: [
        {
          message: 'Using pug if statements is forbidden.',
          line: 3,
          column: 3
        },
        {
          message: 'Using pug inline javascript code is forbidden.',
          line: 5,
          column: 18
        },
        {
          message: 'Using pug else if statements is forbidden.',
          line: 6,
          column: 3
        },
        {
          message: 'Using pug else statements is forbidden.',
          line: 11,
          column: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
case friends
  when 0
    p you have no friends
  when 1
    p you have a friend
  default
    p you have a lot of friends
</template>`,
      errors: [
        {
          message: 'Using pug case statements is forbidden.',
          line: 2,
          column: 1
        },
        {
          message: 'Using pug when statements is forbidden.',
          line: 3,
          column: 3
        },
        {
          message: 'Using pug when statements is forbidden.',
          line: 5,
          column: 3
        },
        {
          message: 'Using pug default when statements is forbidden.',
          line: 7,
          column: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
ul
  each val in values
    li= val
  else
    li There are no values
ul
  for val in values
    li= val
ul
  while n < 4
    li= n++
</template>`,
      errors: [
        {
          message: 'Using pug each loops is forbidden.',
          line: 3,
          column: 3
        },
        {
          message: 'Using pug inline javascript code is forbidden.',
          line: 4,
          column: 7
        },
        {
          message: 'Using pug else statements is forbidden.',
          line: 5,
          column: 3
        },
        {
          message: 'Using pug each loops is forbidden.',
          line: 8,
          column: 3
        },
        {
          message: 'Using pug inline javascript code is forbidden.',
          line: 9,
          column: 7
        },
        {
          message: 'Using pug while loops is forbidden.',
          line: 11,
          column: 3
        },
        {
          message: 'Using pug inline javascript code is forbidden.',
          line: 12,
          column: 7
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  include includes/head.pug
</template>`,
      errors: [
        {
          message: 'Using pug includes is forbidden.',
          line: 3,
          column: 3
        },
        {
          message: 'Using pug paths is forbidden.',
          line: 3,
          column: 11
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
extends layout.pug

block scripts
  script(src='/jquery.js')
  script(src='/pets.js')
</template>`,
      errors: [
        {
          message: 'Using pug extends is forbidden.',
          line: 2,
          column: 1
        },
        {
          message: 'Using pug paths is forbidden.',
          line: 2,
          column: 9
        },
        {
          message: 'Using pug blocks is forbidden.',
          line: 4,
          column: 1
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
p This is #{msg.toUpperCase()}
</template>`,
      errors: [
        {
          message: 'Using pug interpolations is forbidden.',
          line: 2,
          column: 11
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
mixin pet(name)
  li.pet= name
ul
  +pet('cat')
  +pet('dog')
  +pet('pig')
</template>`,
      errors: [
        {
          message: 'Using pug mixins is forbidden.',
          line: 2,
          column: 1
        },
        {
          message: 'Using pug inline javascript code is forbidden.',
          line: 3,
          column: 9
        },
        {
          message: 'Using pug mixin calls is forbidden.',
          line: 5,
          column: 3
        },
        {
          message: 'Using pug mixin calls is forbidden.',
          line: 6,
          column: 3
        },
        {
          message: 'Using pug mixin calls is forbidden.',
          line: 7,
          column: 3
        }
      ]
    }
  ]
})

// TODO
// Unescaped Attributes ?
