import { defineConfig } from 'eslint/config';
import node from 'eslint-plugin-n';
import globals from 'globals';

import eslintConfig from './src/eslint-config.js';

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
    languageOptions: {
      /**
       * Node.js >=24.11.1 supports virtually all features ES2025 and below:
       * <https://node.green/#ES2025>
       */
      ecmaVersion: 2025,
      globals: globals.nodeBuiltin,
    },
  },
]);
