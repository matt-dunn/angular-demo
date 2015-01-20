(function () {
    'use strict';

    /*
     http://docs.angularjs.org/guide/dev_guide.e2e-testing
     http://angular.github.io/protractor/#/api
     */

    var mock = require('protractor-http-mock');

    describe('USE_CASE_2', function() {

        afterEach(function(){
            mock.teardown();
        });

        describe('Available widgets', function() {
            beforeEach(function() {
                mock(["widgets"]);

                browser.get('app/index.html#/main');

                // Click options > edit:
                element.all(by.css('nav.navbar-default .dropdown.options')).first().click();
                element.all(by.css('nav.navbar-default .dropdown.options ul > li:first-of-type > a')).first().click();
            });

            it('should display list of available widgets', function() {
                element.all(by.css('section.widgets-available')).first().isDisplayed().then(function(isDisplayed) {
                    expect(isDisplayed).toBe(true);
                });
            });

            it('should display available widgets title', function() {
                element.all(by.repeater('widget in widgetData.widgets')).then(function(widgets){
                    expect(widgets.length).toBe(2);

                    expect(widgets[0].all(by.xpath("section/header/h1")).first().getText()).toBe('Test Component 1');
                    expect(widgets[1].all(by.xpath("section/header/h1")).first().getText()).toBe('Test Component 2');
                });
            });
        });
    });
}());