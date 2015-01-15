/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app',
    '../installedController'
], function (app) {
    "use strict";

    app.register.directive('widgets', [
        function() {
            return {
                restrict: 'E',
                scope: {
                    section: "@"
                },
                templateUrl: "lib/com/rpi/angular/widgets/installed/installed.html"
            };
        }]);
});

