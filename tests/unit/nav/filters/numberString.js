"use strict";

describe("snNumberString", function() {
    var scope, rootScope, filter;

    beforeEach(module("thisissoon.nav.snNumberString"));

    beforeEach(inject(function ($rootScope, $filter, $injector) {
        scope = $rootScope.$new();

        rootScope = $rootScope;

        filter = $filter("snNumberString");

    }));

    it("should return text representation of numbers between 1 and 10", function(){

        var numberStrings = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

        for(var i = 1; i<=10; i++){
            var result = filter(i);
            expect(result).toEqual(numberStrings[i]);
        }
    });

});
