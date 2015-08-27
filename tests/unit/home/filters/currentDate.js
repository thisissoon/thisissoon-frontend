"use strict";

describe("currentDate", function() {
    var scope, rootScope, filter;

    beforeEach(module("thisissoon.home.currentDate"));

    beforeEach(inject(function ($rootScope, $filter, $injector) {
        scope = $rootScope.$new();

        rootScope = $rootScope;

        filter = $filter("currentDate");

    }));

    it("should return currentDate", function(){
        var result = filter(),
            today = new Date();

        result = new Date(result);

        expect(result.getDate()).toEqual(today.getDate());
        expect(result.getFullYear()).toEqual(today.getFullYear());
        expect(result.getMonth()).toEqual(today.getMonth());
    });

});
