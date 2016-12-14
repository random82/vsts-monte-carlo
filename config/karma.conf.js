var ENV = process.env.npm_lifecycle_event;

var isTestDebug = ENV === 'test:debug'; 

module.exports = function(config) {

    var webpackConfig = require('./webpack.test');

    var _config = {
        basePath: '',

        frameworks: ['requirejs', 'jasmine', 'chai', 'sinon'],

        files: [{
                    pattern: './config/karma-test-shim.js',
                    watched: true,
                    included: false
                },
                './config/require-test-shim.js'
        ],

        preprocessors: {
            './config/karma-test-shim.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ['mocha', 'trx'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: isTestDebug ? ['Chrome'] : ['PhantomJS'],
        singleRun: isTestDebug ? false : true,
        trxReporter: {
            outputFile: 'test-results.trx',
            shortTestName: false
        }
    };

    config.set(_config);
};