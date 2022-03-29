
// https://html.spec.whatwg.org/multipage/parsing.html#parse-errors
const DEFAULT_OPTIONS = Object.freeze(
  Object.assign(Object.create(null), {
    // lexer
    ASSERT_FAILED: true, // does not seem to be used?
    SYNTAX_ERROR: true, // part of pug logic, ignore for now
    INCORRECT_NESTING: true,
    NO_END_BRACKET: true,
    BRACKET_MISMATCH: true,
    INVALID_ID: true,
    INVALID_CLASS_NAME: true,
    NO_EXTENDS_PATH: true,
    MALFORMED_EXTENDS: true,
    NO_INCLUDE_PATH: true,
    MALFORMED_INCLUDE: true,
    NO_CASE_EXPRESSION: true,
    NO_WHEN_EXPRESSION: true,
    DEFAULT_WITH_EXPRESSION: true,
    ELSE_CONDITION: true,
    NO_WHILE_EXPRESSION: true,
    MALFORMED_EACH: true,
    MALFORMED_EACH_OF_LVAL: true,
    INVALID_KEY_CHARACTER: true,
    INVALID_INDENTATION: true,
    INCONSISTENT_INDENTATION: true,
    UNEXPECTED_TEXT: true,
    // parser
    INVALID_TOKEN: true,
    BLOCK_IN_BUFFERED_CODE: true,
    BLOCK_OUTISDE_MIXIN: true,
    RAW_INCLUDE_BLOCK: true,
    MIXIN_WITHOUT_BODY: true
  })
)

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow parsing errors in `<template lang="pug">`',
      categories: ['vue3-essential', 'essential'],
      url: 'https://eslint.vuejs.org/rules/no-parsing-error.html',
      dropIn: true
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: Object.keys(DEFAULT_OPTIONS).reduce((ret, code) => {
          ret[code] = { type: 'boolean' }
          return ret
        }, /** @type { { [key: string]: { type: 'boolean' } } } */ ({})),
        additionalProperties: false
      }
    ]
  },

  /**
   * @param {RuleContext} context - The rule context.
   * @returns {RuleListener} AST event handlers.
   */
  create(context) {
    const options = Object.assign({}, DEFAULT_OPTIONS, context.options[0] || {})

    return {
      Program(program) {
        const node = program.templateBody
        if (node == null || node.errors == null) {
          return
        }

        for (const error of node.errors) {
          if (error.code && !options[error.code]) {
            continue
          }
          context.report({
            node,
            loc: { line: error.lineNumber, column: error.column },
            message: 'Parsing error: {{message}}.',
            data: {
              message: error.message.endsWith('.')
                ? error.message.slice(0, -1)
                : error.message
            }
          })
        }
      }
    }
  }
}
