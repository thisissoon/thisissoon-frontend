"use strict";

describe("HeaderCtrl", function (){

    var scope, _dataStore, _thisissoonAPI;

    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        _dataStore = $injector.get("DataStore");

        _thisissoonAPI = $injector.get("ThisissoonAPI");

        $controller("HeaderCtrl", {
            $scope: scope,
            DataStore: _dataStore,
            ThisissoonAPI: _thisissoonAPI
        });

    }));

    it("should toogle projectsList boolean when calling toggleProjects function", function (){
        scope.dataStore.set("projectList", false);
        scope.toggleProjects();
        expect(scope.dataStore.get("projectList")).toBe(true);
        scope.toggleProjects();
        expect(scope.dataStore.get("projectList")).toBe(false);
        scope.dataStore.set("projectList", true);
        scope.toggleProjects();
        expect(scope.dataStore.get("projectList")).toBe(false);
    });


});
