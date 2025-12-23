import { defineConfig } from 'eslint/config';
import eslintJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';

/**
 * ESLint config for React in JavaScript projects.
 */
export default defineConfig([
  {
    extends: [
      eslintReactHooks.configs.flat.recommended,
    ],
    files: ['**/*.ts'],
    name: 'Only Hooks',
  },
  {
    extends: [
      eslintReact.configs.flat.recommended,
      eslintReact.configs.flat['jsx-runtime'],
      eslintReactHooks.configs.flat.recommended,
      eslintJsxA11y.flatConfigs.recommended,
    ],
    files: ['**/*.tsx'],
    name: 'JSX',
    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
  },
]);
