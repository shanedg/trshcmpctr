import { defineConfig } from 'eslint/config';
import eslintJest from 'eslint-plugin-jest';
import globals from 'globals';

/**
 * ESLint config for Jest tests in JavaScript projects.
 */
export default defineConfig([
  {
    extends: [eslintJest.configs['flat/recommended']],
    files: [
      '**/*.test.js',
      '**/*.test.jsx',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    rules: {
      'jest/consistent-test-it': ['error'],
      'quotes': ['warn', 'single',  {
        // Jest inline snapshots use backticks so snapshots that span only 1 line generate warnings.
        allowTemplateLiterals: true,
        // Allow double quotes if they avoid escaping single quotes.
        avoidEscape: true,
      }],
    },
    languageOptions: {
      globals: globals.jest,
    },
  },
]);
