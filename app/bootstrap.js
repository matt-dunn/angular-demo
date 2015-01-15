require([
    'angular',
    'app',
    'app.config',
    'app.routes'
],
    function(angular, app) {
        angular.element(document).ready(function() {
            angular.bootstrap(document, [app.name]);
        });
    });