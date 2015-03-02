define([
    'module',
    'app',
    'lib/com/rpi/angular/widgets/services/widgets',
    'lib/com/rpi/angular/providers/angular-css-injector',
    'angularjsView!./accordionDemo.html'
], function(module, app) {
    "use strict";

    app.register.controller('Components.Demo.AccordionDemoController', [
        '$scope',
        'cssInjector',
        'Lib.Com.Rpi.Angular.Widgets.Services.WidgetsService',
        function(
            $scope,
            cssInjector,
            WidgetsService
            ) {

            cssInjector.add("css/main.css", module).then(function() {
                WidgetsService.getSettings("Components.Demo.AccordionDemo").then(function(settings) {
                    console.log("SETUP Components.Demo.AccordionDemoController");

                    $scope.data = {settings: settings};

                    $scope.groups = [
                        {
                            title: 'Dynamic Group Header - 1',
                            content: 'Dynamic Group Body - 1'
                        },
                        {
                            title: 'Dynamic Group Header - 2',
                            content: 'Dynamic Group Body - 2'
                        },
                        {
                            title: 'Dynamic Group Header - 3',
                            content: 'Dynamic Group Body - 3'
                        }
                    ];

                    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

                    $scope.status = {
                        isFirstOpen: true,
                        isFirstDisabled: false
                    };
                });
            });

            $scope.addItem = function() {
                var newItemNo = $scope.items.length + 1;
                $scope.items.push('Item ' + newItemNo);
            };

            $scope.saveSettings = function() {
                WidgetsService.setSettings("Components.Demo.AccordionDemo", $scope.data.settings);
            };

            $scope.$on("WidgetsController.settings.updated", function(event, data) {
                $scope.data.settings = data.settings;
            });
        }]
    );
});
