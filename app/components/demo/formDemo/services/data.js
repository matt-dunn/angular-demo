/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

define([
    'app'
], function (
    app
    ) {
    "use strict";

    app.register.service('Components.Demo.FormDemo.Services.Data', ['$q', '$timeout',
        function($q, $timeout) {
            var dataService = {
                load: function() {
                    var defer = $q.defer();

                    $timeout(function() {
                        defer.resolve({
                            model: {
                                "tests": [
                                    {
                                        checkboxTest: true,
                                        richTextTest1: "<p>Richtext <strong>Test</strong></p>",
                                        typeaheadTest: {
                                            name: "Item 2",
                                            value: "item2"
                                        },
                                        "inputTest": "valid"
                                    },
                                    {
                                        checkboxTest: true,
                                        richTextTest1: "<p>Richtext <strong>Test2!!!</strong></p>",
                                        "inputTest": "Valid"
                                    }
                                ]
                            },
                            schema: {
                                "type": "object",
                                "title": "Test",
                                "properties": {
                                    "tests": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "inputTest": { "type": "string", "minLength": 4, "title": "Input Test" },
                                                "richTextTest1": { "type": "string", "minLength": 2, "title": "Rich Text Test 1", "description": "Rich text description" },
                                                "richTextTest2": { "type": "string", "minLength": 2, "title": "Rich Text Test 2" },
                                                "checkboxTest": { "type": "boolean", "title": "Checkbox test" },
                                                "selectTest": {
                                                    "title": "Select Test",
                                                    "type": "string",
                                                    "enum": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"]
                                                },
                                                "typeaheadTest": {
                                                    "type": "object",
                                                    "title": "Typeahead Test", "format":"typeahead"
                                                },
                                                "typeaheadTestAsync": {
                                                    "type": "object",
                                                    "title": "Typeahead Async Test", "format":"typeahead"
                                                },
                                                "textAreaTest": { "type": "string", "minLength": 2, "title": "Textarea Test" }
                                            }
                                        }
                                    }
                                }
                            },
                            form:
                                [
                                    {
                                        "readonly": false,
                                        "key": "tests",
                                        "type": "tabarray",
                                        "add": "New",
                                        "remove": "Delete",
                                        "style": {
                                            "remove": "btn-default btn-sm"
                                        },
                                        "tabType": "top",
                                        "title": "value.typeaheadTest.name || 'Tab '+ ($index + 1)",
                                        "maxItems": 4,
                                        "allowDelete": true,
                                        "items": [
                                            {
                                                "key": "tests[]typeaheadTest",
                                                "type": "typeahead",
                                                "titleMap": [
                                                    { value: "item1", name: "Item 1" },
                                                    { value: "item2", name: "Item 2" },
                                                    { value: "item3", name: "Item 3" },
                                                    { value: "item4", name: "Item 4" },
                                                    { value: "item5", name: "Item 5" },
                                                    { value: "item6", name: "Item 6" },
                                                    { value: "item7", name: "Item 7" },
                                                    { value: "item8", name: "Item 8" },
                                                    { value: "item9", name: "Item 9" },
                                                    { value: "item10", name: "Item 10" }
                                                ],
                                                "readonly": false,
                                                "typeahead": {
                                                    "template": "<a>{{match.model.name}} <div class=\"secondary\">({{match.model.value}})</div></a>",
                                                    "formatter": "$model.name",
                                                    "modelProperties": ["name", "value"]
                                                },
                                                "customValidators": [
                                                    {
                                                        "type": "sf-validator.test.sync",
                                                        "validationMessage": {
                                                            "default": "Custom message: default",
                                                            "custom": "Custom message: custom"
                                                        }
                                                    }
                                                ],
                                                "validationMessage": {
                                                    "default": "You must select an item from the list"
                                                }
                                            },
                                            {
                                                "key": "tests[]typeaheadTestAsync",
                                                "type": "typeahead",
                                                "typeahead": {
                                                    "serviceEndpoint": "http://maps.googleapis.com/maps/api/geocode/json",
                                                    "template": "<a>{{match.model.formatted_address}}</a>",
                                                    "formatter": "$model.formatted_address",
                                                    "modelProperties": ["formatted_address", "geometry"]
                                                },
                                                "validationMessage": {
                                                    "default": "Please select a location from the list"
                                                }
                                            },
                                            {
                                                "key": "tests[]richTextTest1",
                                                "type": "wysiwyg",
                                                "autosave": true,
                                                "ckeditorOptions": {
                                                    "height": "100px",
                                                    "removePlugins": "elementspath",
                                                    "toolbar": [
                                                        {
                                                            "name": "basicstyles",
                                                            "items": [ "Bold", "Italic", "Strike", "Underline" ]
                                                        },
                                                        {
                                                            "name": "extra",
                                                            "items": [ "Subscript", "Superscript" ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "key": "tests[]richTextTest2",
                                                "type": "wysiwyg",
                                                "autosave": false,
                                                "ckeditorOptions": {
                                                    "height": "100px",
                                                    "removePlugins": "elementspath",
                                                    "toolbar": [
                                                        {
                                                            "name": "basicstyles",
                                                            "items": [ "Bold", "Italic", "Strike", "Underline" ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "key": "tests[]inputTest",
                                                "customValidators": [
                                                    {
                                                        "type": "sf-validator.test.async",
                                                        "validationMessage": {
                                                            "default": "This is not a valid value!"
                                                        }
                                                    }
                                                ],
                                                "validationMessage": {
                                                    "200": "OVERRIDE: String is too short"
                                                },
                                                "required": true
                                            },
                                            "tests[]checkboxTest",
                                            {
                                                "key": "tests[]selectTest",
                                                "type": "select"
                                            },
                                            {
                                                "key": "tests[]textAreaTest",
                                                "type": "textarea"
                                            }
                                        ]
                                    }
                                ]
                        });
                    }, 1000);

                    return defer.promise;
                },

                save: function(data) {
                    var defer = $q.defer();

                    console.log("Saving...", data);
                    $timeout(function() {
                        console.log("SAVED");
                        defer.resolve();
                    }, 2000);

                    return defer.promise;
                }
            };

            return dataService;
        }]);
});
