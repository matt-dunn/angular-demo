/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'angular',
    'app',
    './../services/widgets',
    'dependencyResolver',
    '../directives/widget',
    'angularjsView!./installed.html'
], function (angular, app) {
    "use strict";

    app.register.controller('Lib.Com.Rpi.Angular.Widgets.InstalledController', [
        '$scope',
        'Lib.Com.Rpi.Angular.Widgets.Services.WidgetsService',
        '$rootScope',
        '$modal',
        '$q',
        'dependencyResolver',
        function($scope, WidgetsService, $rootScope, $modal, $q, dependencyResolver) {
            var eventListeners = [];
            $scope.isEditMode = false;
            $scope.widgetData = {};

            WidgetsService
                .getInstalledWidgets($scope.section)
                .then(function(widgets) {
                    $scope.widgetData.widgets = widgets;
                });

            $scope.install = function (type, widget) {
                WidgetsService.install(widget).then(function() {
                    $rootScope.$emit('WidgetsController.installed', {widget: widget});
                });
            };

            $scope.add = function (type, widget) {
                WidgetsService.add(type, $scope.section).then(function() {
                    $rootScope.$emit('WidgetsController.installed', {widget: widget});
                });
            };

            $scope.remove = function (type, widget) {
                WidgetsService.remove(type, $scope.section).then(function() {
                    $rootScope.$emit('WidgetsController.removed', {widget: widget});
                });
            };

            // @TODO: move into service?
            $scope.displaySettings = function(widget) {
                if (widget.settings) {
                    var defer = $q.defer(), controller, template;

                    if (widget.settings["schema-form"]) {
                        controller = "Lib.Com.Rpi.Angular.Widgets.Settings";
                        template = dependencyResolver.getTemplateUrl(controller);
                    } else if (widget.settings.controller) {
                        controller = widget.settings.controller;
                        template = dependencyResolver.getTemplateUrl(controller);
                    }

                    dependencyResolver.load(controller).then(function() {
                        defer.resolve();
                    });

                    defer.promise.then(function() {
                        var modalInstance = $modal.open({
                            templateUrl: template,
                            controller: controller + "Controller",
                            size: (widget.settings.modal || {}).size || '',
                            resolve: {
                                widget: function () {
                                    return angular.copy(widget);
                                }
                            }
                        });

                        modalInstance.result.then(function (data) {
                            WidgetsService.setSettings(widget.type, data);
                            console.log("Model submitted", data);
                            $rootScope.$broadcast('WidgetsController.settings.updated', {settings: data});
                        }, function () {
                            console.info('Modal dismissed at: ' + new Date());
                        });
                    });
                }
            };

            eventListeners.push($rootScope.$on('WidgetsController.editMode', function (event, data) {
                $scope.isEditMode = data.isEditMode;
            }));

            eventListeners.push($rootScope.$on('WidgetsController.install', function (event, data) {
                if (data.section === $scope.section) {
                    $scope.install(data.type, data.widget);
                }
            }));

            eventListeners.push($rootScope.$on('WidgetsController.add', function (event, data) {
                if (data.section === $scope.section) {
                    $scope.add(data.type, data.widget);
                }
            }));

            eventListeners.push($rootScope.$on('WidgetsController.remove', function (event, data) {
                if (data.section === $scope.section) {
                    $scope.remove(data.type, data.widget);
                }
            }));

            $scope.$on('$destroy', function() {
                for (var i = 0; i < eventListeners.length; i++) {
                    eventListeners[i]();
                }
            });

            $scope.dragControlListeners = {
                accept: function () {
                    return true;
                },
                itemMoved: function (event) {
                    WidgetsService.install(event.source.itemScope.widget).then(function() {
                        $rootScope.$emit('WidgetsController.installed', {widget: event.source.itemScope.widget});
                    });
                    console.log("itemMoved", event.source.itemScope.widget, event.source.sortableScope.$parent.section, event.dest.sortableScope.$parent.section, event);
                },
                orderChanged: function(event) {
                    WidgetsService.install(event.source.itemScope.widget).then(function() {
                        $rootScope.$emit('WidgetsController.installed', {widget: event.source.itemScope.widget});
                    });
                    console.log("orderChanged", event.source.itemScope.widget, event.source.sortableScope.$parent.section, event.dest.sortableScope.$parent.section, event);
                }
//                containment: '.widgets-installed'
            };
        }]);
});

