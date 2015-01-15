/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app',
    'angularjsView!./settings.html'
], function (app) {
    "use strict";

    app.register.controller('Lib.Com.Rpi.Angular.Widgets.SettingsController', [
        '$scope',
        '$modalInstance',
        'widget',
        function($scope, $modalInstance, widget) {
            $scope.widget = widget;

            $scope.schema = widget.settings["schema-form"].schema;

            $scope.form = widget.settings["schema-form"].form || ["*"];

            $scope.model = widget.settings.model || {};

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };

            $scope.onSubmit = function(form) {
                $scope.$broadcast('schemaFormValidate');

                if (form.$valid) {
                    $modalInstance.close($scope.model);
                } else {
                    console.log("ERRORS", form);
                }
            };
        }]);
});

