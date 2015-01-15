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

    it("should toogle navOpen boolean when calling toggleNav function", function (){
        scope.dataStore.set("navOpen", false);
        scope.toggleNav();
        expect(scope.dataStore.get("navOpen")).toBe(true);
        scope.toggleNav();
        expect(scope.dataStore.get("navOpen")).toBe(false);
        scope.dataStore.set("navOpen", true);
        scope.toggleNav();
        expect(scope.dataStore.get("navOpen")).toBe(false);
    });


});
