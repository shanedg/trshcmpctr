module.exports = {
  rootDir: '..',
  roots: [
    '<rootDir>/config',
    '<rootDir>/src',
  ],
  transform: {
    // Only files in src/ are built & transpiled by Babel.
    '\\/src\\/.+\\.[t|j]sx?$': '<rootDir>/config/babelJest.js',
  },
  collectCoverage: true,
  setupFilesAfterEnv: [
    '<rootDir>/config/setupTests.js',
  ]
};
