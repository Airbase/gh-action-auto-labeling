const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

module.exports = [
  { ignores: ['dist/', 'node_modules/', 'coverage/'] },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json' },
      globals: { ...globals.node, ...globals.jest },
    },
    plugins: { jest },
    rules: {
      'no-console': 'off',
      'object-shorthand': 'error',
      'prefer-destructuring': 'error',
    },
  },
  { files: ['**/*.js'], languageOptions: { globals: globals.node } },
  prettier,
];
