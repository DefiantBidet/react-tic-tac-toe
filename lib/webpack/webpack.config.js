const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverDist = path.resolve(process.cwd(), 'dist');

const webpackDevConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8888,
    static: {
      directory: serverDist,
    },
  },
  entry: './src/ts/index.tsx',
  output: {
    filename: 'app-[name]-[chunkhash].js',
    path: serverDist,
    publicPath: '/',
    clean: true,
  },
  resolve: {
    roots: [serverDist],
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
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'vendors',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),
  ],
};

module.exports = webpackDevConfig;
