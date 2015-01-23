define([
    'app',
    'dependencyResolver',
    './directives/modelDirective',
   'angularjsView!./list.html'
], function (app) {
    "use strict";


    app.register.directive('searchCriteriaList', [
        'dependencyResolver',
        function(dependencyResolver) {
            return {
                restrict: 'E',
                require: 'ngModel',
                scope: {
                    type: "@",
                    title: "@",
                    model: "=ngModel"
                },
                controller: function($scope) {
                    this.addCondition = function(term) {
                        $scope.model.addCondition($scope.type, term);
                        $scope.term = "";
                        $scope.$broadcast("searchTerm.addCondition");
                    };
                    $scope.addCondition = this.addCondition;

                    this.removeCondition = function(term) {
                        $scope.model.removeCondition($scope.type, term);
                        $scope.$broadcast("searchTerm.removeCondition");
                    };
                    $scope.removeCondition = this.removeCondition;
                },
                templateUrl: dependencyResolver.getTemplateUrl("components.search.criteria.list")
            };
        }]);
});

