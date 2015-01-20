exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        '**/*Scenario.js'
    ],

    mocks: {
        default: [],
        dir: 'mocks'
    },

    capabilities: {
        'browserName': 'chrome'
    },

    chromeOnly: true,

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    onPrepare: function(){
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter(__dirname + "/../../../reports/e2e/test-results/", true, true)
        );

        jasmine.getEnv().addReporter(new function() {
            function getSpecPath(suite) {
                var path = "";
                if (suite.parentSuite) {
                    path += getSpecPath(suite.parentSuite);
                }

                path += ("/" + sanitizePath(suite.description));
                return path;
            }

            function sanitizePath(input, options) {
                var replacement = (options && options.replacement) || '',
                    regex = /[\/\?<>\\:\*\|":\x00-\x1f\x80-\x9f]/g;
                return input.replace(regex, replacement);
            }

            this.reportSpecResults = function(spec) {
                if (!spec.results().passed()) {
                    browser.takeScreenshot().then(function(png) {
                        browser.getCapabilities().then(function (capabilities) {
                            var passed = spec.results().passed(),
                                browserName = capabilities.caps_.browserName,
                                passFail = (passed) ? 'pass' : 'FAIL',
                                filename = sanitizePath(browserName + '-' + passFail + '_' + spec.description + '.png'),
                                fullPath = __dirname + "/../../../reports/e2e/scenarios" + getSpecPath(spec.suite) + "/",

                                fs = require('fs'),
                                mkdirp = require('mkdirp');

                            mkdirp(fullPath, function (err) {
                                if (err) {
                                    console.error(err)
                                } else {
                                    var stream = fs.createWriteStream(fullPath + filename);

                                    stream.write(new Buffer(png, 'base64'));
                                    stream.end();
                                }
                            });
                        });
                    });
                }
            };
        });

        require('protractor-http-mock').config = {
            rootDirectory: __dirname, // default value: process.cwd()
            protractorConfig: 'protractor-conf.js' // default value: 'protractor.conf'
        };
    }
};
