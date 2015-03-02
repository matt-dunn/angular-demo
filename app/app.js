define([
    'module',
    'angular',
    'ObjectPath',
    'tv4',
    'dependencyResolver',
    'angular-resource',
    'angular-route',
    'angular-animate',
    'angular-uuid-service',
    'ui.bootstrap',
    'lib/com/rpi/angular/navbar/providers/navbar',
    'lib/angular/ng-sortable/ng-sortable',
    'lib/angular/toArrayFilter',
    'lib/angular/ng-ckeditor/ng-ckeditor',
    'angular-local-storage',
    'lib/com/rpi/angular/providers/angular-css-injector',
    'lib/com/rpi/angular/schema-form/decorators/bootstrap/bootstrap-decorator',
    'lib/com/rpi/angular/schema-form/plugins/ckeditor/bootstrap-ckeditor',
    'lib/com/rpi/angular/schema-form/plugins/typeahead/bootstrap-typeahead',
    'lib/com/rpi/angular/schema-form/validators/directives/schemaValidate',
    'lib/angular/markdown',
    'lib/com/rpi/angular/extensions/extendDeep'
], function(module, angular, ObjectPath, tv4) {
    "use strict";

    // @TOTO: tv4 registers as an AMD module but schemaForm does not access via AMD... remove global...??
    window.tv4 = tv4;
    // @TODO: must manually call registerModule??
    ObjectPath.registerModule(angular);

    var config = module.config(),
        appName = config.name + "App",
        app = angular.module(appName, [
            'ngRoute',
            'ngResource',
            'ngAnimate',
            'dependencyResolverServices',
            'ui.bootstrap',
            'ui.sortable',
            'ngCkeditor',
            'angular-toArrayFilter',
            'angular.css.injector',
            'schemaForm',
            'schemaForm-ckeditor',
            'schemaForm-typeahead',
            'LocalStorageModule',
            'btford.markdown',
            'rpi.navbar',
            'uuid'
        ].concat(config.requires || []));

    return app;
});
