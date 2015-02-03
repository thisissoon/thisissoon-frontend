"use strict";

describe("linkDisplay", function() {
    var scope, rootScope, filter;

    beforeEach(module("thisissoon.core"));

    beforeEach(inject(function ($rootScope, $filter, $injector) {
        scope = $rootScope.$new();

        rootScope = $rootScope;

        filter = $filter("linkDisplay");

    }));

    it("should return link without 'http://www'", function(){
        var result = filter("http://www.thisissoon.com");
        expect(result).toEqual("thisissoon.com");
    });

});
