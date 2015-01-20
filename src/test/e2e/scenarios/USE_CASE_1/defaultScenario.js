(function () {
    'use strict';

    /*
     http://docs.angularjs.org/guide/dev_guide.e2e-testing
     http://angular.github.io/protractor/#/api
     */

    var mock = require('protractor-http-mock');

    describe('USE_CASE_1', function() {

        afterEach(function(){
            mock.teardown();
        });

        describe('Default page', function() {
            it('should redirect index.html to index.html#/about', function() {
                browser.get('app/index.html');
                browser.getLocationAbsUrl().then(function(url) {
                    expect(url.split('#')[1]).toBe('/about');
                });
            });
        });
    });
}());