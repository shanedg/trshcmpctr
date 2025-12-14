const { defineConfig } = require('eslint/config');
const cypressPlugin = require('eslint-plugin-cypress/flat');
const node = require('eslint-plugin-n');
const testingLibraryPlugin = require('eslint-plugin-testing-library');
const globals = require('globals');

const eslintConfig = require('@trshcmpctr/eslint-config');
const jestConfig = require('@trshcmpctr/eslint-config-jest');
const reactConfig = require('@trshcmpctr/eslint-config-react');
const tsConfig = require('@trshcmpctr/eslint-config-typescript');

module.exports = defineConfig([
  eslintConfig,
  tsConfig,
  reactConfig,
  jestConfig,
  {
    ignores: [
      'coverage',
      'dist',
      'lib',
      'node_modules',
    ],
  },
  {
    extends: [node.configs['flat/recommended-script']],
    files: ['**/*.cjs'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
    },
    name: 'All CJS config files',
  },
  {
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    name: 'All browser files',
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    extends: [
      testingLibraryPlugin.configs['flat/react'],
    ],
    name: 'All React test files',
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    name: 'All Typescript test files',
    rules: {
      // Add support for understanding when it's ok to pass an
      // unbound method to jest expect calls:
      // https://github.com/jest-community/eslint-plugin-jest/blob/c5819965e3e8c8dd8c938d2921b1e9629981bdb7/docs/rules/unbound-method.md
      '@typescript-eslint/unbound-method': 'off',
      // Note, this rule needs type information
      'jest/unbound-method': 'error',
    }
  },
  {
    extends: [cypressPlugin.configs.recommended],
    files: [
      'cypress/e2e/**/*.cy.ts',
    ],
    name: 'All Cypress test files',
  },
]);
