/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
    'angular',
    'app',
    'config/app.config',
    'app.config',
    'app.routes'
],
    function(angular, app, appConfig) {
        "use strict";

        angular.element(document).ready(function() {
            angular.bootstrap(document, [app.name], {
                strictDi: appConfig.angular.strictDi
            });
        });
    });