/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**
 * This file is used for development and can be used to override any production settings, such as mocking
 */

define([
    'mock.config',
    'main'
],
    function(mockConfig) {
        "use strict";

        function parseMockConfig(config) {
            if (config) {
                var mockMap = {
                    "*": {}
                };

                for (var mock in config) {
                    if (config.hasOwnProperty(mock)) {
                        mockMap["*"][mock] = config[mock];
                    }
                }

                return mockMap;
            } else {
                return {};
            }
        }

        require.config({
            map: parseMockConfig(mockConfig)
        });
    }
);
