define([
    'app',
    'components/search/criteria/models/request',
    'components/search/criteria/list/listDirective',
    'angularjsView!./search.html',

    'lib/com/rpi/angular/widgets/directives/widget',
], function (app, SearchModel) {
    "use strict";

    app.register.controller('Pages.SearchController', [
        '$scope',
        function($scope) {
            console.log("Pages.SearchController");

            $scope.isReady = true;

            $scope.initSearchCriteria = function() {
                $scope.search = new SearchModel({
                    all: [
                        "starfish",
                        "reef",
                        "pacific"
                    ],
                    "exact": [
                        "blue ocean"
                    ],
                    "any": [
                        "coral",
                        "fish",
                        "sand"
                    ],
                    "exclude": [
                        "australia"
                    ]
                });
            };

            $scope.performSearch = function() {
                console.log("SEARCH", $scope.search.request);
            };

            $scope.initSearchCriteria();
        }]
    );
});

