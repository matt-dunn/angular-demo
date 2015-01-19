define([
    'app',
    'lib/com/rpi/angular/widgets/directives/widget',
    'angularjsView!./about.html'
], function (app) {
    "use strict";

    app.register.controller('Pages.AboutController', [
        function() {
            console.log("Pages.AboutController");
        }]
    );
});

