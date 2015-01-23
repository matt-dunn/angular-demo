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
                .when('/about', dependency.resolve('Pages.About'))
                .when('/main', dependency.resolve('Pages.Main'))
                .when('/search', dependency.resolve('Pages.Search'))
                .otherwise({ redirectTo: '/about' });
        }]);

    return app;
});
