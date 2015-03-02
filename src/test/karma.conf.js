// Karma configuration
// Generated on Fri Aug 09 2013 09:44:05 GMT-0700 (PDT)

module.exports = function (config) {
    'use strict';

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'src/test/test-main.js', included: true},

            // Include application dependencies:
            {pattern: 'bower_components/angular**/**/*.js', included: false},
            {pattern: 'bower_components/require**/**/*.js', included: false},
            {pattern: 'bower_components/jquery/dist/jquery.js', included: false},
            {pattern: 'bower_components/tv4/**/*.js', included: false},
            {pattern: 'bower_components/objectpath/**/*.js', included: false},
            {pattern: 'bower_components/underscore/**/*.js', included: false},
            {pattern: 'bower_components/moment/moment.js', included: false},
            {pattern: 'bower_components/ckeditor/**/*.js', included: false},
            {pattern: 'bower_components/URIjs/**/*.js', included: false},
            {pattern: 'bower_components/rpi-library/lib/**/*.js', included: false},
            {pattern: 'bower_components/rpi-library/lib/**/*.html', included: false},

            // Include all application files:
            {pattern: 'app/**/*', included: false}
        ],

        // list of files to exclude
        exclude: [
            'app/**/*.min.*'
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
            'app/**/!(*Mock|*Spec|*.min).js': ['coverage']
        },

        coverageReporter: {
            dir: 'reports/test/coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
//                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },              // Jenkins
//                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
//                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
//                { type: 'text', subdir: '.', file: 'text.txt' },
//                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
            ]
        },

        junitReporter: {
            outputFile: 'reports/test/unit-test-results.xml',
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

