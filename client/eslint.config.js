import { defineConfig } from 'eslint/config';
import cypressPlugin from 'eslint-plugin-cypress';
import node from 'eslint-plugin-n';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';

import eslintConfig from '@trshcmpctr/eslint-config';
import eslintConfigJest from '@trshcmpctr/eslint-config-jest';
import eslintConfigReact from '@trshcmpctr/eslint-config-react';
import eslintConfigTypescript from '@trshcmpctr/eslint-config-typescript';

/**
 * import/no-unresolved cannot parse commonjs subpath exports
 * but can still report whether ignored modules are located:
 * See [rules/no-unresolved.md#ignore](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md#ignore)
 */
const patternsToIgnoreResolve = [
  'eslint/config',
];

const esmConfigFiles = [
  './eslint.config.js',
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
    extends: [node.configs['flat/recommended-script']],
    files: ['**/*.cjs'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
    },
    name: 'Recommended CJS',
    rules: {
      // Redundant with import/no-unresolved and not as robust
      'n/no-missing-require': 'off',
    },
  },
  {
    extends: [node.configs['flat/recommended-module']],
    files: esmConfigFiles,
    languageOptions: {
      globals: globals.nodeBuiltin,
    },
    name: 'Recommended ESM',
    rules: {
      // Redundant with import/no-unresolved and not as robust
      'n/no-missing-import': 'off',
    },
  },
  {
    extends: [eslintConfig],
    name: 'Recommended All',
    rules: {
      'import/no-unresolved': ['error', {
        ignore: [
          ...patternsToIgnoreResolve,
        ],
      }],
    },
    languageOptions: {
      /**
       * Node 20.19.5 supports 100% of ES2023 features,
       * only some of 2024, and very little of 2025.
       * See <https://node.green/#ES2023>
       */
      ecmaVersion: 2023,
    }
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
