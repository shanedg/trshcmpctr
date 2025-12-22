/**
 * This babel config supports building lib entry points
 * Needs to understand JSX and Typescript
 * Differences from babel.config.js:
 * Does not need dynamic imports
 * Does not need preset-env + corejs
 */
export default {
  only: [
    './src',
  ],
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-typescript', {
        allExtensions: true,
        isTSX: true,
      }
    ],
  ],
};
