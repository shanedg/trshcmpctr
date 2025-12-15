const { resolve } = require('node:path');

const { defineConfig } = require('eslint/config');
const avaConfig = require('eslint-plugin-ava');
const cypressConfig = require('eslint-plugin-cypress');
const node = require('eslint-plugin-n');
const globals = require('globals');

const eslintConfig = require('@trshcmpctr/eslint-config');

module.exports = defineConfig([
  eslintConfig,
  node.configs['flat/recommended-script'],
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    extends: [node.configs['flat/recommended-module']],
    files: [
      'lib/**',
      'cypress/**'
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
      sourceType: 'module',
    },
    name: 'Node src',
    rules: {
      'n/no-unsupported-features/node-builtins': ['error', {
        ignores: [
          // Support experimental fetch until stable in Node >=21:
          // https://nodejs.org/docs/latest-v20.x/api/globals.html#fetch
          'fetch',
        ],
      }],
    },
    settings: {
      'import/resolver': {
        // Default resolver for eslint-plugin-import doesn't support package.json#exports
        // https://github.com/import-js/eslint-plugin-import/issues/1810
        // but we need that support for at least ava (https://www.npmjs.com/package/ava).
        // We can use a custom resolver built on the resolve.exports package:
        // https://github.com/lukeed/resolve.exports
        // This solution is lifted with modifications from this gist:
        // https://gist.github.com/danielweck/cd63af8e9a8b3492abacc312af9f28fd
        // We can remove this if eslint-plugin-import resolves the above issue.
        // See https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#resolvers.
        [resolve('./eslint-plugin-import-resolver.cjs')]: {},
      },
    },
  },
  {
    extends: [avaConfig.configs['flat/recommended']],
    files: ['*.test.js'],
    name: 'Ava test files',
  },

  {
    extends: [cypressConfig.configs.recommended],
    files: ['cypress/**'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
      sourceType: 'module',
    },
    name: 'Cypress files',
  },
]);
