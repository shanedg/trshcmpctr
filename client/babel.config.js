export default {
  env: {
    test: {
      plugins: [
        // Jest still expects CommonJS
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
  },

  /**
   * Most files built & transpiled by Babel are just in src/
   * but other local projects and some config file extensions may also need processing:
   * i.e. @trshcmpctr/components, jest-setup.ts
   */
  ignore: [
    'common/temp/node_modules/.pnpm',
    'node_modules',
  ],

  plugins: [
    ['babel-plugin-react-compiler',
      {
        panicThreshold: 'all_errors',
      }
    ],
  ],

  presets: [
    [
      '@babel/preset-env', {
        corejs: 3,
        useBuiltIns: 'usage',
      }
    ],
    [
      '@babel/preset-react', {
        runtime: 'automatic',
      },
    ],
    [
      '@babel/preset-typescript', {
        allExtensions: true,
        isTSX: true,
      }
    ],
  ],

  targets: {
    browsers: 'defaults',
  },
};
