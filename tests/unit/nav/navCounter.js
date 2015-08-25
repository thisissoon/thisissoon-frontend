"use strict";

describe("navCounter", function() {
    var element, scope, rootScope, isolatedScope, templateCache, NAV;

    beforeEach(module("thisissoon.nav.snNavCounter"));

    beforeEach(inject(function ($rootScope, $compile, $injector, $httpBackend) {
        scope = $rootScope.$new();

        rootScope = $rootScope;

        NAV = $injector.get("NAV");

        $httpBackend.whenGET(/.*/).respond(200);

        element =
            "<sn-nav-counter data-style=\"'light'\">" +
            "</sn-nav-counter>";

        templateCache = $injector.get("$templateCache");
        templateCache.put("partials/nav/nav-counter.html", "");

        element = $compile(element)(scope);
        scope.$digest();

        isolatedScope = element.isolateScope();

    }));

    it("should attach variables to scope", function(){
        expect(isolatedScope.style).toEqual("light");
    });

    it("should update scope on scrollSectionChanged event", function(){

        var data = {
            section: "#hero",
            navStyle: "dark"
        }

        scope.$broadcast("snNavbar:scrollSectionChanged",  data);
        expect(isolatedScope.style).toEqual(data.navStyle);
        expect(isolatedScope.active).toEqual(data.section);
    });


});
