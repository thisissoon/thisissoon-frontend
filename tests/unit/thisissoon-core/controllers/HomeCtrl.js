"use strict";

describe("HomeCtrl", function (){

    var scope, rootScope, _timeout, _cache, _projects, _jobs, _GREETINGS;

    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        rootScope = $rootScope;

        _timeout = $injector.get("$timeout");

        _cache = $injector.get("CacheService");
        spyOn(_cache, "get");
        spyOn(_cache, "put");

        _projects = {
            list: [],
            sticky: {}
        }

        _jobs = {
            list: []
        }

        _GREETINGS = {
            am: ["Morning"],
            pm: ["Afternoon"],
            eve: ["Evening"]
        }

        $controller("HomeCtrl", {
            $scope: scope,
            $rootScope: rootScope,
            $timeout: _timeout,
            CacheService: _cache,
            projects: _projects,
            jobs: _jobs,
            GREETINGS: _GREETINGS
        });

    }));

    it("should declare variables in scope", function (){
        expect(scope.projects).toEqual(jasmine.any(Array));
        expect(scope.sticky).toEqual(jasmine.any(Object));
        expect(scope.jobs).toEqual(jasmine.any(Array));
        expect(scope.greeting).toEqual(jasmine.any(String));
        expect(scope.getBackgroundColor).toEqual(jasmine.any(Function));
        expect(scope.toggleProjects).toEqual(jasmine.any(Function));
        expect(scope.currentTime).toEqual(jasmine.any(Object));
        expect(scope.timeBoundaries).toEqual(jasmine.any(Object));
        expect(scope.getGreeting).toEqual(jasmine.any(Function));
        expect(scope.init).toEqual(jasmine.any(Function));
    });

    it("should have projects array and sticky object in scope", function (){
        expect(scope.projects).toEqual(_projects.list);
        expect(scope.sticky).toEqual(_projects.sticky);
    });

    it("should get background colour from cache", function (){
        scope.getBackgroundColor();
        expect(_cache.get).toHaveBeenCalledWith("backgroundColor");
    });

    it("should toggle project list view on call to toggleProjects", function (){
        scope.toggleProjects();
        expect(_cache.put).toHaveBeenCalledWith("projectList", true);
    });

    it("should return correct greeting based on time", function (){

        scope.timeBoundaries = { am: 1422923338069, pm: 1422966538069, eve: 1422988138069, tomo: 1423009738069 }

        scope.currentTime.value = 1422923338070;
        var greeting = scope.getGreeting();
        expect(greeting).toEqual("Morning");

        scope.currentTime.value = 1422966538070;
        greeting = scope.getGreeting();
        expect(greeting).toEqual("Afternoon");

        scope.currentTime.value = 1422988138070;
        greeting = scope.getGreeting();
        expect(greeting).toEqual("Evening");
    });

    it("should update currentTime.value", function (){

        spyOn(scope.currentTime, "get");

        scope.currentTime.get();
        expect(scope.currentTime.value).toEqual(jasmine.any(Date));
        expect(scope.currentTime.get).toHaveBeenCalled();

        _timeout.flush();
    });

});
