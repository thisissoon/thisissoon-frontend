"use strict";

describe("HomeCtrl", function (){

    var scope, rootScope, _modal, _dataStore, _projects;

    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        rootScope = $rootScope;

        _modal = $injector.get("$modal");

        _dataStore = $injector.get("DataStore");

        _projects = {
            list: [],
            sticky: {}
        }

        $controller("HomeCtrl", {
            $scope: scope,
            $rootScope: rootScope,
            $modal: _modal,
            DataStore: _dataStore,
            projects: _projects
        });

    }));

    it("should have projects array and sticky object in scope", function (){
        expect(scope.projects).toEqual(jasmine.any(Array));
        expect(scope.sticky).toEqual(jasmine.any(Object));
    });


});
