import { defineConfig } from 'eslint/config';
import node from 'eslint-plugin-n';
import globals from 'globals';

import eslintConfig from '@trshcmpctr/eslint-config';

/**
 * eslint-plugin-import does not resolve subpath exports
 * but import/no-unresolved can still report whether ignored modules are _located_.
 * <https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md#ignore>
 */
const patternsToIgnoreResolution = [
  'eslint/config',
];

export default defineConfig([
  {
    extends: [node.configs['flat/recommended-module']],
    languageOptions: {
      /**
       * Node 20.19.5 supports 100% of ES2023 features,
       * only some of 2024, and very little of 2025.
       * See <https://node.green/#ES2023>
       */
      ecmaVersion: 2023,
      globals: globals.nodeBuiltin,
    },
  },
  {
    extends: [eslintConfig],
    name: 'Recommended All',
    rules: {
      // Default node resolution requires extensions for relative imports
      'import/extensions': ['error', 'ignorePackages'],
      'import/no-unresolved': ['error', {
        ignore: [
          ...patternsToIgnoreResolution,
        ],
      }],
    },
  },
]);
