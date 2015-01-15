/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'angular',
    'lib/angular/ng-ckeditor/ng-ckeditor',
    'lib/com/rpi/angular/schema-form/decorators/bootstrap/bootstrap-decorator',
    'angularjsView!./ckeditor.html'
], function (angular) {
    "use strict";

    angular
        .module('schemaForm-ckeditor', ['schemaForm', 'ngCkeditor'])
        .config(
            [
                'schemaFormProvider',
                'schemaFormDecoratorsProvider',
                'sfPathProvider',
                function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
                    var wysiwyg = function(name, schema, options) {
                        if (schema.type === 'string' && schema.format === 'html') {
                            var f = schemaFormProvider.stdFormObj(name, schema, options);
                            f.key = options.path;
                            f.type = 'wysiwyg';
                            options.lookup[sfPathProvider.stringify(options.path)] = f;
                            return f;
                        }
                    };
                    schemaFormProvider.defaults.string.unshift(wysiwyg);
                    //Add to the bootstrap directive
                    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'wysiwyg', 'lib/com/rpi/angular/schema-form/plugins/ckeditor/ckeditor.html');
                    schemaFormDecoratorsProvider.createDirective('wysiwyg', 'lib/com/rpi/angular/schema-form/plugins/ckeditor/ckeditor.html');
                }
            ]
        );
});
