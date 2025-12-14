const { defineConfig } = require('eslint/config');
const eslintJsxA11y = require('eslint-plugin-jsx-a11y');
const eslintReact = require('eslint-plugin-react');
const eslintReactHooks = require('eslint-plugin-react-hooks');

/**
 * ESLint config for React in JavaScript projects.
 */
module.exports = defineConfig([
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
