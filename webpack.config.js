const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const host = 'localhost';
const port = 8080;

module.exports = {
  entry: {
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
    sw: './sw.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-logger',
      'redux-thunk',
      'isomorphic-fetch',
      'lodash/throttle',
      'grommet/components/App',
      'grommet/components/Header',
      'grommet/components/Box',
      'grommet/components/Title',
      'grommet/components/Columns',
      'grommet/components/Select',
      'grommet/components/Heading',
    ],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  performance: { hints: false },
  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    host,
    port,

    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`
  },

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
  ],
};

/*
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
*/
