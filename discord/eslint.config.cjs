const { defineConfig } = require('eslint/config');
const avaConfig = require('eslint-plugin-ava');
const cypressConfig = require('eslint-plugin-cypress');
const node = require('eslint-plugin-n');
const globals = require('globals');

const eslintConfig = require('@trshcmpctr/eslint-config').default;

/**
 * eslint-plugin-import default resolver does not support subpath exports but
 * import/no-unresolved can still report whether ignored modules are _located_,
 * even when they can't be parsed for exports
 */
const patternsToIgnoreResolution = [
  '@trshcmpctr/client/paths',
  'ava',
  'eslint/config',
  'lowdb/node',
];

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
      'import/no-unresolved': ['error', {
        ignore: [
          ...patternsToIgnoreResolution,
        ],
      }],
      'n/no-unsupported-features/node-builtins': ['error', {
        ignores: [
          // Support experimental fetch until stable in Node >=21:
          // https://nodejs.org/docs/latest-v20.x/api/globals.html#fetch
          'fetch',
        ],
      }],
      
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
