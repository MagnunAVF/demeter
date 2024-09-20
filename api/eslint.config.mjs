import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { ignores: ['./node_modules/*', './dist/*'] },
  { files: ['**/*.ts'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      'public/',
      'jest.config.js',
    ],
  },
  ...tseslint.configs.recommended,
]
