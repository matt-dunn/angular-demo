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

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: baseUrl,

    // example of using shim, to load non AMD libraries (such as underscore and jquery)
    paths: {
        'jquery': 'lib/jquery',
        'angular': 'bower_components/angular/angular',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'ui.bootstrap': 'lib/angular/ui-bootstrap-tpls-0.12.0',
        'dependencyResolver': 'lib/com/rpi/angular/providers/dependencyResolver',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-animate': 'bower_components/angular-animate/angular-animate',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'lib': 'lib',
        'services': 'components/services',
        'filters': 'components/filters',
        'underscore': 'lib/underscore',
        'tv4': "lib/tv4",
        'angularjsView': "lib/com/rpi/requirejs/angularjsView",
        'ckeditor': "lib/ckeditor/ckeditor"
    },

    shim: {
//        jquery: ['jquery'],
        "angular": {
//            deps: ["jquery"],
            exports: 'angular',
            init: function () {
                return angular;
            }
        },
        'angular-mocks': ["angular"],

        "lib/showdown/showdown": {exports: "Showdown"},
        "lib/showdown/extensions/github": ["lib/showdown/showdown"],
        "lib/showdown/extensions/prettify": ["lib/showdown/showdown"],
        "lib/showdown/extensions/table": ["lib/showdown/showdown"],
        "lib/showdown/extensions/twitter": ["lib/showdown/showdown"],
        'lib/angular/markdown': ['angular', 'lib/angular/angular-sanitize', 'lib/showdown/showdown'],

        "ckeditor": {exports: "CKEDITOR"},
        "underscore": {exports: "_"},
        'dependencyResolver': ['angular'],
        'angular-route': ['angular'],
        'angular-animate': ['angular'],
        'angular-resource': ['angular'],
        'ui.bootstrap': ['angular'],
        'lib/angular/angular-strap/navbar/navbar': ['angular'],
        'lib/angular/toArrayFilter': ['angular'],
        'lib/angular/draganddrop': ['angular'],
        'lib/angular/ng-sortable/ng-sortable': ['angular'],
        'lib/angular/ng-ckeditor/ng-ckeditor': ['angular', 'ckeditor'],
        'lib/angular/angular-local-storage': ['angular'],
        'lib/angular/angular-sanitize': ['angular'],
        'lib/angular/schema-form/schema-form': ['angular', 'lib/angular/angular-sanitize', 'tv4'],
        'lib/angular/schema-form/bootstrap-decorator.min': ['angular', 'lib/angular/angular-sanitize', 'lib/ObjectPath', 'tv4', 'lib/angular/schema-form/schema-form'],
        'lib/com/rpi/angular/schema-form/decorators/bootstrap/bootstrap-decorator': ['angular', 'lib/angular/angular-sanitize', 'lib/ObjectPath', 'tv4', 'lib/angular/schema-form/schema-form']
    },

    config: {
        'app': {
            name: "demo"
        }
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});

require([
    'angular',
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
