import meta from './meta.ts'
import componentNameInTemplateCasing from './rules/component-name-in-template-casing.ts'
import noParsingError from './rules/no-parsing-error.ts'
import noPugControlFlow from './rules/no-pug-control-flow.ts'

export default {
  meta,
  rules: {
    'component-name-in-template-casing': componentNameInTemplateCasing,
    'no-parsing-error': noParsingError,
    'no-pug-control-flow': noPugControlFlow
  }
}
