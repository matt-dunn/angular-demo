define([
    'app',
    'angularjsView!./dropDownDemo.html'
], function (app) {
    "use strict";

    app.register.controller('Components.Demo.DropDownDemoController', ['$scope', function ($scope) {
        console.log("SETUP Components.Demo.DropDownDemoController");
        $scope.items = [
            'The first choice!',
            'And another choice for you.',
            'but wait! A third!'
        ];

        $scope.status = {
            isopen: false
        };

        $scope.toggled = function(open) {
            console.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    }]);
});

