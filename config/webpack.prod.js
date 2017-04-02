var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.dist,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'amd'
  },

  externals: [
         /^VSS\/.*/, /^TFS\/.*/, /^q$/
    ],

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [

    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});