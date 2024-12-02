const webpack = require('webpack');
const path = require('path');
const { type } = require('os');

const PORT = 4001;

module.exports = {
  externalsType: 'umd',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  entry: {
    app: ['./js/main.tsx'],
  },
  output: {
    library: { type: 'umd' },
    path: path.resolve(__dirname, 'js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  devServer: {
    port: PORT,
    hot: true,
    historyApiFallback: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
    static: {
      directory: path.resolve(__dirname),
      watch: true,
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.scss'],
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [],
};
