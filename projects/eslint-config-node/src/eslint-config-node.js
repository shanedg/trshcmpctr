import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    languageOptions: {
      /**
       * Node.js >=24.11.1 supports virtually all features ES2025 and below:
       * <https://node.green/#ES2025>
       */
      ecmaVersion: 2025,
      globals: globals.nodeBuiltin,
    },
    name: 'Recommended Node',
    settings: {
      node: {
        /**
         * Minimum supported Node.js version.
         * eslint-plugin-n uses this setting to determine which features are supported:
         * <https://github.com/eslint-community/eslint-plugin-n/blob/v18.2.1/README.md>
         */
        version: '>=24.18.0',
      },
    },
  },
]);
