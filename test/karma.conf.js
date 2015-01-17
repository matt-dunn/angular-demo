// Karma configuration
// Generated on Fri Aug 09 2013 09:44:05 GMT-0700 (PDT)

module.exports = function (config) {
    'use strict';

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'test/test-main.js', included: true},

            {pattern: 'app/**/*Spec.js', included: false},
            {pattern: 'app/lib/**/*.js', included: false},
            {pattern: 'app/components/**/*.js', included: false},
            {pattern: 'app/bower_components/**/*.js', included: false},

            {pattern: 'app/app.routes.js', included: false},
            {pattern: 'app/bootstrap.js', included: false},
            {pattern: 'app/app.js', included: false},
            {pattern: 'app/app.config.js', included: false}
        ],

        // list of files to exclude
        exclude: [
//            'app/bootstrap.js',
            'app/main.js'
        ],

        plugins: [
            'karma-requirejs',
            'karma-coverage',
            'karma-junit-reporter',
            'karma-teamcity-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

                // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage', 'teamcity'
        reporters: ['progress', 'junit', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'lcov', // lcov format supported by Coveralls
            dir: 'test/reports/coverage'
        },

        junitReporter: {
            outputFile: 'test/reports/test/unit-test-results.xml',
            suite: 'Angular Demo'
        },

        // web server port
        port: 9876,

        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

//        urlRoot: "",

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};

