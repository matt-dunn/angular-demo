define([
    'app',
    'lib/com/rpi/angular/navbar/directives/navbar',
    'angularjsView!./navBar.html'
], function(app) {
    "use strict";

    app.register.controller('Components.NavBarController', [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {
            var eventListeners = [];
            $scope.isEditMode = false;

            $scope.setEditMode = function() {
                $scope.isEditMode = !$scope.isEditMode;
                $rootScope.$emit('WidgetsController.editMode', {isEditMode: $scope.isEditMode});
            };

            eventListeners.push($rootScope.$on('WidgetsController.editMode', function(event, data) {
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
