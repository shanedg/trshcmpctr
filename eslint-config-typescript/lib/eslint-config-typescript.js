const { defineConfig } = require('eslint/config');
const imports = require('eslint-plugin-import');
const tseslint = require('typescript-eslint');

/**
 * ESLint config for TypeScript in JavaScript projects.
 */
module.exports = defineConfig([
  {
    extends: [
      imports.flatConfigs.typescript,
      // There is a performance cost for rules applied by recommended-requiring-type-checking.
      // The folks behind `typescript-eslint` suggest it's worth it: https://typescript-eslint.io/getting-started/typed-linting/#performance
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: [
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // Only allow @ts-expect-error directive and require a description
      '@typescript-eslint/ban-ts-comment': ['error', {
        minimumDescriptionLength: 5,
        'ts-check': false,
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': false,
        'ts-nocheck': false,
      }],
      // Warn on unused variables unless underscore-prefixed arguments.
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  }
]);
