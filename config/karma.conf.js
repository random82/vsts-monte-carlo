module.exports = function(config) {

    var webpackConfig = require('./webpack.test');

    var _config = {
        basePath: '',

        frameworks: ['requirejs', 'jasmine', 'chai', 'sinon'],

        files: [{
            pattern: './config/karma-test-shim.js',
            watched: false
        }],

        preprocessors: {
            './config/karma-test-shim.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        reporters: ['progress', 'trx'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: false,
        trxReporter: {
            outputFile: 'test-results.trx',
            shortTestName: false
        }
    };

    config.set(_config);
};