/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
    'app',
    'lib/showdown/extensions/github',
    'lib/showdown/extensions/table',
    'lib/showdown/extensions/prettify',
    'lib/showdown/extensions/hash',
    'lib/showdown/extensions/gherkin'
], function (app) {
    "use strict";

    app.config([
        'markdownConverterProvider',
        function (markdownConverterProvider) {
            markdownConverterProvider.config({
                extensions: ['github', 'table', 'prettify', 'hash', 'gherkin']
            });
        }]);
});
