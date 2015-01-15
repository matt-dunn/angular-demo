define([
    'app'
], function (app) {
    "use strict";

    app.config([
        '$routeProvider',
        'dependencyResolverProvider',
        function ($routeProvider, dependencyResolverProvider) {
            var dependency = dependencyResolverProvider.route;

            $routeProvider
                .when('/about', dependency.resolve('Components.About'))
                .when('/main', dependency.resolve('Components.Main'))
                .otherwise({ redirectTo: '/about' });
        }]);

    return app;
});
