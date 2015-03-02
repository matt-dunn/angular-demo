define([
    'app',
    './services/data',
    'lib/com/rpi/angular/autosave/directives/autosave',
    'angularjsView!./editorDemo.html'
], function(app) {
    "use strict";

    app.register.controller('Components.Demo.EditorDemoController', [
        '$scope',
        'Components.Demo.EditorDemo.Services.Data',
        '$q',
        function($scope, DataService, $q) {
            $scope.editorOptions = {
                removePlugins: "elementspath"
            };

            var editorReady = $q.defer();

            $scope.$on("ckeditor.ready", function(e, instance) {
                console.log("ckeditor.ready");

                $scope.isReady = false;

                editorReady.resolve(instance);
            });

            $q.all([
                editorReady.promise,
                DataService.load()
            ]).then(function(data) {
                console.log("Editor ready and data retrieved");

                data[0].setData(data[1]).then(function() {
                    $scope.isReady = true;
                });
            });
        }]
    );
});
