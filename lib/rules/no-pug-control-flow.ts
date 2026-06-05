import type { Rule } from 'eslint'
import utils from '../utils.ts'

const ILLEGAL_TOKEN_TYPES: Record<string, string> = {
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

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow pug control flow features',
      // @ts-expect-error eslint-plugin-vue uses non-standard `categories`
      categories: ['vue3-strongly-recommended', 'vue2-strongly-recommended'],
      url: 'https://eslint-plugin-vue-pug.rash.codes/rules/no-pug-control-flow.html'
    },
    fixable: undefined,
    schema: [],
    messages: {
      forbiddenControlFlow: 'Using pug {{ type }} is forbidden.'
    }
  },
  create(context) {
    return utils.defineTemplateBodyVisitor(
      context,
      {},
      {
        Program(node: any) {
          const tokens = node.templateBody && node.templateBody.tokens
          if (!tokens) return
          const illegalTokens = tokens.filter(
            (token: { type: string }) => ILLEGAL_TOKEN_TYPES[token.type]
          )
          for (const token of illegalTokens) {
            context.report({
              loc: token.loc,
              messageId: 'forbiddenControlFlow',
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

export default rule
