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
       * Node 24.16.8 supports virtually all features ES2025 and below,
       * See <https://node.green/#ES2023>
       */
      ecmaVersion: 2025,
      globals: globals.nodeBuiltin,
    },
    name: 'Recommended Node ESM Only',
    rules: {
      // Redundant with import/no-unresolved and not as robust
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/node-builtins': ['error', {
        ignores: [
          // Support experimental fetch until stable in Node >=21:
          // https://nodejs.org/docs/latest-v20.x/api/globals.html#fetch
          'fetch',
        ],
      }],
    },
  },
]);
