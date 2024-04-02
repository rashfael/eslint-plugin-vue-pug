// @ts-check
'use strict'
const legacyPlugin = require('../index.js')
const packageJson = require('../../package.json')
const globals = require('globals')

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

function extractName(path) {
  if (!path) {
    return null
  }
  const parts = path.split('/')
  if (!parts.length) {
    return null
  }
  const baseName = parts.pop()
  if (!baseName) {
    return null
  }
  return baseName.replace(/\..+$/, '')
}

function getExtends(configs) {
  return Object.entries(configs)
    .map(([name, config]) =>
      config.extends ? { [name]: extractName(config.extends) } : {}
    )
    .reduce((acc, obj) => ({ ...acc, ...obj }), {})
}

function omit(obj, key, ...args) {
  if (!key) {
    return obj
  }
  const { [key]: omitted, ...rest } = obj
  omitted
  return omit(rest, ...args)
}

function extend(configs, extended) {
  return Object.entries(extended).reduce(
    (acc, [name, ext]) =>
      extended[ext]
        ? acc
        : {
            ...acc,
            [name]: mergeDeep(configs[ext], omit(configs[name], 'extends'))
          },
    configs
  )
}
function migrateExtends(plugin) {
  const extended = getExtends(plugin.configs)
  if (!Object.keys(extended).length) {
    return plugin
  }
  // console.log(extended)
  return migrateExtends({
    ...plugin,
    configs: extend(plugin.configs, extended)
  })
}

function migrateEnv(env) {
  if (!env) {
    return {}
  }
  return Object.entries(env).reduce(
    (acc, [env, enabled]) => (enabled ? { ...acc, ...globals[env] } : acc),
    {}
  )
}

function migrateParserOptions(parserOptions) {
  if (!parserOptions) {
    return {}
  }
  const { ecmaVersion, sourceType } = parserOptions
  return {
    ecmaVersion,
    sourceType,
    parserOptions: omit(parserOptions, 'ecmaVersion', 'sourceType')
  }
}
function migrateLanguageOptions(plugin) {
  return {
    ...plugin,
    configs: Object.entries(plugin.configs).reduce(
      (acc, [name, config]) => ({
        ...acc,
        [name]: {
          ...omit(config, 'parser', 'parserOptions', 'env'),
          languageOptions: {
            globals: {
              ...(config.globqals || {}),
              ...migrateEnv(config.env)
            },
            ...migrateParserOptions(config.parserOptions),
            ...(config.parser ? { parser: require(config.parser) } : {})
          }
        }
      }),
      plugin.configs
    )
  }
}

function addSelfAsPlugin(plugin, config) {
  if (!config.plugins) {
    return config
  }

  if (config.plugins.length > 1) {
    throw new Error(`Don't know how to handle more than one plugin in config`)
  }

  if (config.plugins[0] !== 'vue-pug') {
    throw new Error(`Don't know how to handle a plugin that isn't myself`)
  }

  return {
    ...config,
    plugins: { 'vue-pug': plugin }
  }
}

const plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version
  },
  configs: {},
  rules: legacyPlugin.rules,
  processors: {}
}

Object.entries(legacyPlugin.configs).forEach(([name, config]) => {
  Object.assign(plugin.configs, { [name]: addSelfAsPlugin(plugin, config) })
})

module.exports = migrateExtends(migrateLanguageOptions(plugin))
