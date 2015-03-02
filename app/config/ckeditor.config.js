/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
    'app',
    'lib/com/rpi/angular/ckeditor/providers/config'
], function(app) {
    "use strict";

    app.config([
        'Lib.Com.Rpi.Angular.CKEditor.ConfigProvider',
        function(ckeditorConfigProvider) {
            ckeditorConfigProvider.config({
                basePath: "/bower_components/ckeditor/",
                contentsCss: "css/ckeditor/contents.css"
            });
        }]);
});
