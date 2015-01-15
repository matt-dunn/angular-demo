/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app',
    'dependencyResolver'
], function (app) {
    "use strict";

    app.register.directive('widget', [
        function() {
            return {
                restrict: 'E',
                scope: {
                    type: "@"
                },
                controller: ['$scope', '$templateCache', 'dependencyResolver', function($scope, $templateCache, dependencyResolver) {
                    dependencyResolver.load($scope.type).then(function() {
                        // Now the dependency is loaded lets get the template to render the real type:
                        $scope.deferredType = dependencyResolver.getTemplateUrl($scope.type);
                    });
                }],
                template: '<div class="widget-installed-container" ng-include="deferredType" ng-cloak></div>'
            };
        }]);
});

