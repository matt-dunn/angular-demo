/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app'
], function(
    app
    ) {
    "use strict";

    app.register.service('Components.Demo.EditorDemo.Services.Data', ['$q', '$timeout',
        function($q, $timeout) {
            var dataService = {
                load: function() {
                    var defer = $q.defer();

                    $timeout(function() {
                        defer.resolve("<p>Hello <strong>World</strong>!!!</p>");
                    }, 10);

                    return defer.promise;
                },

                save: function(content) {
                    var defer = $q.defer();

                    console.log("Saving...", content);
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
