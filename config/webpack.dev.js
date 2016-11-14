var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.dist,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'amd'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
});
