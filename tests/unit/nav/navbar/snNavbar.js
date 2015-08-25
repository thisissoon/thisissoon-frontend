"use strict";

describe("navbar", function() {
    var element, scope, rootScope, timeout, isolatedScope, templateCache, NAV;

    beforeEach(module("thisissoon.nav.snNavbar"));

    beforeEach(inject(function ($rootScope, $compile, $injector, $httpBackend) {
        scope = $rootScope.$new();

        rootScope = $rootScope;

        timeout = $injector.get("$timeout");
        NAV = $injector.get("NAV");

        $httpBackend.whenGET(/.*/).respond(200);

        element = "<sn-navbar></sn-navbar>";

        templateCache = $injector.get("$templateCache");
        templateCache.put("partials/nav/navbar.html", "foo");

        element = $compile(element)(scope);
        scope.$digest();

        isolatedScope = element.isolateScope();

    }));

    it("should render directive and insert partial", function(){
        expect( angular.element(element).html() ).toContain("foo");
        expect( angular.element(element).html() ).not.toContain("bar");
    });

    it("should attach variables to scope", function(){
        expect(isolatedScope.setNavStyle).toEqual(jasmine.any(Function));
        expect(isolatedScope.lastScroll).toEqual(jasmine.any(Object));
    });

    it("should set style of navbar to light from string", function(){
        isolatedScope.setNavStyle("light");
        expect(isolatedScope.navStyle).toEqual("light");
    });

    it("should set style of navbar to dark from string", function(){
        isolatedScope.setNavStyle("dark");
        expect(isolatedScope.navStyle).toEqual("dark");
    });

    it("should set navbar style to dark when passing in light hex value", function(){
        isolatedScope.setNavStyle("#FFFFFF");
        expect(isolatedScope.navStyle).toEqual("dark");
    });

    it("should set lastScroll.position onScroll", function(){
        isolatedScope.onScroll({}, { px: 10 });
        expect(isolatedScope.lastScroll.position.px).toEqual(10);
    });

});
