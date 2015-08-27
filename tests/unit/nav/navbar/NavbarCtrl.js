"use strict";

describe("NavbarCtrl", function (){

    var scope, rootScope, _cache, _NAV;

    beforeEach(function(){
        module("thisissoon.nav.NavbarCtrl");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        rootScope = $rootScope;

        _cache = $injector.get("CacheService");
        spyOn(_cache, "put");

        _NAV = {};

        $controller("NavbarCtrl", {
            $scope: scope,
            $rootScope: rootScope,
            CacheService: _cache,
            NAV: _NAV
        });

    }));

    it("should declare variables in scope", function (){
        expect(scope.cache).toEqual(jasmine.any(Object));
        expect(scope.sections).toEqual(_NAV);
        expect(scope.navStyle).toEqual(jasmine.any(String));
        expect(scope.navClick).toEqual(jasmine.any(Function));
        expect(scope.toggleNav).toEqual(jasmine.any(Function));
    });

    it("should set navOpen cache value on navClick", function (){
        scope.navClick();
        expect(_cache.put).toHaveBeenCalledWith("navOpen", false);
    });

    it("should set navOpen cache value on toggleNav", function (){
        _cache.put("navOpen", false);

        scope.toggleNav();
        expect(_cache.put).toHaveBeenCalledWith("navOpen", true);
    });

});
