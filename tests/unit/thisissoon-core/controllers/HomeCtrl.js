"use strict";

describe("HomeCtrl", function (){

    var scope, rootScope, _cache, _projects, _jobs;

    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        rootScope = $rootScope;

        _cache = $injector.get("CacheService");

        _projects = {
            list: [],
            sticky: {}
        }

        _jobs = {
            list: []
        }

        $controller("HomeCtrl", {
            $scope: scope,
            $rootScope: rootScope,
            CacheService: _cache,
            projects: _projects,
            jobs: _jobs
        });

    }));

    it("should have projects array and sticky object in scope", function (){
        expect(scope.projects).toEqual(jasmine.any(Array));
        expect(scope.sticky).toEqual(jasmine.any(Object));
    });


});
