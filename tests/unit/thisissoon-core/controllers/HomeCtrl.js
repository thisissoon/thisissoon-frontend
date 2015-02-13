"use strict";

describe("HomeCtrl", function (){

    var scope, rootScope, _timeout, _filter, _cache, _projects, _jobs, _GREETINGS;

    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        rootScope = $rootScope;

        _timeout = $injector.get("$timeout");
        _filter = $injector.get("$filter");

        _cache = $injector.get("CacheService");
        spyOn(_cache, "get");
        spyOn(_cache, "put");

        _projects = {
            list: [
                {
                    title: "A project title",
                    background_colour: "#FFFFFF"
                },{
                    title: "Another project's title",
                    background_colour: "#000000"
                }
            ]
        }

        _jobs = {
            list: []
        }

        _GREETINGS = [
            {
                "text": "Midnight",
                "image": ""
            },{
                "text": "1",
                "image": ""
            },{
                "text": "2",
                "image": ""
            }
        ];

        $controller("HomeCtrl", {
            $scope: scope,
            $rootScope: rootScope,
            $timeout: _timeout,
            $filter: _filter,
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
        expect(scope.getBackgroundColor).toEqual(jasmine.any(Function));
        expect(scope.toggleProjects).toEqual(jasmine.any(Function));
        expect(scope.currentTime).toEqual(jasmine.any(Object));
        expect(scope.getGreeting).toEqual(jasmine.any(Function));
        expect(scope.init).toEqual(jasmine.any(Function));
    });

    it("should have projects array and sticky object in scope", function (){
        expect(scope.projects).toEqual(_projects.list);
        expect(scope.sticky).toEqual(_projects.list[0]);
    });

    it("should get background colour from cache", function (){
        scope.getBackgroundColor();
        expect(_cache.get).toHaveBeenCalledWith("backgroundColor");
    });

    it("should toggle project list view on call to toggleProjects", function (){
        scope.toggleProjects();
        expect(_cache.put).toHaveBeenCalledWith("projectList", true);
    });

    it("should set sticky project style", function (){
        scope.init();
        expect(scope.sticky.navStyle).toEqual("dark");
    });

    it("should return correct greeting based on hour", function (){

        scope.currentTime.value = {
            getHours: function() {
                return 1;
            }
        };
        var greeting = scope.getGreeting();
        expect(greeting.text).toEqual("1");

        scope.currentTime.value = {
            getHours: function() {
                return 2;
            }
        };
        greeting = scope.getGreeting();
        expect(greeting.text).toEqual("2");
    });

    it("should update currentTime.value", function (){

        spyOn(scope.currentTime, "get");

        scope.currentTime.get();
        expect(scope.currentTime.value).toEqual(jasmine.any(Date));
        expect(scope.currentTime.get).toHaveBeenCalled();

        _timeout.flush();
    });

});
