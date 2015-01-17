/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
    'angular',
    'lib/angular/schema-form/schema-form'
], function (angular) {
    "use strict";

    angular
        .module('schemaForm')
        .directive('schemaValidate', [
            '$injector',
            '$q',
            '$compile',
            function($injector, $q, $compile) {
                return {
                    priority: 1100,
                    restrict: 'A',
                    require: 'ngModel',
                    link: function($scope, elm, attrs, ctrl) {
                        elm.parent().append(
                            $compile(
                                '<span ng-if="form.feedback !== false" class="form-control-feedback"><span ng-class="evalInScope(form.feedback) || {\'fa\': true, \'fa-circle-o-notch fa-spin\': ngModel.$pending }"></span></span>'
                            )($scope)
                        );

                        if ($scope.form.customValidators) {
                            if (!$scope.form.validationMessage) {
                                $scope.form.validationMessage = {};
                            } else if (angular.isString($scope.form.validationMessage)) {
                                $scope.form.validationMessage = {
                                    "default": $scope.form.validationMessage
                                };
                            }

                            angular.forEach($scope.form.customValidators, function(validatorDetails) {
                                if (validatorDetails.type) {
                                    $injector.invoke([validatorDetails.type, function (validator) {
                                        if (validatorDetails.validationMessage) {
                                            angular.forEach(validatorDetails.validationMessage, function(message, key) {
                                                $scope.form.validationMessage[validatorDetails.type + "." + key] = message;
                                            });
                                        }

                                        if (validator.async === true) {
                                            ctrl.$asyncValidators[validatorDetails.type] = function(modelValue, viewValue) {
                                                if (ctrl.$isEmpty(modelValue) || $scope.form.readonly || ctrl.$pristine) {
                                                    return $q.when();
                                                }

                                                if (ctrl.$asyncValidators[validatorDetails.type].defer) {
                                                    ctrl.$asyncValidators[validatorDetails.type].defer.reject();
                                                    if (validator.abort) {
                                                        validator.abort();
                                                    }
                                                }

                                                var def = ctrl.$asyncValidators[validatorDetails.type].defer = $q.defer();

                                                if (!$scope.schemaError()) {
                                                    validator.validate(modelValue, viewValue).then(
                                                        function() {
                                                            delete ctrl.$asyncValidators[validatorDetails.type].defer;
                                                            def.resolve();
                                                        },
                                                        function(ret) {
                                                            delete ctrl.$asyncValidators[validatorDetails.type].defer;
                                                            $scope.setErrorCode(validatorDetails.type + "." + (ret || "default"));
                                                            def.reject();
                                                        }
                                                    );
                                                } else {
                                                    delete ctrl.$asyncValidators[validatorDetails.type].defer;
                                                    def.resolve();
                                                }

                                                return def.promise;
                                            };
                                        } else {
                                            ctrl.$validators[validatorDetails.type] = function(modelValue, viewValue) {
                                                if (!$scope.schemaError()) {
                                                    if (ctrl.$isEmpty(modelValue) || $scope.form.readonly || ctrl.$pristine) {
                                                        return true;
                                                    }

                                                    var ret = validator.validate(modelValue, viewValue);
                                                    if (ret !== true) {
                                                        $scope.setErrorCode(validatorDetails.type + "." + (ret || "default"));

                                                        return false;
                                                    }
                                                }

                                                return true;
                                            };
                                        }
                                    }]);
                                }
                            });
                        }
                    }
                };
            }]);
});
