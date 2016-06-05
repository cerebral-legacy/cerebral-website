var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app/main.js'
  ],
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'IS_NODE': JSON.stringify('false')
      }
    }),
    new ExtractTextPlugin('styles.css')
  ],
  resolve: {
    alias: {
      'base': path.resolve('app', 'base')
    }
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.md$/,
      loader: 'raw'
    }]
  }
};
