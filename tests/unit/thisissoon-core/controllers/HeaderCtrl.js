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

    it("should convert hex to valid rgba value", function (){
        expect(scope.hexToRgba("#468499", .5)).toBe("70,132,153,0.5");
        expect(scope.hexToRgba("#DB4437")).toBe("219,68,55,1");
        expect(scope.hexToRgba("#00FFBF", 1)).toBe("0,255,191,1");
        expect(scope.hexToRgba("#F0F", 0.3)).toBe("255,0,255,0.3");
        expect(scope.hexToRgba("dfjg45348657", 0.3)).toBe(null);
    });


});
