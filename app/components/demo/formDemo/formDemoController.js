define([
    'app',
    'angular',
    './services/data',
    'lib/com/rpi/angular/autosave/directives/autosave',
    'angularjsView!./formDemo.html'
], function (app, angular) {
    "use strict";

    app.register.factory("sf-validator.test.sync", [function () {
        return {
            async: false,
            validate: function(modelValue) {
                if (modelValue && modelValue.value !== "item2") {
                    return false;
                }

                return true;
            }
        };
    }]);

    app.register.factory("sf-validator.test.async", ['$q', '$timeout', function ($q, $timeout) {
        var timeout = null;

        return {
            async: true,
            validate: function(modelValue) {
                var def = $q.defer();

                console.log("Checking...", modelValue);
                timeout = $timeout(function() {
                    // Mock a delayed response
                    if (modelValue.toLowerCase() === "valid") {
                        console.log("OK");
                        def.resolve();
                    } else {
                        console.log("NOPE");
                        def.reject("default");
                    }

                }, 2000);

                return def.promise;
            },
            abort: function() {
                console.log("Abort");
                $timeout.cancel(timeout);
            }
        };
    }]);

    app.register.controller('Components.Demo.FormDemoController', [
        '$scope',
        'Components.Demo.FormDemo.Services.Data',
        function($scope, DataService) {

            DataService.load().then(function(data) {
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

