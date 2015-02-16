define([
    'app',
    'angularjsView!./tabsDemo.html'
], function (app) {
    "use strict";

    app.register.controller('Components.Demo.TabsDemoController', ['$scope', '$window', function ($scope, $window) {
        console.log("SETUP Components.Demo.TabsDemoController");
        $scope.tabs = [
            { title:'Dynamic Title 1', content:'Dynamic content 1' },
            { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
        ];

        $scope.alertMe = function() {
            setTimeout(function() {
                $window.alert('You\'ve selected the alert tab!');
            });
        };
    }]);
});

