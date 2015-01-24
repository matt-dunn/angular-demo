define([
    'app',
    './validators/uniqueValueDirective',
    './validators/stopWordDirective'
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
                        searchCriteriaList = $controller[1];

                    $scope.controlModel = $control;

                    $scope.$on("searchCriteriaList.addCondition", function() {
                        $element[0].focus();
                    });

                    $scope.$on("searchCriteriaList.removeCondition", function() {
                        $control.$validate();
                        $element[0].focus();
                    });

                    $element.bind("keydown keypress", function (event) {
                        if(event.which === 13) {
                            $scope.$apply(function () {
                                if ($control.$valid) {
                                    searchCriteriaList.addCondition($control.$viewValue);
                                }
                            });

                            event.preventDefault();
                        }
                    });
                },
                controller: function($scope) {
                    this.getModel = function() {
                        return $scope.model;
                    };
                }
            };
        }]);
});

