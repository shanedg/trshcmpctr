const { defineConfig } = require('eslint/config');
const eslintJest = require('eslint-plugin-jest');
const globals = require('globals');

/**
 * ESLint config for Jest tests in JavaScript projects.
 */
module.exports = defineConfig([
  {
    extends: [eslintJest.configs['flat/recommended']],
    files: [
      '**/*.test.cjs',
      '**/*.test.js',
      '**/*.test.jsx',
      '**/*.test.mjs',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    rules: {
      'jest/consistent-test-it': ['error'],
      'quotes': ['warn', 'single',  {
        // Jest inline snapshots use backticks so snapshots that span only 1 line generate warnings.
        allowTemplateLiterals: true,
        // Allow double quotes if they avoid escaping single quotes.
        avoidEscape: true,
      }],
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
    },
  },
]);
