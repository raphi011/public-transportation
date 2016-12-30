const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const prod = process.argv.indexOf('-p') !== -1;

const host = 'localhost';
const port = 8080;

const config = {
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  performance: { hints: false },
  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader'),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('main.css'),
    new webpack.NamedModulesPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: resolve(__dirname, 'src/sw.js'),
    }),
  ],
};

if (prod) {
  config.entry = './index.jsx';
} else {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
  config.devServer = {
    hot: true,
    host,
    port,

    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`
  };

  config.entry = {
    main: [
      'react-hot-loader/patch',
      // activate HMR for React

      `webpack-dev-server/client?http://${host}:${port}`,
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates


      './index.jsx',
      // the entry point of our app
    ],
  };
}

module.exports = config;
