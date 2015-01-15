/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app'
], function (app) {
    "use strict";

    app.register.filter('checkmark', function() {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        };
    });
});
