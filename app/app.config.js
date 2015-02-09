/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**!
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
    'app',

    'config/app.config',
    'config/markdown.config',
    'config/ckeditor.config'
], function (app, appConfig) {
    "use strict";

    app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            $compileProvider.debugInfoEnabled(appConfig.angular.debugInfoEnabled);

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service,
                animation: app.animation
            };
        }]);

    return app;
});

