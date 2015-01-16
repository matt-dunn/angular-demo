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
    '../widgets'
], function (app) {
    "use strict";

    beforeEach(module(app.name));

    describe('Lib.Com.Rpi.Angular.Widgets.Services.WidgetsService', function() {
        var $rootScope,
            $scope,
            $httpBackend,
            $service;

        beforeEach(inject(['$rootScope', '$httpBackend', 'Lib.Com.Rpi.Angular.Widgets.Services.WidgetsService', function(_$rootScope_, _$httpBackend_, _$service_) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $service = _$service_;

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

            $rootScope.$digest();
        }]));

        describe('getAvailableWidgets', function() {
            it('should return all available widgets', inject(['$q', function ($q) {
                var deferredSuccess = $q.defer();
                deferredSuccess.resolve([
                    {
                        "type": "Components.Demo.CarouselDemo",
                        "title": "Carousel Demo",
                        "description": "Carousel Demo description"
                    }
                ]);
                spyOn($service, 'getAvailableWidgets').andReturn(deferredSuccess.promise);

                var result = null;
                $service.getAvailableWidgets().then(function(widgets) {
                    console.log("RESOLVED", widgets)
                    result = widgets;
                })

                $scope.$digest();
                expect(result).toEqual([
                    {
                        "type": "Components.Demo.CarouselDemo",
                        "title": "Carousel Demo",
                        "description": "Carousel Demo description"
                    }
                ]);
            }]));
        });
    });
});

