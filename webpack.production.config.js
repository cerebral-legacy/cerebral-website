'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'main.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.md$/,
      loader: 'raw'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};
