export default {
  only: [
    // Only files in src/ are built & transpiled by Babel
    './src',
  ],

  presets: [
    [
      '@babel/preset-env', {
        corejs: 3,
        modules: false,
        useBuiltIns: 'usage',
      }
    ],
    [
      '@babel/preset-react', {
        runtime: 'automatic',
      }
    ],
    [
      '@babel/preset-typescript', {
        allExtensions: true,
        isTSX: true,
        rewriteImportExtensions: true,
      }
    ],
  ],

  targets: {
    browsers: 'defaults',
  },
};
