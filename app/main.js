/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

require.config({
    baseUrl: "",
    paths: {
        'bower_components': '../bower_components',
        'jquery': '../bower_components/jquery/dist/jquery',
        'angular': '../bower_components/angular/angular',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-uuid-service': '../bower_components/angular-uuid-service/uuid-svc',
        'angular-local-storage': '../bower_components/angular-local-storage/dist/angular-local-storage',
        'underscore': '../bower_components/underscore/underscore',
        'tv4': "../bower_components/tv4/tv4",
        'ObjectPath': "../bower_components/objectpath/lib/ObjectPath",
        'ckeditor': "../bower_components/ckeditor/ckeditor",
        'moment': "../bower_components/moment/moment",

        'lib': '../bower_components/rpi-library/lib',
        'dependencyResolver': '../bower_components/rpi-library/lib/com/rpi/angular/providers/dependencyResolver',
        'ui.bootstrap': '../bower_components/rpi-library/lib/angular/ui-bootstrap-tpls-0.12.0',
        'angularjsView': "../bower_components/rpi-library/lib/com/rpi/requirejs/angularjsView",

        // Application paths:
        'services': 'components/services',
        'filters': 'components/filters',

        // Mocks:
        'components/search/services/searchService': 'components/search/services/searchServiceMock'
    },
    shim: {
//        jquery: ['jquery'],
        "angular": {
//            deps: ["jquery"],
            exports: 'angular',
            init: function () {
                "use strict";

                return window.angular;
            }
        },

        "lib/showdown/showdown": {exports: "Showdown"},
        "lib/showdown/extensions/github": ["lib/angular/markdown"],
        "lib/showdown/extensions/prettify": ["lib/angular/markdown"],
        "lib/showdown/extensions/table": ["lib/angular/markdown"],
        "lib/showdown/extensions/twitter": ["lib/angular/markdown"],
        "lib/showdown/extensions/hash": ["lib/angular/markdown"],
        "lib/showdown/extensions/gherkin": ["lib/angular/markdown"],
        'lib/angular/markdown': ['angular', 'angular-sanitize', 'lib/showdown/showdown'],

        "ckeditor": {exports: "CKEDITOR"},
        "underscore": {exports: "_"},
        'angular-route': ['angular'],
        'angular-animate': ['angular'],
        'angular-resource': ['angular'],
        'angular-uuid-service': ['angular'],
        'ui.bootstrap': ['angular'],
        'lib/angular/angular-strap/navbar/navbar': ['angular'],
        'lib/angular/toArrayFilter': ['angular'],
        'lib/angular/draganddrop': ['angular'],
        'lib/angular/ng-sortable/ng-sortable': ['angular'],
        'lib/angular/ng-ckeditor/ng-ckeditor': ['angular', 'lib/com/rpi/angular/extensions/extendDeep', 'ckeditor'],
        'angular-local-storage': ['angular'],
        'angular-sanitize': ['angular'],
        'lib/angular/angular-snap': ['lib/snap/snap', 'angular'],
        'lib/angular/schema-form/schema-form': ['angular', 'angular-sanitize', 'tv4'],
        'lib/angular/schema-form/bootstrap-decorator.min': ['angular', 'angular-sanitize', 'ObjectPath', 'tv4', 'lib/angular/schema-form/schema-form'],
        'lib/com/rpi/angular/schema-form/decorators/bootstrap/bootstrap-decorator': ['angular', 'angular-sanitize', 'ObjectPath', 'tv4', 'lib/angular/schema-form/schema-form']
    },
    deps: [
        'lib/com/rpi/prototype',
        'bootstrap',
    ],
    config: {
        'app': {
            name: "demo"
        },
        'dependencyResolver': {
//            useMinified: true,
//            controllersDirectory: "demo/"
        },
        "lib/com/rpi/requirejs/buildVersion": {
            version: "0.0.11"
        }
    }
});

