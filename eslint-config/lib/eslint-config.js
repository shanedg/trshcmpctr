/**
 * Base ESLint config for JavaScript projects
 */
module.exports = {
  extends: [
    // To see what rules are in the recommended set: https://eslint.org/docs/rules/
    'eslint:recommended',
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
    'plugin:eslint-comments/recommended',
    // https://www.npmjs.com/package/eslint-plugin-import
    // Extending this plugin also sets parserOptions.sourceType = 'module'
    'plugin:import/recommended',
  ],
  plugins: [
    'eslint-plugin-eslint-comments',
    'eslint-plugin-import',
  ],

  // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
  env: {
    es6: true, // enable all ECMAScript 6 *features* except for modules
    es2022: true, // adds all ECMAScript 2022 globals and automatically sets the ecmaVersion parser option to 13

    /**
     * The base environment is assumed to be Node.
     * Use overrides for source files that will run in the browser.
     */
    node: true, // Node variables and scoping
  },

  // https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options
  parserOptions: {
    /**
     * parserOptions.ecmaVersion is automatically set by env.es20XX.
     * e.g. env.es2022: true -> parserOptions.ecmaVersion: 13 // (same as '2022')
     *
     * This config will typically lint projects with the Active LTS version of Node;
     * so always use the most recently supported ECMAScript syntax.
     *
     * Missing globals or unsupported syntax in a Node development environment should manifest as build errors.
     * For source files that will run in other environments i.e. browsers,
     * override env and parserOptions.ecmaVersion with a more conservative version.
     */
    ecmaVersion: 'latest',
  },

  // Only include rules that will make sense in both Node and browser environments
  rules: {
    // Directives require a description separated by ' -- '
    'eslint-comments/require-description': ['error'],
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    // Warn on unused variables unless underscore-prefixed arguments
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    semi: ['warn', 'always'],
    // Allow double quotes if they avoid escaping single quotes
    quotes: ['warn', 'single', { avoidEscape: true }],
    // Enforce import order & grouping
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
  },

  settings: {
    // Module paths prefixed with @trshcmpctr/ are local monorepo packages
    'import/internal-regex': '^@trshcmpctr/',
  },
};
