/**
 * Default @commitlint/config-conventional type-enum values as of 2025/12/12:
 * https://commitlint.js.org/reference/rules.html#type-enum
 */
const defaultTypEnumValue = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];

const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      ...defaultTypEnumValue,
      /**
       * Not necessarily atomic but a logical piece of a larger set of changes
       */
      'progress',
    ]],
  },
  /**
   * Default ignores consist of matchers like:
   * - 'Merge pull request', 'Merge X into Y' or 'Merge branch X'
   * - 'Revert X'
   * - 'v1.2.3' (ie semver matcher)
   * - 'Automatic merge X' or 'Auto-merged X into Y'
   * To see full list, check https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/is-ignored/src/defaults.ts.
   */
  defaultIgnores: true,
};

export default Configuration;
