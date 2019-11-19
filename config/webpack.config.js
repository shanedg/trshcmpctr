const chalk = require('chalk');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// Config env:
// https://webpack.js.org/api/cli/#environment-options
// https://webpack.js.org/guides/environment-variables/
module.exports = (env = {}) => {
  return {
    mode: env.production ? 'production' : 'development',

    entry: {
      // index: './src/index.ts',
      index: path.resolve(__dirname, '../src/index.ts'),
    },

    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, '../dist'),
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [
            path.resolve(__dirname, '../src'),
          ],
          loader: 'babel-loader',
          options: {
            plugins: [
              'syntax-dynamic-import',
            ],
            presets: [
              ['@babel/preset-env', {
                'modules': false,
              }],
              '@babel/preset-react',
              ['@babel/preset-typescript', {
                'allExtensions': true,
                'isTSX': true,
              }],
            ],
          },
        }
      ]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/
          }
        },
        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
        name: true,
      },
    },

    plugins: [
      new CleanWebpackPlugin(),
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      }),
      new HtmlWebpackPlugin(),
    ],

    devServer: {
      open: true,
    },

  };
};