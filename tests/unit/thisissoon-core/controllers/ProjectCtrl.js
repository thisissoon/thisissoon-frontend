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

});
