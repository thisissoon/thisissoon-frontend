"use strict";

describe("LoadingCtrl", function (){

    var scope, rootScope, _SOON_LOGO;

    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        rootScope = $rootScope;

        _SOON_LOGO = {
            underscore: []
        }

        $controller("LoadingCtrl", {
            $scope: scope,
            SOON_LOGO: _SOON_LOGO
        });

    }));

    it("should declare variables in scope", function (){
        expect(scope.keyframes).toEqual(_SOON_LOGO.underscore);
    });

});
