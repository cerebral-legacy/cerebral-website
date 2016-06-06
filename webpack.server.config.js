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
  devtool: 'eval-source-map',
  target: 'node',
  output: {
    path: path.resolve(),
    filename: 'server_build.js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin({
      'global.IS_NODE': JSON.stringify('false')
    }),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      {
        raw: true,
        entryOnly: false
      }
    )
  ],
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
    },
    {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.md$/,
      loader: 'raw'
    }, {
      test: /\.css?$/,
      loader: 'css-loader/locals?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }]
  }
};
