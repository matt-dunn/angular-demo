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

    app.register.directive('rpiNavbar', ['$route', '$window', '$location', '$navbar', '$document', function($route, $window, $location, $navbar, $document) {

        var defaults = $navbar.defaults;

        return {
            restrict: 'A',
            scope: false,
            link: function postLink(scope, element, attr) {
                var $documentTitle = $document.find("title");
                if ($documentTitle.data("title") === undefined) {
                    $documentTitle.data("title", $documentTitle.text());
                }

                // Directive options
                var options = angular.copy(defaults);
                angular.forEach(Object.keys(defaults), function(key) {
                    if(angular.isDefined(attr[key])) {
                        options[key] = attr[key];
                    }
                });

                var matchedElement = element[0].querySelectorAll('[' + options.routeAttr + '=\'' + $route.current.$$route.originalPath + '\']');
                if (matchedElement.length > 0) {
                    $documentTitle.text(matchedElement[0].dataset.pageTitle + options.titleSeparator + $documentTitle.data("title"));
                } else {
                    $documentTitle.text($documentTitle.data("title"));
                }

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
