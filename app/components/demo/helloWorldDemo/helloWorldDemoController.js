define([
    'app',
    'lib/com/rpi/angular/widgets/services/widgets',
    'angularjsView!./helloWorldDemo.html'
], function(app) {
    "use strict";

    app.register.controller('Components.Demo.HelloWorldDemoController', [
        '$scope',
        'Lib.Com.Rpi.Angular.Widgets.Services.WidgetsService',
        function(
            $scope,
            WidgetsService
            ) {

            WidgetsService.getSettings("Components.Demo.HelloWorldDemo").then(function(settings) {
                console.log("SETUP Components.Demo.HelloWorldDemoController", $scope, settings);

                $scope.data = {settings: settings};
            });

            $scope.$on("WidgetsController.settings.updated", function(event, data) {
                $scope.data.settings = data.settings;
            });
        }]
    );
});
