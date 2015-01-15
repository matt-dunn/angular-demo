/*global define, CKEDITOR*/

(function(angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'ckeditor'], function(angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function(angular) {
    var app = angular.module('ngCkeditor', []);
    var $defer, loaded = false;

    app.run(['$q', '$timeout', function($q, $timeout) {
        $defer = $q.defer();

        if (angular.isUndefined(CKEDITOR)) {
            throw new Error('CKEDITOR not found');
        }
        CKEDITOR.disableAutoInline = true;
        function checkLoaded() {
            if (CKEDITOR.status === 'loaded') {
                loaded = true;
                $defer.resolve();
            } else {
                checkLoaded();
            }
        }
        CKEDITOR.on('loaded', checkLoaded);
        $timeout(checkLoaded, 100);
    }]);

    // @PATCH: added $parse, AppConfig
    app.directive('ckeditor', ['$timeout', '$q', '$parse', 'AppConfig', function ($timeout, $q, $parse, AppConfig) {
        'use strict';

        return {
            restrict: 'AC',
            require: ['ngModel', '^?form'],
            scope: false,
            link: function (scope, element, attrs, ctrls) {
                scope.isReady = false;

                var ngModel = ctrls[0];
                var form    = ctrls[1] || null;
                var EMPTY_HTML = '<p></p>',
                    isTextarea = element[0].tagName.toLowerCase() === 'textarea',
                    data = [],
                    isReady = false;

                if (!isTextarea) {
                    element.attr('contenteditable', true);
                }

                var onLoad = function () {
                    var options = {
                        toolbar: 'full',
                        toolbar_full: [ //jshint ignore:line
                            { name: 'basicstyles',
                                items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
                            { name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
                            { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                            { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                            { name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
                            '/',
                            { name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
                            { name: 'insert', items: [ 'Image', 'Table', 'SpecialChar' ] },
                            { name: 'forms', items: [ 'Outdent', 'Indent' ] },
                            { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                            { name: 'document', items: [ 'PageBreak', 'Source' ] }
                        ],
                        disableNativeSpellChecker: false,
                        uiColor: '#FAFAFA',
                        height: '400px',
                        width: '100%'
                    };
                    // @PATCH: get default config from AppConfig, use $parse to get config from dot.notation attribute
                    options = angular.extend(options, (AppConfig || {}).ckeditor, $parse(attrs.ckeditor)(scope));

                    var instance = (isTextarea) ? CKEDITOR.replace(element[0], options) : CKEDITOR.inline(element[0], options),
                        configLoaderDef = $q.defer();

                    element.bind('$destroy', function () {
                        // @PATCH: added try/catch
                        // @TODO: There is some kind of race condition which causes an exception when the ckeditor is destroyed and recreated too quickly...
                        console.log("Attempting to destroy ckeditor...");
                        try {
                            instance.destroy(
                                false //If the instance is replacing a DOM element, this parameter indicates whether or not to update the element with the instance contents.
                            );
                        } catch(ex) {
                            console.error(ex)
                        }
                    });
                    var setModelData = function(setPristine) {
                        var defer = $q.defer(),
                            data = instance.getData();
//                        if (data === '') {
//                            data = null;
//                        }
                        $timeout(function () { // for key up event
                            if (setPristine !== true || data !== ngModel.$viewValue)
                                ngModel.$setViewValue(data);

                            if (setPristine === true && form)
                                form.$setPristine();

                            defer.resolve();
                        }, 0);
                        return defer.promise;
                    }, onUpdateModelData = function(setPristine) {
                        var defer = $q.defer();
                        if (!data.length) { return; }


                        var item = data.pop() || EMPTY_HTML;
                        isReady = false;
                        instance.setData(item, function () {
                            setModelData(setPristine).then(function() {
                                defer.resolve();
                            });
                            isReady = true;
                        });
                        return defer.promise;
                    };

                    //instance.on('pasteState',   setModelData);
                    instance.on('change',       setModelData);
                    instance.on('blur',         setModelData);
                    //instance.on('key',          setModelData); // for source view

                    instance.on('instanceReady', function() {
                        onUpdateModelData(true).then(function() {
                            scope.isReady = true;
                            scope.$broadcast('ckeditor.ready', {
                                setData: function(content) {
                                    data.push(content);
                                    return onUpdateModelData(true);
                                }
                            });
                        });

                        instance.document.on('keyup', setModelData);
                    });
                    instance.on('customConfigLoaded', function() {
                        configLoaderDef.resolve();
                    });

                    ngModel.$render = function() {
                        data.push(ngModel.$viewValue);
                        if (isReady) {
                            onUpdateModelData();
                        }
                    };
                };

                if (CKEDITOR.status === 'loaded') {
                    loaded = true;
                }
                if (loaded) {
                    onLoad();
                } else {
                    $defer.promise.then(onLoad);
                }
            }
        };
    }]);

    return app;
}));