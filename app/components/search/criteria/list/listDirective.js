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
                scope: {
                    type: "@",
                    sectionTitle: "@",
                    model: "=ngModel"
                },
                controller: function($scope) {
                    this.addCondition = function(term) {
                        $scope.model.addCondition($scope.type, term);
                        $scope.term = "";
                        $scope.$broadcast("searchCriteriaList.addCondition");
                    };
                    $scope.addCondition = this.addCondition;

                    this.removeCondition = function(term) {
                        $scope.model.removeCondition($scope.type, term);
                        $scope.$broadcast("searchCriteriaList.removeCondition");
                    };
                    $scope.removeCondition = this.removeCondition;
                },
                templateUrl: dependencyResolver.getTemplateUrl("components.search.criteria.list")
            };
        }]);
});

