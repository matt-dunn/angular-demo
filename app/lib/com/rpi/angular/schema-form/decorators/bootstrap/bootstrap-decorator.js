/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

define([
    'angular',
    'angularjsView!./actions.html',
    'angularjsView!./actions-trcl.html',
    'angularjsView!./array.html',
    'angularjsView!./checkbox.html',
    'angularjsView!./checkboxes.html',
    'angularjsView!./default.html',
    'angularjsView!./fieldset.html',
    'angularjsView!./fieldset-trcl.html',
    'angularjsView!./help.html',
    'angularjsView!./radio-buttons.html',
    'angularjsView!./radios.html',
    'angularjsView!./radios-inline.html',
    'angularjsView!./readonly.html',
    'angularjsView!./section.html',
    'angularjsView!./select.html',
    'angularjsView!./submit.html',
    'angularjsView!./tabarray.html',
    'angularjsView!./tabs.html',
    'angularjsView!./textarea.html'
], function (angular) {
    "use strict";

    angular.module('schemaForm').config(['schemaFormDecoratorsProvider', function(decoratorsProvider) {
            var base = 'lib/com/rpi/angular/schema-form/decorators/bootstrap/';

            decoratorsProvider.createDecorator('bootstrapDecorator', {
                textarea: base + 'textarea.html',
                fieldset: base + 'fieldset.html',
                array: base + 'array.html',
                tabarray: base + 'tabarray.html',
                tabs: base + 'tabs.html',
                section: base + 'section.html',
                conditional: base + 'section.html',
                actions: base + 'actions.html',
                select: base + 'select.html',
                checkbox: base + 'checkbox.html',
                checkboxes: base + 'checkboxes.html',
                number: base + 'default.html',
                password: base + 'default.html',
                submit: base + 'submit.html',
                button: base + 'submit.html',
                radios: base + 'radios.html',
                'radios-inline': base + 'radios-inline.html',
                radiobuttons: base + 'radio-buttons.html',
                help: base + 'help.html',
                'default': base + 'default.html'
            }, [
                // function(form) {
                //   if (form.readonly && form.key && form.type !== 'fieldset') {
                //     return base + 'readonly.html';
                //   }
                // }
            ]);

            //manual use directives
            decoratorsProvider.createDirectives({
                textarea: base + 'textarea.html',
                select: base + 'select.html',
                checkbox: base + 'checkbox.html',
                checkboxes: base + 'checkboxes.html',
                number: base + 'default.html',
                submit: base + 'submit.html',
                button: base + 'submit.html',
                text: base + 'default.html',
                date: base + 'default.html',
                password: base + 'default.html',
                datepicker: base + 'datepicker.html',
                input: base + 'default.html',
                radios: base + 'radios.html',
                'radios-inline': base + 'radios-inline.html',
                radiobuttons: base + 'radio-buttons.html',
            });

        }]).directive('sfFieldset', function() {
        return {
            transclude: true,
            scope: true,
            templateUrl: 'directives/decorators/bootstrap/fieldset-trcl.html',
            link: function(scope, element, attrs) {
                scope.title = scope.$eval(attrs.title);
            }
        };
    });
});

