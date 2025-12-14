const js = require('@eslint/js');
const comments = require('@eslint-community/eslint-plugin-eslint-comments/configs');
const { defineConfig } = require('eslint/config');
const imports = require('eslint-plugin-import');

/**
 * Base ESLint config for JavaScript projects
 * Rules should make sense in any environment
 */
module.exports = defineConfig([
  // To see what rules are in the recommended set: https://eslint.org/docs/rules/
  js.configs.recommended,
  // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
  comments.recommended,
  // https://www.npmjs.com/package/eslint-plugin-import
  imports.flatConfigs.recommended,
  {
    files: [
      '**/*.cjs',
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error',
    },
    rules: {
      // Directives require a description separated by ' -- '
      '@eslint-community/eslint-comments/require-description': ['error'],
      'linebreak-style': ['error', 'unix'],
      // Enforce and auto-fix import sorting
      'import/order': ['warn', {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          [
            'parent',
            'index',
            'sibling',
          ],
          'type',
        ],
        'newlines-between': 'always',
      }],
      'indent': ['warn', 2],
      // Warn on unused variables unless underscore-prefixed args
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'semi': ['warn', 'always'],
      // Enforce single quotes unless other quotes avoid escaping
      'quotes': ['warn', 'single', { avoidEscape: true }],
    },
    settings: {
      // Module paths prefixed with @trshcmpctr/ are local projects
      'import/internal-regex': '^@trshcmpctr/',
    },
  },
]);
