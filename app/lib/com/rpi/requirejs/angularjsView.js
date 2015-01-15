/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define(['lib/requirejs/text'], function (text) {
    'use strict';

    var buildMap = {},
        buildTemplateSource = "require(['app'], function (app) { app.run(['$templateCache', function($templateCache) {$templateCache.put('{moduleName}', {content});}]); });\n";

    return {
        version: '0.0.2',

        load: function (moduleName, parentRequire, onload, config) {
            if (config.isBuild) {
                if (buildMap[moduleName]) {
                    onload(buildMap[moduleName]);
                } else {
                    text.load(moduleName, parentRequire, function (source) {
                        if (config.isBuild) {
                            buildMap[moduleName] = "'" + source.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\$/g, '\\$') + "'";
                            onload();
                        }
                    }, config);
                }
            } else {
                // If not build then let angular do it's own thing...
                onload();
            }
        },

        write: function (pluginName, moduleName, write) {
            console.log("Compiling view", moduleName);
            var content = buildMap[moduleName];
            if (content) {
                write.asModule(pluginName + '!' + moduleName,
                    buildTemplateSource
                        .replace('{pluginName}', pluginName)
                        .replace(/\{moduleName\}/g, moduleName)
                        .replace('{content}', content));
            }
        }
    };
});
