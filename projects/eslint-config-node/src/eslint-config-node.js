import { defineConfig } from 'eslint/config';
import node from 'eslint-plugin-n';
import globals from 'globals';

const { configs: nodeConfigs } = node;

export default defineConfig([
  {
    extends: [
      nodeConfigs['flat/recommended-module'],
    ],
    languageOptions: {
      /**
       * Node.js >=24.11.1 supports virtually all features ES2025 and below:
       * <https://node.green/#ES2025>
       */
      ecmaVersion: 2025,
      globals: globals.nodeBuiltin,
    },
    name: 'Recommended Node ESM Only',
    rules: {
      // Redundant with import/no-unresolved and not as robust
      'n/no-missing-import': 'off',
    },
    settings: {
      node: {
        /**
         * Minimum supported Node.js version.
         * eslint-plugin-n uses this setting to determine which features are supported:
         * <https://github.com/eslint-community/eslint-plugin-n/blob/v18.2.1/README.md>
         */
        version: '>=24.19.0',
      },
    },
  },
]);
