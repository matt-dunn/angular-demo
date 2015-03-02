define([
    'app',
    'angularjsView!./buttonsDemo.html'
], function(app) {
    "use strict";

    app.register.controller('Components.Demo.ButtonsDemoController', ['$scope', function($scope) {
        console.log("SETUP Components.Demo.ButtonsDemoController");
        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };
    }]);
});
