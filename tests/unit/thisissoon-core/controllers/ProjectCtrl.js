"use strict";

describe("ProjectCtrl", function (){

    var scope, _cache, _filter, _sce, _project, _projects;


    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        _cache = $injector.get("CacheService");
        spyOn(_cache, "get");

        _filter = $injector.get("$filter");

        _sce = $injector.get("$sce");
        spyOn(_sce, "trustAsResourceUrl");

        _project = {
            id: 3,
            title: [""],
            judges_comments: [""],
            early_ideas: [""],
            answers: [""],
            project_stats: [""],
            screenshots: [""],
            link: "http://thisissoon.com",
            hero_image: {
                huge: ""
            }
        };

        _projects = {
            list: [
                { id: 1, slug: "project-1" },
                { id: 3, slug: "project-2" },
                { id: 5, slug: "project-3" }
            ]
        };

        $controller("ProjectCtrl", {
            $scope: scope,
            $filter: _filter,
            $sce: _sce,
            CacheService: _cache,
            project: _project,
            projects: _projects
        });

    }));

    it("should have a project detail object and projects array in scope", function (){
        expect(scope.project).toEqual(_project);
        expect(scope.projects).toEqual(_projects.list);
    });

    it("should set next and previous projects based on current project", function (){
        scope.setNextPrevious();
        expect(scope.next).toEqual("project-3");
        expect(scope.previous).toEqual("project-1");
    });

    it("should get background colour from cache", function (){
        scope.getBackgroundColor();
        expect(_cache.get).toHaveBeenCalledWith("backgroundColor");
    });

    it("should clear values from cache onDestroy", function (){
        scope.$emit("$destroy");
        expect(_cache.get("projectView")).toBe(undefined);
        expect(_cache.get("backgroundColor")).toBe(undefined);
    });

    it("should pass video URL through $sce.trustAsResourceUrl", function (){
        _project.video = "http://youtube.com/randomvideo";
        scope.init();
        expect(_sce.trustAsResourceUrl).toHaveBeenCalledWith("http://youtube.com/randomvideo?autohide=1");
    });

});
