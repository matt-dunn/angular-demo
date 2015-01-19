define([
    'app',
    'lib/com/rpi/angular/widgets/directives/widget',
    'lib/com/rpi/angular/widgets/installed/directives/widgets',
    'angularjsView!./main.html'
], function (app) {
    "use strict";

    app.register.controller('Pages.MainController', [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {
            console.log("Components.MainController");

            var eventListeners = [];
            $scope.isEditMode = false;

            eventListeners.push($rootScope.$on('WidgetsController.editMode', function (event, data) {
                $scope.isEditMode = data.isEditMode;
            }));

            $scope.$on('$destroy', function() {
                for (var i = 0; i < eventListeners.length; i++) {
                    eventListeners[i]();
                }
            });
        }]
    );
});

