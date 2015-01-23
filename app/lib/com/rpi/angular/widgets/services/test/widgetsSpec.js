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
            $service,
            $q;

        beforeEach(inject(['$rootScope', '$httpBackend', '$q', 'Lib.Com.Rpi.Angular.Widgets.Services.WidgetsService', function(_$rootScope_, _$httpBackend_, _$q_, _service_) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $service = _service_;
            $q = _$q_;

            $httpBackend
                .whenGET('/service/widgets/widgets.json')
                .respond(
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

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('getAvailableWidgets', function() {
            it('should return all available widgets', function() {
                var response = null;

                $service.getAvailableWidgets()
                    .then(function(widgets) {
                        response = widgets;
                    });

                $httpBackend.flush();

                $rootScope.$apply();

                expect(response).toEqual([
                    {
                        "type": "Components.Demo.CarouselDemo",
                        "title": "Carousel Demo",
                        "description": "Carousel Demo description"
                    }
                ]);
            });
        });
    });
});

