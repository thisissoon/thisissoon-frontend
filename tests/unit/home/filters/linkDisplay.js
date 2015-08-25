"use strict";

describe("linkDisplay", function() {
    var scope, rootScope, filter;

    beforeEach(module("thisissoon.home.linkDisplay"));

    beforeEach(inject(function ($rootScope, $filter, $injector) {
        scope = $rootScope.$new();

        rootScope = $rootScope;

        filter = $filter("linkDisplay");

    }));

    it("should return link without 'http://www.'", function(){
        var result = filter("http://www.thisissoon.com");
        expect(result).toEqual("thisissoon.com");
    });

    it("should return link without 'http://'", function(){
        var result = filter("http://thisissoon.com");
        expect(result).toEqual("thisissoon.com");
    });

    it("should return link without 'www.'", function(){
        var result = filter("www.thisissoon.com");
        expect(result).toEqual("thisissoon.com");
    });

    it("should return only the domain without any routes", function(){
        var result = filter("https://www.thisissoon.com/projects?search=web");
        expect(result).toEqual("thisissoon.com");
    });

});
