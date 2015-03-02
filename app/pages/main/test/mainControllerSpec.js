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
    '../mainController'
], function(app) {
    "use strict";

    beforeEach(module(app.name));

    describe('Pages.MainController', function() {
        var $rootScope,
            $scope,
            $httpBackend,
            $ctrl;

        beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;

            $ctrl = $controller('Pages.MainController', {$scope: $scope});

            $rootScope.$digest();
        }));

        describe('EditMode', function() {
            it('should default to false', function() {
                expect($scope.isEditMode).toBe(false);
            });

            it("should change to true on 'WidgetsController.editMode'", function() {
                $rootScope.$emit("WidgetsController.editMode", {isEditMode: true});

                expect($scope.isEditMode).toBe(true);
            });
        });
    });
});
