define([
    'app'
], function(app) {
    "use strict";

    app.register.factory("sf-validator.test.async", ['$q', '$timeout', function($q, $timeout) {
        var timeout = null;

        return {
            async: true,
            validate: function(modelValue) {
                var def = $q.defer();

                console.log("Checking...", modelValue);
                timeout = $timeout(function() {
                    // Mock a delayed response
                    if (modelValue.toLowerCase() === "valid") {
                        console.log("OK");
                        def.resolve();
                    } else {
                        console.log("NOPE");
                        def.reject("default");
                    }

                }, 2000);

                return def.promise;
            },
            abort: function() {
                console.log("Abort");
                $timeout.cancel(timeout);
            }
        };
    }]);
});
