export default {
  collectCoverage: true,
  moduleNameMapper: {
    // See https://jestjs.io/docs/webpack#handling-static-assets
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jsdom',
  /**
   * Most files built & transpiled by Babel are just in src/
   * but other local projects and some config file extensions may also need processing:
   * i.e. @trshcmpctr/components, jest-setup.ts
   */
  transformIgnorePatterns: [
    'common/temp/node_modules/.pnpm',
    'node_modules',
  ],
};
