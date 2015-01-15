/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'require',
    'module',
    'angular'
], function (require, module, angular) {
    "use strict";

    var moduleConfig = module.config(),
        dependencyResolver = function () {
            var self = this;

            this.$get = ['$q', function ($q) {
                return {
                    load: function(components) {
                        if (!angular.isArray(components)) {
                            components = [components];
                        }
                        var dependencies = [];
                        angular.forEach(components, function(baseName) {
                            dependencies.push(self.routeConfig.getControllerUrl(baseName));
                        });

                        var defer = $q.defer();
                        require(dependencies, function () {
                            defer.resolve();
                        });

                        return defer.promise;
                    },
                    getTemplateUrl: function(component) {
                        return self.routeConfig.getTemplateUrl(component);
                    },
                    getBaseUrl: function(component) {
                        return self.routeConfig.getBaseUrl(component);
                    }
                };
            }];

            this.routeConfig = (function () {
                var controllersDirectory = moduleConfig.controllersDirectory || '',

                    getBaseUrl = function (baseName) {
                        return getNameDetails(baseName).path;
                    },

                    getControllerUrl = function (baseName) {
                        var details = getNameDetails(baseName);
                        return details.path + details.name + 'Controller' + (moduleConfig.useMinified ? ".min" : "");
                    },

                    getTemplateUrl = function (baseName) {
                        var details = getNameDetails(baseName);
                        return details.path + details.name + (moduleConfig.useMinified ? ".min" : "") + '.html';
                    };

                function getNameDetails(baseName) {
                    var parts = baseName.split(".");
                    for (var i = 0; i < parts.length; i++) {
                        parts[i] = parts[i].lowerCamelCase();
                    }

                    return {
                        path: controllersDirectory + parts.join("/") + "/",
                        name: parts[parts.length - 1]
                    };
                }

                return {
                    getBaseUrl: getBaseUrl,
                    getControllerUrl: getControllerUrl,
                    getTemplateUrl: getTemplateUrl
                };
            }());

            this.route = (function (routeConfig) {
                var resolve = function (baseName, secure, setController) {
                        var routeDef = {};
                        routeDef.templateUrl = routeConfig.getTemplateUrl(baseName);
                        if (setController) {
                            routeDef.controller = baseName + 'Controller';
                        }
                        routeDef.secure = (secure) ? secure : false;
                        routeDef.resolve = {
                            load: ['$q', '$rootScope', function ($q, $rootScope) {
                                var dependencies = [routeConfig.getControllerUrl(baseName)];
                                return resolveDependencies($q, $rootScope, dependencies);
                            }]
                        };

                        return routeDef;
                    },

                    resolveDependencies = function ($q, $rootScope, dependencies) {
                        var defer = $q.defer();
                        require(dependencies, function () {
                            defer.resolve();
                            $rootScope.$apply();
                        });

                        return defer.promise;
                    };

                return {
                    resolve: resolve
                };
            }(this.routeConfig));

        };

    var servicesApp = angular.module('dependencyResolverServices', []);

    servicesApp.provider('dependencyResolver', dependencyResolver);
});
