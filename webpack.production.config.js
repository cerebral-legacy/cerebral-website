var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.resolve('app', 'main.js')
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'main.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'IS_NODE': JSON.stringify('false')
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
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.md$/,
      loader: 'raw'
    }]
  }
};
