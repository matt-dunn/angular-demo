define([
    'app',
    'lib/showdown/extensions/github',
    'lib/showdown/extensions/table',
    'lib/showdown/extensions/prettify'
], function (app) {
    "use strict";

    app.provider("AppConfig", function() {
        this.$get = function() {
            return {
                ckeditor: {
                    customConfig: "",
                    contentsCss: "css/ckeditor/contents.css"
                }
            };
        };
    });

    app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        'markdownConverterProvider',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide, markdownConverterProvider) {
            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service,
                animation: app.animation
            };

            markdownConverterProvider.config({
                extensions: ['github', 'table', 'prettify']
            });
        }]);

    return app;
});
