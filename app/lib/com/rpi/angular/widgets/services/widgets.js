/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app',
    'angular'
], function (
    app,
    angular
    ) {
    "use strict";

    app.register.service('Lib.Com.Rpi.Angular.Widgets.Services.WidgetsService', ['$q', '$http', 'localStorageService',
        function($q, $http, localStorageService) {
            var _queue = [],
                _data = {
                    widgets: null
                };

            function saveWidgets(widgets) {
                var defer = $q.defer();

                console.log("saveWidgets", widgets);
                localStorageService.set("WidgetsService.data", widgets);

                defer.resolve();

                return defer.promise;
            }

            function getWidgets() {
                var defer = $q.defer();

                if (!_data.widgets) {
                    _data.widgets = localStorageService.get("WidgetsService.data");
                }

                if (_data.widgets) {
                    defer.resolve(_data.widgets);
                } else if(_queue.length === 0) {
                    _queue.push(defer);

                    $http.get('widgets/widgets.json').success(function(response) {
                        // Normalise the response...
                        angular.forEach(response.sections, function(section) {
                            angular.forEach(section.installed, function(type, key) {
                                section.installed[key] = findWidget(response.available, type).widget;
                            });
                        });

                        var availableWidgets = [];
                        angular.forEach(response.available, function(widget) {
                            if (findWidgetInSection(response.sections, widget.type) === false) {
                                availableWidgets.push(widget);
                            }
                        });

                        response.available = availableWidgets;

                        _data.widgets = response;

                        for (var i = 0; i < _queue.length; i++) {
                            _queue[i].resolve(_data.widgets);
                        }
                    });
                } else {
                    _queue.push(defer);
                }

                return defer.promise;
            }

            function findWidgetByType(widgets, type) {
                var widget = findWidget(widgets.available, type);

                if (widget === false) {
                    widget = findWidgetInSection(widgets.sections, type);
                }

                return widget;
            }

            function findWidget(widgets, type) {
                for (var i = 0; i < widgets.length; i++) {
                    if (widgets[i].type === type) {
                        return {
                            widget: widgets[i],
                            index: i
                        };
                    }
                }

                return false;
            }

            function findWidgetInSection(sections, type) {
                var ret = false;

                angular.forEach(sections, function(section) {
                    for (var i = 0; i < section.installed.length; i++) {
                        if (section.installed[i].type === type) {
                            ret = {
                                widget: section.installed[i],
                                index: i
                            };
                            break;
                        }
                    }
                });

                return ret;
            }

            var widgetsService = {
                /**
                 * Get widget data
                 *
                 * @returns {angular.Promise}
                 */
                getWidgets: function() {
                    return getWidgets();
                },

                /**
                 * Return a collection of available widgets
                 *
                 * @returns {angular.Promise}
                 */
                getAvailableWidgets: function() {
                    var defer = $q.defer();

                    getWidgets().then(function(widgets) {
                        defer.resolve(widgets.available);
                    });

                    return defer.promise;
                },

                /**
                 * Return a collection of widgets installed into a specified section
                 *
                 * @param {string} section
                 * @returns {angular.Promise}
                 */
                getInstalledWidgets: function(section) {
                    var defer = $q.defer();

                    getWidgets().then(function(widgets) {
                        // @TODO: Throw exception if section not found
                        defer.resolve(widgets.sections[section].installed);
                    });

                    return defer.promise;
                },

                /**
                 * Save widget data
                 *
                 * @returns {angular.Promise}
                 */
                save: function() {
                    var defer = $q.defer();

                    getWidgets().then(function(widgets) {
                        saveWidgets(widgets).then(function() {
                            defer.resolve(angular.copy(widgets));
                        });
                    });

                    return defer.promise;
                },

                /**
                 * Add a widget to a section
                 *
                 * @param {string} type
                 * @param {string} section
                 * @returns {angular.Promise}
                 */
                add: function(type, section) {
                    var defer = $q.defer();

                    // @TODO: Throw exception if type not found
                    getWidgets().then(function(widgets) {
                        var widgetDetails = findWidget(widgets.available, type);

                        if (widgetDetails !== false) {
                            if (!widgets.sections[section]) {
                                widgets.sections[section] = {
                                    installed: []
                                };
                            }

                            widgets.available.splice(widgetDetails.index, 1);
                            widgets.sections[section].installed.push(widgetDetails.widget);

                            saveWidgets(widgets).then(function() {
                                defer.resolve(angular.copy(widgets.sections[section].installed));
                            });
                        } else {
                            // @TODO: throw exception
                            defer.reject(widgets.sections[section].installed);
                        }
                    });

                    return defer.promise;
                },

                /**
                 * Remove a widget from a section
                 *
                 * @param {string} type
                 * @param {string} section
                 * @returns {angular.Promise}
                 */
                remove: function(type, section) {
                    var defer = $q.defer();

                    // @TODO: Throw exception if type or section not found
                    getWidgets().then(function(widgets) {
                        var widgetDetails = findWidgetInSection([widgets.sections[section]], type);

                        if (widgetDetails !== false) {
                            widgets.sections[section].installed.splice(widgetDetails.index, 1);
                            widgets.available.push(widgetDetails.widget);


                            saveWidgets(widgets).then(function() {
                                defer.resolve(angular.copy(widgets.sections[section].installed));
                            });
                        } else {
                            // @TODO: throw exception
                            defer.reject(angular.copy(widgets.sections[section].installed));
                        }
                    });

                    return defer.promise;
                },

                /**
                 * Define the settings for a widget
                 *
                 * @param {string} type
                 * @param {object} settings
                 * @returns {angular.Promise}
                 */
                setSettings: function(type, settings) {
                    var defer = $q.defer();

                    getWidgets().then(function(widgets) {
                        var foundWidget = findWidgetByType(widgets, type);
                        if (foundWidget !== false) {
                            foundWidget.widget.settings.model = settings;

                            saveWidgets(widgets).then(function() {
                                defer.resolve();
                            });
                        } else {
                            // @TODO: throw exception?
                            defer.reject();
                        }
                    });

                    return defer.promise;
                },

                /**
                 * Return the settings for a widget
                 *
                 * @param {string} type
                 * @returns {angular.Promise}
                 */
                getSettings: function(type) {
                    var defer = $q.defer();

                    getWidgets().then(function(widgets) {
                        var foundWidget = findWidgetByType(widgets, type);
                        if (foundWidget !== false) {
                            defer.resolve(angular.copy(foundWidget.widget.settings || {}).model);
                        } else {
                            // @TODO: throw exception?
                            defer.reject();
                        }
                    });

                    return defer.promise;
                }
            };

            return widgetsService;
        }]);
});
