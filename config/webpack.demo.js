var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'demo';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

  output: {
    path: helpers.dist,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'amd'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
     new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});

