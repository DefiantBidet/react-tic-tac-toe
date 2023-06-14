const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverDist = path.resolve(process.cwd(), 'dist');

const webpackConfig = {
  mode: 'production',
  watch: false,
  entry: './src/ts/index.tsx',
  output: {
    filename: 'app-[name]-[chunkhash].js',
    path: serverDist,
    publicPath: '/',
    clean: true,
  },
  resolve: {
    roots: [path.resolve(process.cwd(), 'dist')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['src/ts', 'node_modules'],
    alias: {
      'Components': path.resolve(process.cwd(), 'src/ts/components'),
      'Types': path.resolve(process.cwd(), 'src/ts/types'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true
            }
          }
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: 'all',
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

module.exports = webpackConfig;
