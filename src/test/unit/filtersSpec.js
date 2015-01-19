console.log("OK")

describe('checkmark', function() {
    console.log("T")

    it('should convert boolean values to unicode checkmark or cross', function() {
        console.log("T")
        expect(true).toBe(false)
    });
});


//require.config({
//    baseUrl: "/",
//    paths: {
//    },
//    shim: {
//    },
//    urlArgs: 'bust=' + (new Date()).getTime()
//});
//
//require(['app', 'lib/com/rpi/angular/filters/checkmark'], function(app){
//    describe('filter', function() {
//
//        describe('checkmark', function() {
//
//            it('should convert boolean values to unicode checkmark or cross', function() {
//                expect(true).toBe(false)
//            });
//        });
//
////        beforeEach(app);
////
////
////        describe('checkmark', function() {
////
////            it('should convert boolean values to unicode checkmark or cross',
////                inject(function(checkmarkFilter) {
//////                    expect(checkmarkFilter(true)).toBe('\u2713');
//////                    expect(checkmarkFilter(false)).toBe('\u2718');
////                    expect(true).toBe(true)
////                }));
////        });
//    });
//});
//
