"use strict";

describe("ProjectCtrl", function (){

    var scope, _cache, _nav, _project, _projects;


    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        _cache = $injector.get("CacheService");
        _nav = $injector.get("NAV");

        _project = {
            title: [""],
            judges_comments: [""],
            early_ideas: [""],
            answers: [""],
            project_stats: [""],
            screenshots: [""]
        };

        _projects = {
            list: []
        };

        $controller("ProjectCtrl", {
            $scope: scope,
            CacheService: _cache,
            NAV: _nav,
            project: _project,
            projects: _projects
        });

    }));

    it("should have a project detail object and projects array in scope", function (){
        expect(scope.project).toEqual(jasmine.any(Object));
        expect(scope.projects).toEqual([]);
    });

    it("should convert hex to valid rgba value", function (){
        expect(scope.hexToRgba("#468499", .5)).toBe("70,132,153,0.5");
        expect(scope.hexToRgba("#DB4437")).toBe("219,68,55,1");
        expect(scope.hexToRgba("#00FFBF", 1)).toBe("0,255,191,1");
        expect(scope.hexToRgba("#F0F", 0.3)).toBe("255,0,255,0.3");
        expect(scope.hexToRgba("dfjg45348657", 0.3)).toBe(null);
    });


});
