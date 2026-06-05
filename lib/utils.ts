import utilsModule from 'eslint-plugin-vue/dist/utils'

/**
 * `eslint-plugin-vue/dist/utils` exposes its whole API behind a single `default`
 * getter (`module.exports = { default: utils }`) with no `__esModule` marker and
 * no named exports. The toolchains we run under interop a default import of it
 * differently:
 *   - Vite/Vitest (tests, runs the TS source) unwraps the lone default, so the
 *     import already IS the utils object.
 *   - tsdown/rolldown (builds dist/, consumed via npm link) does not unwrap, so
 *     the import is `{ default: utils }`.
 * Normalizing here makes `utils` resolve to the real utils object under both.
 */
const utils: typeof utilsModule = (utilsModule as any).default ?? utilsModule

export default utils
