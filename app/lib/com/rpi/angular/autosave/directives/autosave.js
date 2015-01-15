define([
    'app',
    'lib/moment',
    '../services/data'
], function (app, moment) {
    "use strict";

    app.register.directive('autosave', [
        '$compile',
        function($compile) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    autosave: '=',
                    model: '=ngModel'
                },
                link: function($scope, $element, $attrs, $control) {
                    if ($scope.autosave !== false) {
                        if ($element[0].tagName !== "TEXTAREA") {
                            throw new Error("'autosave' directive only supported on textarea elements");
                        }

                        $scope.control = $control;

                        $element.parent().prepend(
                            $compile(
                                '<p class="save-details"><span ng-show="isSaving || isPreparingSave">Saving&#x2026;</span><span ng-show="!control.$dirty">Saved {{saveElapsedDuration}}</span></p>'
                            )($scope)
                        );
                    }
                },
                controller: [
                    '$scope',
                    'Lib.Com.Rpi.Angular.Directives.Autosave.Services.DataService',
                    '$timeout',
                    '$interval',
                    function($scope, DataService, $timeout, $interval) {
                        var checkSave = false,
                            lastSaved = null,
                            timeoutInstance,
                            intervalTimeout;
                        $scope.isPreparingSave = false;
                        $scope.isSaving = false;
                        $scope.saveElapsedDuration = null;

                        if ($scope.autosave !== false) {
                            $scope.$watch("model", function() {
                                if ($scope.$parent.isReady === true || $scope.$parent.isReady === undefined) {
                                    save();
                                }
                            });

                            $scope.$on("$destroy", function() {
                                $interval.cancel(intervalTimeout);
                                $timeout.cancel(timeoutInstance);
                                console.log("DESTROY AUTOSAVE");
                            });
                        }

                        function save() {
                            if ($scope.model !== null && $scope.model !== undefined) {
                                if (!lastSaved) {
                                    intervalTimeout = $interval(setElapsedDuration, 1000 * 60);
                                }

                                if (!$scope.isPreparingSave && !$scope.isSaving) {
                                    $scope.isPreparingSave = true;
                                    timeoutInstance = $timeout(function() {
                                        if ($scope.model !== null && $scope.model !== undefined) {
                                            checkSave = false;
                                            $scope.isSaving = true;
                                            $scope.isPreparingSave = false;
                                            DataService.save($scope.model).then(function() {
                                                $scope.isSaving = false;

                                                if (checkSave) {
                                                    console.log("DO AGAIN...");
                                                    save();
                                                } else {
                                                    $scope.isSaving = false;
                                                    $scope.control.$setPristine();
                                                    lastSaved = new Date();

                                                    setElapsedDuration();
                                                }
                                            });
                                        } else {
                                            checkSave = false;
                                            $scope.isSaving = false;
                                            $scope.isPreparingSave = false;
                                        }
                                    }, 5000);
                                } else {
                                    checkSave = true;
                                }
                            }
                        }

                        function setElapsedDuration() {
                            if (lastSaved) {
                                $scope.saveElapsedDuration = moment
                                    .duration(moment(lastSaved).diff(new Date()), "milliseconds")
                                    .humanize(true);
                            }
                        }
                }]
            };
        }]);
});

