import { defineConfig } from 'eslint/config';
import node from 'eslint-plugin-n';
import globals from 'globals';

import eslintConfig from './lib/eslint-config.js';

const { configs: nodeConfigs } = node;

export default defineConfig([
  {
    extends: [
      /**
       * Some configuration is duplicated from @trshcmpctr/eslint-config-node.
       * This config cannot use @trshcmpctr/eslint-config-node
       * because this package is a dev dependency in eslint-config-node
       * and both depending on each other would create a cyclic dependency.
       * Cyclic dependencies are supported in Rush with the "decoupledLocalDependencies"
       * property in rush.json but this depends on installing the latest
       * published release from npm and publishing is not enabled in this repository.
       */
      nodeConfigs['flat/recommended-module'],
      // It lints itself :)
      eslintConfig,
    ],
    files: ['**/*.js'],
    languageOptions: {
      /**
       * Node 20.19.5 supports 100% of ES2023 features,
       * only some of 2024, and very little of 2025.
       * See <https://node.green/#ES2023>
       */
      ecmaVersion: 2023,
      globals: globals.nodeBuiltin,
    },
    rules: {
      // Node default resolution requires extensions for relative imports
      'import/extensions': ['error', 'ignorePackages'],
      'import/no-unresolved': ['error', {
        /**
         * import/no-unresolved cannot parse commonjs subpath exports
         * but can still report whether ignored modules are located:
         * See [rules/no-unresolved.md#ignore](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md#ignore)
         */
        ignore: [
          'eslint/config',
        ],
      }],
    },
  },
]);
