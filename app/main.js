require.config({
    baseUrl: "",
    paths: {
        'jquery': 'lib/jquery',
        'angular': 'bower_components/angular/angular',
        'ui.bootstrap': 'lib/angular/ui-bootstrap-tpls-0.12.0',
        'dependencyResolver': 'lib/com/rpi/angular/providers/dependencyResolver',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-animate': 'bower_components/angular-animate/angular-animate',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-uuid-service': 'bower_components/angular-uuid-service/uuid-svc',
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
        'angular-uuid-service': ['angular'],
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
    deps: [
        'lib/com/rpi/prototype',
        'app.routes',
        'bootstrap'
    ],
    config: {
        'app': {
            name: "demo"
        },
        'dependencyResolver': {
//            useMinified: true,
//            controllersDirectory: "demo/"
        }
    }
});

