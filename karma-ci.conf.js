'use strict';

// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({

    webpack: { node: { fs: 'empty' } },
     // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter')
    ],

    files: [
      {pattern: './assets/i18n/*.json', included: false}
    ],

    client:{
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false // executed in order of test writing order
      }
    },

    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true,
      thresholds: {
        emitWarning: true,
        global: {
          statements: 70,
          lines: 70,
          branches: 50,
          functions: 50
        }
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml', 'junit', 'coverage-istanbul'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    // configure chrome without UI (headless) to run the tests 
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--remote-debugging-port=9222',
        ]
      }
    },
    browsers: ['ChromeHeadless'],

    browserNoActivityTimeout: 100000,

    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // saves report at `target/karma-reports/TEST-*.xml` because Jenkins
    // looks for this location and file prefix by default.
    junitReporter: {
      outputDir: '../target/karma-reports/'
    }
  });
};
