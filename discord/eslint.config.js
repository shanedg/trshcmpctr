import { defineConfig } from 'eslint/config';
import avaConfig from 'eslint-plugin-ava';
import cypressConfig from 'eslint-plugin-cypress';
import node from 'eslint-plugin-n';
import globals from 'globals';

import eslintConfig from '@trshcmpctr/eslint-config';

/**
 * eslint-plugin-import default resolver does not support subpath exports but
 * import/no-unresolved can still report whether ignored modules are _located_,
 * even when they can't be parsed for exports:
 * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md#ignore
 */
const patternsToIgnoreResolve = [
  '@trshcmpctr/client/paths',
  'ava',
  'eslint/config',
  'lowdb/node',
];

export default defineConfig([
  {
    extends: [node.configs['flat/recommended-module']],
    languageOptions: {
      globals: globals.nodeBuiltin,
    },
    name: 'Recommended Node',
    rules: {
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
    extends: [eslintConfig],
    name: 'Recommended All',
    languageOptions: {
      /**
       * Import attributes are supported in 20.10.0
       * but eslint will only parse them starting in 2025.
       * <https://nodejs.org/api/esm.html#import-attributes>
       */
      ecmaVersion: 2025,
    },
    rules: {
      // Default node resolution requires extensions for relative imports
      'import/extensions': ['error', 'ignorePackages'],
      'import/no-unresolved': ['error', {
        ignore: [
          ...patternsToIgnoreResolve,
        ],
      }],
    },
  },
  {
    extends: [avaConfig.configs['flat/recommended']],
    files: ['*.test.js'],
    name: 'Recommended Ava',
  },

  {
    extends: [cypressConfig.configs.recommended],
    files: ['cypress/**'],
    name: 'Recommended Cypress',
    rules: {
      'import/extensions': 'off',
    },
  },
]);
