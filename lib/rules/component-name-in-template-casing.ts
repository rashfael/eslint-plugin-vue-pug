/**
 * @author Yosuke Ota
 * issue https://github.com/vuejs/eslint-plugin-vue/issues/250
 */
import type { Rule } from 'eslint'
import utils from '../utils.ts'
import {
  getChecker,
  getExactConverter,
  pascalCase
} from 'eslint-plugin-vue/dist/utils/casing'
import {
  toRegExpGroupMatcher,
  isRegExp
} from 'eslint-plugin-vue/dist/utils/regexp'

const allowedCaseOptions = ['PascalCase', 'kebab-case']
const defaultCase = 'PascalCase'

function isTypeOnlyImport(variable: any): boolean {
  if (variable.defs.length === 0) return false

  return variable.defs.every((def: any) => {
    if (def.type !== 'ImportBinding') {
      return false
    }
    if (def.parent.importKind === 'type') {
      return true
    }
    if (def.node.type === 'ImportSpecifier' && def.node.importKind === 'type') {
      return true
    }
    return false
  })
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'enforce specific casing for the component naming style in template',
      // @ts-expect-error eslint-plugin-vue uses non-standard `categories`
      categories: undefined,
      url: 'https://eslint-plugin-vue-pug.rash.codes/rules/component-name-in-template-casing.html'
    },
    fixable: 'code',
    schema: [
      {
        enum: allowedCaseOptions
      },
      {
        type: 'object',
        properties: {
          globals: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true
          },
          ignores: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
            additionalItems: false
          },
          registeredComponentsOnly: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      incorrectCase: 'Component name "{{name}}" is not {{caseType}}.'
    }
  },
  create(context) {
    const caseOption = context.options[0] as string
    const options = (context.options[1] as any) || {}
    const caseType = allowedCaseOptions.includes(caseOption)
      ? caseOption
      : defaultCase
    const isIgnored = toRegExpGroupMatcher(options.ignores)

    const globalStrings: string[] = []
    const globalPatterns: string[] = []
    for (const global of options.globals || []) {
      if (isRegExp(global)) {
        globalPatterns.push(global)
      } else {
        globalStrings.push(global)
      }
    }

    const isGlobalPattern = toRegExpGroupMatcher(globalPatterns)
    const registeredComponentsOnly = options.registeredComponentsOnly !== false
    const sourceCode = context.sourceCode
    const tokens =
      sourceCode.parserServices.getTemplateBodyTokenStore &&
      sourceCode.parserServices.getTemplateBodyTokenStore()

    const registeredComponents = new Set<string>(globalStrings.map(pascalCase))

    if (utils.isScriptSetup(context)) {
      const globalScope = sourceCode.scopeManager.globalScope
      if (globalScope) {
        const moduleScope = globalScope.childScopes.find(
          (scope: any) => scope.type === 'module'
        )
        for (const variable of (moduleScope && moduleScope.variables) || []) {
          if (!isTypeOnlyImport(variable)) {
            registeredComponents.add(variable.name)
          }
        }
      }
    }

    function isVerifyTarget(node: any): boolean {
      if (isIgnored(node.rawName)) {
        return false
      }

      if (
        (!utils.isHtmlElementNode(node) &&
          !utils.isSvgElementNode(node) &&
          !utils.isMathElementNode(node)) ||
        utils.isHtmlWellKnownElementName(node.rawName) ||
        utils.isSvgWellKnownElementName(node.rawName) ||
        utils.isMathWellKnownElementName(node.rawName) ||
        utils.isVueBuiltInElementName(node.rawName)
      ) {
        return false
      }

      if (!registeredComponentsOnly) {
        return true
      }

      return (
        registeredComponents.has(pascalCase(node.rawName)) ||
        isGlobalPattern(node.rawName)
      )
    }

    let hasInvalidEOF = false

    return utils.defineTemplateBodyVisitor(
      context,
      {
        VElement(node: any) {
          if (hasInvalidEOF) {
            return
          }

          if (!isVerifyTarget(node)) {
            return
          }

          const name = node.rawName
          if (!getChecker(caseType)(name)) {
            const startTag = node.startTag
            const open = tokens.getFirstToken(startTag)
            const casingName = getExactConverter(caseType)(name)
            context.report({
              node: open,
              loc: open.loc,
              messageId: 'incorrectCase',
              data: {
                name,
                caseType
              },
              *fix(fixer) {
                yield fixer.replaceText(open, `${casingName}`)
              }
            })
          }
        }
      },
      {
        Program(node: any) {
          hasInvalidEOF = utils.hasInvalidEOF(node)
        },
        ...(registeredComponentsOnly
          ? utils.executeOnVue(context, (obj: any) => {
              for (const n of utils.getRegisteredComponents(obj)) {
                registeredComponents.add(n.name)
              }
            })
          : {})
      }
    )
  }
}

export default rule
