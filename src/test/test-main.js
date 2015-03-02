/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**
 * Main test entry
 *
 * pass --test=<regexp> to run specific tests
 *
 */

"use strict";

var baseUrl = "/base/app/",
    allTestFiles = [],
    allOtherFiles = [],
    TEST_REGEXP = /Spec\.js$/,
    JS_REGEXP = /\.js$/,
    args = {};

window.__karma__.config.args.forEach(function(arg) {
    var argParts = arg.split("="),
        name = argParts[0].substr(2),
        value = argParts[1];

    if (name === "test") {
        value = new RegExp(value, "i");
    }

    args[name] = value;
});

var pathToModule = function(path) {
    return path.replace(new RegExp("^" + baseUrl.replace(/\//g, "\\/")), '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
    if (file.substr(0, baseUrl.length) === baseUrl) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            if (!args.test || args.test.test(file)) {
                allTestFiles.push(pathToModule(file));
            }
        } else if (JS_REGEXP.test(file)) {
            allOtherFiles.push(pathToModule(file));
        }
    }
});

if (args.test) {
    console.info("\n\nTesting specs matching '" + args.test + "':\n\t" + allTestFiles.join("\n\t"));
} else {
    console.info("\n\nTesting ALL specs:\n\t" + allTestFiles.join("\n\t"));
}
//console.debug("\n\nAll other files:\n\t" + allOtherFiles.join("\n\t"));

// Setup the karma base path first so and dependencies main.dev can be resolved
require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: baseUrl
});

// First load the application requirejs config:
require([
    "main"
], function() {
    // Extend/overwrite application requirejs config:
    require.config({
        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: baseUrl,

        paths: {
            'jquery': '../bower_components/jquery/dist/jquery',
            'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
        },

        shim: {
            'angular-mocks': ["angular"],
            "angular": {
                deps: ["jquery"],
                exports: 'angular',
                init: function() {
                    return window.angular;
                }
            }
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

            // Make sure all files are loaded by requirejs to ensure accurate coverage reporting
            require(allTestFiles.concat(allOtherFiles), function() {
                window.__karma__.start();
            });
        });
});
