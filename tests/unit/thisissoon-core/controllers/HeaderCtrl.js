"use strict";

describe("HeaderCtrl", function (){

    var scope, rootScope, _filter , _cache, _thisissoonAPI, _projects;

    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();
        rootScope = $rootScope;

        _filter = $injector.get("$filter");

        _cache = $injector.get("CacheService");

        _projects = {
            list: [
                { "id": 1, "background_colour": "#000000" },
                { "id": 2, "background_colour": "#000000" }
            ]
        };

        _thisissoonAPI = $injector.get("ThisissoonAPI");
        _thisissoonAPI.getProjects = function (){
            return {
                then: function(fn){ fn.call(this, _projects); }
            }
        }

        $controller("HeaderCtrl", {
            $scope: scope,
            $rootScope: rootScope,
            $filter: _filter,
            CacheService: _cache,
            ThisissoonAPI: _thisissoonAPI
        });

    }));

    it("should declare variables in scope", function (){
        expect(scope.env).toEqual(jasmine.any(Object));
        expect(scope.projects).toEqual(jasmine.any(Array));
        expect(scope.navStyle).toEqual(jasmine.any(String));
        expect(scope.toggleProjects).toEqual(jasmine.any(Function));
    });

    it("should toggle projectList boolean when calling toggleProjects function", function (){
        scope.cache.put("projectList", false);
        scope.toggleProjects();
        expect(scope.cache.get("projectList")).toBe(true);
        scope.toggleProjects();
        expect(scope.cache.get("projectList")).toBe(false);
        scope.cache.put("projectList", true);
        scope.toggleProjects();
        expect(scope.cache.get("projectList")).toBe(false);
    });

    it("should attach projects to scope on init", function (){
        scope.init();
        expect(scope.projects).toEqual(_projects.list);
    });

    it("should listen for scrollSectionChanged events from snNavbar and update scope", function (){
        scope.navStyle = "light";
        scope.$broadcast("snNavbar:scrollSectionChanged", { navStyle: "dark" })
        expect(scope.navStyle).toEqual("dark");
    });

});
