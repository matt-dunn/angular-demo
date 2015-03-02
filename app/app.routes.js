/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
    'app'
], function(app) {
    "use strict";

    app.config([
        '$routeProvider',
        'dependencyResolverProvider',
        function($routeProvider, dependencyResolverProvider) {
            var dependency = dependencyResolverProvider.route;

            $routeProvider
                .when('/about', dependency.resolve('Pages.About'))
                .when('/main', dependency.resolve('Pages.Main'))
                .otherwise({redirectTo: '/about'});
        }]);

    return app;
});
