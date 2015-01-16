///**!
// *
// * All rights reserved. Copyright (c) RPI Ltd 2014
// *
// * @author Matt Dunn
// *
// */
//
define([
    'app',
    '../availableController'
], function (app) {
    "use strict";

    beforeEach(module(app.name));

    describe('Lib.Com.Rpi.Angular.Widgets.AvailableController', function() {
        var $rootScope,
            $scope,
            $httpBackend,
            $ctrl;

        beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('widgets/widgets.json').
                respond(
                {
                    "available": [
                        {
                            "type": "Components.Demo.CarouselDemo",
                            "title": "Carousel Demo",
                            "description": "Carousel Demo description"
                        }
                    ],
                    "sections": {
                        "left": {
                            "installed": [
                            ]
                        },
                        "middle": {
                            "installed": [
                            ]
                        },
                        "middle-bottom": {
                            "installed": [
                            ]
                        },
                        "right": {
                            "installed": [
                            ]
                        }
                    }
                }
            );

            $ctrl = $controller('Lib.Com.Rpi.Angular.Widgets.AvailableController', {$scope: $scope});

            $rootScope.$digest();
        }));

        it('should toggle edit mode to true', function() {
            expect($scope.isEditMode).toBe(false)
            $scope.toggleEditMode();
            expect($scope.isEditMode).toBe(true)
        });
    });
});

