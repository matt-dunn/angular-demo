/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app',
    './../services/widgets',
    'angularjsView!./available.html'
], function (app) {
    "use strict";

    app.register.controller('Lib.Com.Rpi.Angular.Widgets.AvailableController', [
        '$scope',
        'Lib.Com.Rpi.Angular.Widgets.Services.WidgetsService',
        '$rootScope',
        function($scope, WidgetsService, $rootScope) {
            var eventListeners = [];
            $scope.isEditMode = false;
            $scope.widgetData = {};

            WidgetsService
                .getAvailableWidgets()
                .then(function(widgets) {
                    $scope.widgetData.widgets = widgets;
                });

            $scope.toggleEditMode = function() {
                $rootScope.$emit('WidgetsController.editMode', {isEditMode: !$scope.isEditMode});
            };

            $scope.add = function (type, widget, section) {
                $rootScope.$emit('WidgetsController.add', {type: type, widget: widget, section: section});
            };

            eventListeners.push($rootScope.$on('WidgetsController.editMode', function (event, data) {
                $scope.isEditMode = data.isEditMode;
            }));

            eventListeners.push($rootScope.$on('WidgetsController.installed', function (event, data) {
                console.log("WidgetsController.installed", data);
            }));

            eventListeners.push($rootScope.$on('WidgetsController.removed', function (event, data) {
                console.log("WidgetsController.removed", data);
            }));

            $scope.$on('$destroy', function() {
                for (var i = 0; i < eventListeners.length; i++) {
                    eventListeners[i]();
                }
            });

            $scope.dragControlListeners = {
                accept: function () {
                    return false;
                },
                itemMoved: function (event) {
                    $rootScope.$emit('WidgetsController.install', {
                        type: event.source.itemScope.widget.type,
                        widget: event.source.itemScope.widget,
                        section: event.dest.sortableScope.$parent.section
                    });
                }
            };
        }]);
});

