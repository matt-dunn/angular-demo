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
], function (app, angular) {
    'use strict';

    app.register.directive('rpiNavbar', ['$window', '$location', '$navbar', function($window, $location, $navbar) {

        var defaults = $navbar.defaults;

        return {
            restrict: 'A',
            link: function postLink(scope, element, attr) {

                // Directive options
                var options = angular.copy(defaults);
                angular.forEach(Object.keys(defaults), function(key) {
                    if(angular.isDefined(attr[key])) {
                        options[key] = attr[key];
                    }
                });

                // Watch for the $location
                scope.$watch(function() {

                    return $location.path();

                }, function(newValue) {

                    var liElements = element[0].querySelectorAll('li[' + options.routeAttr + '], li[' + options.routeDisplayAttr + ']');

                    angular.forEach(liElements, function(li) {

                        var liElement = angular.element(li);

                        var liElementRoute = liElement.attr(options.routeAttr);
                        if (liElementRoute) {
                            var patternRoute = liElementRoute.replace('/', '\\/');
                            if(options.strict) {
                                patternRoute = '^' + patternRoute + '$';
                            }
                            var regexpRoute = new RegExp(patternRoute, ['i']);

                            if(regexpRoute.test(newValue)) {
                                liElement.addClass(options.activeClass);
                            } else {
                                liElement.removeClass(options.activeClass);
                            }
                        }

                        var liElementRouteDisplay = liElement.attr(options.routeDisplayAttr);
                        if (liElementRouteDisplay) {
                            var patternRouteDisplay = liElementRouteDisplay.replace('/', '\\/');
                            if(options.strict) {
                                patternRouteDisplay = '^' + patternRouteDisplay + '$';
                            }
                            var regexpRouteDisplay = new RegExp(patternRouteDisplay, ['i']);

                            if(regexpRouteDisplay.test(newValue)) {
                                liElement.css({display: "block"});
                            } else {
                                liElement.css({display: "none"});
                            }
                        }
                    });

                });

            }

        };

    }]);
});
