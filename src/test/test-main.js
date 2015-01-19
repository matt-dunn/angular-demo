var baseUrl = "/base/app/",
    allTestFiles = [
    ],
    TEST_REGEXP = /Spec\.js$/;

var pathToModule = function(path) {
    return path.replace(new RegExp("^" + baseUrl.replace(/\//g, "\\/")), '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});

console.info(allTestFiles);

// First load the application requirejs config:
require([
    baseUrl + "main.js"
], function() {
    // Extend/overwrite application requirejs config:
    require.config({
        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: baseUrl,

        paths: {
            'angular-mocks': 'bower_components/angular-mocks/angular-mocks'
        },

        shim: {
            'angular-mocks': ["angular"]
        },

        // dynamically load all test files
        deps: allTestFiles,

        // we have to kickoff jasmine, as it is asynchronous
        callback: window.__karma__.start
    });

    require([
        '../.',
        'app',
        'app.config',
        'angular-mocks'
    ],
        function(angular, app) {
            app.run(function() {
                app.register =
                {
                    controller: app.controller,
                    directive: app.directive,
                    filter: app.filter,
                    factory: app.factory,
                    service: app.service,
                    animation: app.animation
                };
            });

            angular.bootstrap(null, [app.name]);
        });
});
