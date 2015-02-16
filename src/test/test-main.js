"use strict";

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
        if (file.indexOf("bower_components/") === -1) {
            allTestFiles.push(pathToModule(file));
        }
    }
});

console.info("\n\nTesting:\n" + allTestFiles.join("\n"));

// First load the application requirejs config:
require([
    baseUrl + "main.js"
], function() {
    // Extend/overwrite application requirejs config:
    require.config({
        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: baseUrl,

        paths: {
//            'angularjsView': "../bower_components/rpi-library/lib/com/rpi/requirejs/testAngularjsView",
            'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
        },

        shim: {
            'angular-mocks': ["angular"]
        }
    });

    require([
        'angular',
        'app',
        'angular-mocks'
    ],
        function(angular, app) {
            app.register =
            {
                controller: app.controller,
                directive: app.directive,
                filter: app.filter,
                factory: app.factory,
                service: app.service,
                animation: app.animation
            };

            require(allTestFiles, function() {
                window.__karma__.start();
            });
        });
});
