define([
    'app'
], function (app) {
    "use strict";

    app.register.directive('searchCriteriaListModel', [
        function() {
            return {
                priority: 2000,
                restrict: 'A',
                require: 'ngModel',
                link: function($scope, $element, $attrs, $control) {
                    // @TODO: Stop words must be defined either as a provider if hard-coded in app.config or as a service if they need to be configured by the backend
                    var stopWords = [
                        "the",
                        "of",
                        "a",
                        "it"
                    ];

                    $control.$validators.stopWord = function(modelValue) {
                        if ($control.$isEmpty(modelValue)) {
                            return true;
                        }

                        return !(-1 < stopWords.map(function(item) {
                            return item.toLowerCase();
                        }).indexOf(modelValue.toLowerCase()));
                    };
                }
            };
        }]);
});

