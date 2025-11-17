const {
  beforeAll,
  describe,
  expect,
  it,
} = require('@jest/globals');
const eslint = require('eslint');

const ESLint = eslint.ESLint;

describe('eslint-config', () => {
  let eslintApi;

  beforeAll(() => {
    eslintApi = new ESLint({
      overrideConfigFile: 'lib/eslint-config.js',
      useEslintrc: false,
    });
  });

  /**
   * Snapshots can be a pain but default configuration options might change in
   * newer versions of eslint or other libraries we extend.
   * 
   * I just want to know if it happens.
   */
  describe('calculated config snapshots', () => {
    let config;

    beforeAll(async () => {
      // This file doesn't actually have to exist and the path doesn't matter
      // since we override the config file and useEslintrc is false.
      config = await eslintApi.calculateConfigForFile('anyFile.js');
    });

    it('env', () => {
      expect(config.env).toMatchSnapshot();
    });

    it('parserOptions', () => {
      expect(config.parserOptions).toMatchSnapshot();
    });

    it('rules', () => {
      expect(config.rules).toMatchSnapshot();
    });
  });
});
