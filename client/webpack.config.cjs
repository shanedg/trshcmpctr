const { resolve } = require('node:path');

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

/**
 * Helper for setting the build mode
 * @param {boolean} productionFlag 
 * @returns {'production' | 'development'} Build mode
 */
const getMode = productionFlag => productionFlag ? 'production' : 'development';

// Config env and argv:
// https://webpack.js.org/configuration/configuration-types/#exporting-a-function
// https://webpack.js.org/api/cli/#environment-options
// https://webpack.js.org/guides/environment-variables/
module.exports = (env = {}, argv = {}) => {
  const mode = getMode(env.production);
  const isProduction = mode === 'production';

  return {
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('missing webpack-dev-server');
        }
        return middlewares.concat([
          // Mock successful requests for authorized user data
          {
            name: 'mock-api-authorized',
            path: '/api/v1/authorized',
            middleware: (_request, response) => {
              response.send({
                user: {
                  username: '<mocked_user_name>',
                },
              });
            }
          },
          // Mock requests for the world list
          {
            name: 'mock-api-worlds',
            path: '/api/v1/worlds',
            middleware: (_request, response) => {
              response.send([
                {
                  id: 1,
                  label: 'world one',
                  version: '1.16.5',
                  createdAt: '2023/06/28',
                  lastOnline: '2023/06/28',
                  createdBy: '@shaned.gg'
                },
                {
                  id: 2,
                  label: 'world two',
                  version: '1.19.0',
                  createdAt: '2023/06/28',
                  lastOnline: '2023/06/28',
                  createdBy: '@shaned.gg'
                },
                {
                  id: 3,
                  label: 'world three',
                  version: '1.20.1',
                  createdAt: '2023/06/28',
                  lastOnline: '2023/06/28',
                  createdBy: '@shaned.gg'
                },
              ]);
            }
          },
        ]);
      },

      historyApiFallback: true
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    entry: resolve(__dirname, './src/index.ts'),

    mode,

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          // TODO: consider replacing babel with swc
          loader: 'babel-loader',
          options: {
            configFile: resolve(__dirname, 'babel.config.cjs'),
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },

    optimization: {
      minimize: isProduction,
      minimizer: [
        // Terser is minimizer by default? but we can customize?
        new TerserPlugin({
          // https://webpack.js.org/plugins/terser-webpack-plugin/#terseroptions
          terserOptions: {
            warnings: argv.debug ? 'verbose' : false,
          },
        })
      ],
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/
          }
        },
        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
      },
    },

    output: {
      clean: true,
      filename: '[name].[chunkhash].js',
      path: resolve(__dirname, './dist'),
      // Construct bundle paths relative to root:
      // https://webpack.js.org/configuration/output/#outputpublicpath
      // See note about `output.publicPath` in Webpack 5 migration guide:
      // https://webpack.js.org/migrate/5/
      // Mostly important for webpack-manifest-plugin:
      // https://github.com/shellscape/webpack-manifest-plugin/issues/229#issuecomment-737617994
      publicPath: '/',
    },

    plugins: [
      new ESLintPlugin({
        cache: true,
        cacheLocation: 'node_modules/.cache/eslint-cache/',
        emitError: isProduction,
        emitWarning: !isProduction,
        extensions: ['.ts', '.tsx'],
        failOnError: isProduction,
        lintDirtyModulesOnly: !!argv.watch,
        reportUnusedDisableDirectives: !isProduction ? 'warn' : null,
      }),
      new WebpackManifestPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, './src/index.html'),
        title: 'trshcmpctr',
        favicon: resolve(__dirname, './src/favicon.ico'),
      }),
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};
