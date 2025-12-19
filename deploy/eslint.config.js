import { defineConfig } from 'eslint/config';
import node from 'eslint-plugin-n';

import eslintConfig from '@trshcmpctr/eslint-config';

const { configs: nodeConfigs } = node;

/**
 * eslint-plugin-import does not resolve subpath exports
 * but import/no-unresolved can still report whether ignored modules are _located_.
 * <https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md#ignore>
 */
const patternsToIgnoreResolution = [
  'eslint/config',
];

export default defineConfig([
  nodeConfigs['flat/recommended-module'],
  {
    extends: [eslintConfig],
    languageOptions: {
      /**
       * Node 20.19.5 supports 100% of ES2023 features,
       * only some of 2024, and very little of 2025.
       * See <https://node.green/#ES2023>
       *
       * Import attributes are supported in 20.10.0
       * but eslint will only parse them starting in 2025.
       * <https://nodejs.org/api/esm.html#import-attributes>
       */
      ecmaVersion: 2025,
    },
    name: 'Recommended All',
    rules: {
      // Node default resolution requires extensions for relative imports
      'import/extensions': ['error', 'ignorePackages'],
      'import/no-unresolved': ['error', {
        ignore: [
          ...patternsToIgnoreResolution,
        ],
      }],
    },
  },
]);
