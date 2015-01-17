define([
    'app',
    'angular',
    './services/data',
    'lib/com/rpi/angular/autosave/directives/autosave',
    'angularjsView!./formDemo.html',
    './schema-form/validators/sf-validator.test.sync',
    './schema-form/validators/sf-validator.test.async'
], function (app, angular) {
    "use strict";

    app.register.controller('Components.Demo.FormDemoController', [
        '$scope',
        'Components.Demo.FormDemo.Services.Data',
        function($scope, DataService) {

            DataService.load("Components.Demo.FormDemoController").then(function(data) {
                $scope.model = data.model;

                $scope.schema = data.schema;

                $scope.form = data.form;

                $scope.isReady = true;

                $scope.options = {
                    formDefaults: {
                        validationMessage: {
                            200: "This string is too short",
                            302: "You can't just leave it blank"
                        }
                    }
                };
            });

            $scope.toggleReadOnly = function() {
                var form = angular.copy($scope.schema);
                form.readonly = !form.readonly;
                $scope.schema = form;
            };

            $scope.onSubmit = function(form) {
                if (form.$valid) {
                    console.log("VALID", $scope.model);
                } else {
                    console.log("ERRORS", form);
                }
            };
        }]
    );
});

