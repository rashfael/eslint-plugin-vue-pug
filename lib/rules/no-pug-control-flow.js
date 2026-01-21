const utils = require('eslint-plugin-vue/dist/utils')

const ILLEGAL_TOKEN_TYPES = {
  PugCode: 'inline javascript code',
  PugIf: 'if statements',
  PugElse: 'else statements',
  PugElseIf: 'else if statements',
  PugCase: 'case statements',
  PugWhen: 'when statements',
  PugDefault: 'default when statements',
  PugEach: 'each loops',
  PugWhile: 'while loops',
  PugInclude: 'includes',
  PugPath: 'paths',
  PugExtends: 'extends',
  PugBlock: 'blocks',
  PugInterpolatedCode: 'interpolations',
  PugMixin: 'mixins',
  PugCall: 'mixin calls'
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow pug control flow features.',
      categories: ['vue3-strongly-recommended', 'vue2-strongly-recommended'],
      url: 'https://eslint-plugin-vue-pug.rash.codes/rules/no-pug-control-flow.html'
    },
    fixable: null,
    schema: [],
    messages: {
      // ...
    }
  },
  create(context) {
    return utils.defineTemplateBodyVisitor(
      context,
      {},
      {
        Program(node) {
          const tokens = node.templateBody && node.templateBody.tokens
          if (!tokens) return
          const illegalTokens = tokens.filter(
            (token) => ILLEGAL_TOKEN_TYPES[token.type]
          )
          for (const token of illegalTokens) {
            context.report({
              loc: token.loc,
              message: 'Using pug {{ type }} is forbidden.',
              data: {
                type: ILLEGAL_TOKEN_TYPES[token.type]
              }
            })
          }
        }
      }
    )
  }
}
