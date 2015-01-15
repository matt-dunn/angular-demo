/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app'
], function (
    app
    ) {
    "use strict";

    app.register.service('Lib.Com.Rpi.Angular.Directives.Autosave.Services.DataService', ['$q', '$timeout',
        function($q, $timeout) {
            var dataService = {
                save: function(data) {
                    var defer = $q.defer();

                    console.log("Saving...", data);
                    $timeout(function() {
                        console.log("SAVED");
                        defer.resolve();
                    }, 2000);

                    return defer.promise;
                }
            };

            return dataService;
        }]);
});
