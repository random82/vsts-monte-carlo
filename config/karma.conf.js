module.exports = function (config) {

  var webpackConfig = require('./webpack.test');

  var _config = {
    basePath: '',

    frameworks: ['jasmine', 'chai' , 'sinon'],

    files: [
      {pattern: './config/karma-test-shim.js', watched: false}
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

    reporters: ['progress', 'trx'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    trxReporter: { outputFile: 'test-results.trx', shortTestName: false }
  };

  config.set(_config);
};