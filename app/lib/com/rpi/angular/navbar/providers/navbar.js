/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'angular'
], function (angular) {
    'use strict';

    angular.module('rpi.navbar', []).provider('$navbar', function() {

        var defaults = this.defaults = {
            activeClass: 'active',
            routeAttr: 'data-match-route',
            routeDisplayAttr: 'data-match-route-display',
            strict: false
        };

        this.$get = function() {
            return {defaults: defaults};
        };

    });
});
