import { resolve } from 'node:path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

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
export default (env = {}, argv = {}) => {
  const mode = getMode(env.production);
  const isProduction = mode === 'production';

  return [{
    entry: {
      paths: './src/paths.ts',
    },
    output: {
      clean: true,
      filename: '[name].js',
      path: resolve('./lib'),
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    mode,
    module: {
      rules:  [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            configFile: resolve('babel.config.lib.cjs'),
          },
        },
      ],
    },
  }, {
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
                  id: 'abc',
                  name: 'world one',
                  status: 'pending',
                },
                {
                  id: 'def',
                  name: 'world two',
                  status: 'pending',
                },
                {
                  id: 'ghi',
                  name: 'world three',
                  status: 'pending',
                },
              ]);
            }
          },
        ]);
      },

      historyApiFallback: true
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    entry: './src/index.ts',

    mode,

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            configFile: resolve('babel.config.cjs'),
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
      path: resolve('./dist'),
      // Construct bundle paths relative to root:
      // https://webpack.js.org/configuration/output/#outputpublicpath
      // See note about `output.publicPath` in Webpack 5 migration guide:
      // https://webpack.js.org/migrate/5/
      // Mostly important for webpack-manifest-plugin:
      // https://github.com/shellscape/webpack-manifest-plugin/issues/229#issuecomment-737617994
      publicPath: '/',
    },

    plugins: [
      new WebpackManifestPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'trshcmpctr',
        favicon: './src/favicon.ico',
      }),
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  }];
};
