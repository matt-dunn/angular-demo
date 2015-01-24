define([
    'app'
], function (app) {
    "use strict";

    app.register.directive('searchCriteriaListModel', [
        function() {
            return {
                priority: 2000,
                restrict: 'A',
                require: ['ngModel', 'searchCriteriaListModel'],
                link: function($scope, $element, $attrs, $controller) {
                    var $control = $controller[0],
                        $modelController = $controller[1];

                    $control.$validators.unique = function(modelValue) {
                        if ($control.$isEmpty(modelValue)) {
                            return true;
                        }

                        return !(-1 < $modelController.getModel().map(function(item) {
                            return item.toLowerCase();
                        }).indexOf(modelValue.toLowerCase()));
                    };
                }
            };
        }]);
});

