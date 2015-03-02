/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
], function() {
    "use strict";

    return {
        // See https://docs.angularjs.org/guide/production
        angular: {
            // Need to keep debug info for production as ng-sortable uses ng-element.scope() which requires debug info to work :(
            debugInfoEnabled: true,
            strictDi: false
        }
    };
});
