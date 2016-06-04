var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: path.resolve('server.js'),
  target: 'node',
  output: {
    path: path.resolve(),
    filename: 'server_build.js'
  },
  externals: nodeModules,
  resolve: {
    alias: {
      'base': path.resolve('app', 'base')
    }
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.md$/,
      loader: 'raw'
    }, {
      test: /\.css?$/,
      loader: 'css-loader/locals?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }]
  }
};
