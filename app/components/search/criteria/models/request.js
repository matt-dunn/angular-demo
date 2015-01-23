define([
    'angular'
], function (angular) {
    "use strict";

    return function(request) {
        var model = {
            /**
             *
             * @param type
             * @param term
             */
            addCondition: function(type, term) {
                // TODO: check for valid type
                this.request[type].push(term);
            },

            /**
             *
             * @param type
             * @param term
             */
            removeCondition: function(type, term) {
                // TODO: check for valid type/term
                this.request[type].splice(this.request[type].indexOf(term), 1);
            },
            request: {
                all: [],
                exact: [],
                any: [],
                exclude: []
            }
        };

        if (request) {
            // TODO: check object
            model.request = angular.extend({}, model.request, request);
        }

        return model;
    };
});

