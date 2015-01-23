define([
    'app'
], function (app) {
    "use strict";

    app.register.directive('searchCriteriaListModel', [
        function() {
            return {
                priority: 1000,
                restrict: 'A',
                require: ['ngModel', '^searchCriteriaList'],
                scope: {
                    model: "=searchCriteriaListModel",
                    controlModel: "=searchCriteriaListControlModel"
                },
                link: function($scope, $element, $attrs, $controller) {
                    var $control = $controller[0],
                        searchTerm = $controller[1];

                    $scope.controlModel = $control;

                    $scope.$on("searchTerm.addCondition", function() {
                        $element[0].focus();
                    });

                    $scope.$on("searchTerm.removeCondition", function() {
                        $control.$validate();
                        $element[0].focus();
                    });

                    $element.bind("keydown keypress", function (event) {
                        if(event.which === 13) {
                            $scope.$apply(function () {
                                if ($control.$valid) {
                                    searchTerm.addCondition($control.$viewValue);
                                }
                            });

                            event.preventDefault();
                        }
                    });

                    $control.$validators.unique = function(modelValue) {
                        if ($control.$isEmpty(modelValue)) {
                            return true;
                        }

                        return ($scope.model.indexOf(modelValue) === -1);
                    };
                }
            };
        }]);
});

