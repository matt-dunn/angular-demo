/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
    'underscore',
    'angular',
    'lib/com/rpi/angular/schema-form/decorators/bootstrap/bootstrap-decorator',
    'angularjsView!./typeahead.html'
], function (_, angular) {
    "use strict";

    angular
        .module('schemaForm-typeahead', ['schemaForm'])
        .config(
            [
                'schemaFormProvider',
                'schemaFormDecoratorsProvider',
                'sfPathProvider',
                function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
                    var typeahead = function(name, schema, options) {
                        if ((schema.type === 'string' || schema.type === 'object') && schema.format === 'typeahead') {
                            var f = schemaFormProvider.stdFormObj(name, schema, options);
                            f.key = options.path;
                            f.type = 'typeahead';
                            options.lookup[sfPathProvider.stringify(options.path)] = f;
                            return f;
                        }
                    };
                    schemaFormProvider.defaults.string.unshift(typeahead);
                    schemaFormProvider.defaults.object.unshift(typeahead);

                    //Add to the bootstrap directive
                    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'typeahead', 'lib/com/rpi/angular/schema-form/plugins/typeahead/typeahead.html');
                    schemaFormDecoratorsProvider.createDirective('typeahead', 'lib/com/rpi/angular/schema-form/plugins/typeahead/typeahead.html');
                }
            ]
        ).directive('rpiTypeahead', [
            function() {
                return {
                    restrict: 'A',
                    controller: ['$scope', '$http', '$templateCache', function($scope, $http, $templateCache) {
                        var modelProperties = null;

                        $scope.typeaheadSelect = function() {
                            // Force the view value to change when an item is selected
                            $scope.ngModel.$setViewValue();
                        };

                        if ($scope.form.typeahead) {
                            if ($scope.form.typeahead.template) {
                                var key = "rpiTypeahead-" + $scope.form.$$hashKey;
                                $templateCache.put(key, $scope.form.typeahead.template);
                                $scope.templateUrl = key;
                            }

                            if ($scope.form.typeahead.modelProperties) {
                                modelProperties = $scope.form.typeahead.modelProperties;
                            }
                        }

                        $scope.getItems = function(val) {
                            if ($scope.form.titleMap) {
                                return $scope.form.titleMap.map(function(item){
                                    if (modelProperties) {
                                        return _.pick.apply(null, [item].concat(modelProperties));
                                    } else {
                                        return item.name;
                                    }
                                });
                            } else if ($scope.form.typeahead && $scope.form.typeahead.serviceEndpoint) {
                                return $http.get($scope.form.typeahead.serviceEndpoint, {
                                    params: {
                                        address: val,
                                        sensor: false
                                    }
                                }).then(function(response){
                                    return response.data.results.map(function(item){
                                        if (modelProperties) {
                                            return _.pick.apply(null, [item].concat(modelProperties));
                                        } else {
                                            return item;
                                        }
                                    });
                                });
                            } else {
                                return [];
                            }
                        };
                    }]
                };
            }]);
});
