import { defineConfig } from 'eslint/config';
import cypressPlugin from 'eslint-plugin-cypress';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';

import eslintConfig from '@trshcmpctr/eslint-config';
import eslintConfigJest from '@trshcmpctr/eslint-config-jest';
import eslintConfigNodeCjs from '@trshcmpctr/eslint-config-node/cjs';
import eslintConfigNodeEsm from '@trshcmpctr/eslint-config-node/esm';
import eslintConfigReact from '@trshcmpctr/eslint-config-react';
import eslintConfigTypescript from '@trshcmpctr/eslint-config-typescript';

const esmConfigFiles = [
  './eslint.config.js',
  './webpack.config.js',
  'cypress/**',
];

export default defineConfig([
  {
    ignores: [
      'coverage',
      'dist',
      'lib',
      'node_modules',
    ],
  },
  {
    extends: [eslintConfigNodeCjs],
    files: ['**/*.cjs'],
    name: 'Recommended CJS',
  },
  {
    extends: [eslintConfigNodeEsm],
    files: esmConfigFiles,
    name: 'Recommended ESM',
    rules: {
      'import/no-unresolved': ['error', {
        /**
         * import/no-unresolved cannot parse subpath exports
         * but can still report if ignored modules are not found:
         * See [rules/no-unresolved.md#ignore](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md#ignore)
         */
        ignore: [
          '@trshcmpctr/eslint-config-node',
          'eslint/config',
        ],
      }],
    },
  },
  {
    extends: [eslintConfig],
    // Already applied above
    ignores: [
      ...esmConfigFiles,
      '**/*.cjs',
    ],
    name: 'Recommended All',
  },
  {
    extends: [eslintConfigTypescript],
    files: [
      '**/*.ts',
      '**/*.tsx',
    ],
    name: 'Recommended Typescript',
    rules: {
      // Redundant with TS checks
      'import/no-unresolved': 'off',
    },
  },
  {
    extends: [eslintConfigReact],
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    languageOptions: {
      // Browser code is transpiled by babel so it's ok to use the latest features
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    name: 'All browser files',
  },
  {
    extends: [
      eslintConfigJest,
      testingLibraryPlugin.configs['flat/react'],
    ],
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    name: 'Typescript + React Test Recommended',
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
      'cypress/**',
    ],
    name: 'Recommended Cypress',
    rules: {
      // Typescript resolution doesn't need extensions
      'import/extensions': 'off',
    },
  },
]);
