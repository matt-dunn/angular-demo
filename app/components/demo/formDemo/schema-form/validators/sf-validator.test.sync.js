define([
    'app'
], function (app) {
    "use strict";

    app.register.factory("sf-validator.test.sync", [function () {
        return {
            async: false,
            validate: function(modelValue) {
                if (modelValue && modelValue.value !== "item2") {
                    return false;
                }

                return true;
            }
        };
    }]);
});