"use strict";

describe("HeaderCtrl", function (){

    var scope, rootScope, _cache, _thisissoonAPI;

    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();
        rootScope = $rootScope;

        _cache = $injector.get("CacheService");

        _thisissoonAPI = $injector.get("ThisissoonAPI");

        $controller("HeaderCtrl", {
            $scope: scope,
            $rootScope: rootScope,
            CacheService: _cache,
            ThisissoonAPI: _thisissoonAPI
        });

    }));

    it("should toogle projectList boolean when calling toggleProjects function", function (){
        scope.cache.put("projectList", false);
        scope.toggleProjects();
        expect(scope.cache.get("projectList")).toBe(true);
        scope.toggleProjects();
        expect(scope.cache.get("projectList")).toBe(false);
        scope.cache.put("projectList", true);
        scope.toggleProjects();
        expect(scope.cache.get("projectList")).toBe(false);
    });


});
