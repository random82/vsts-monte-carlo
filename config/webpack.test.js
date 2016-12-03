var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
    devtool: 'inline-source-map',

    output: {
        libraryTarget: 'amd'
    },

    externals: [
        /^VSS\/.*/,
        /^TFS\/.*/,
        /^q$/
    ],

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['ts', 'angular2-template-loader']
        }, {
            test: /\.html$/,
            loader: 'html'

        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'null'
        }, {
            test: /\.css$/,
            loader: 'null'
        }]
    }
}