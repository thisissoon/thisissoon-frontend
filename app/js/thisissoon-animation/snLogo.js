"use strict";
/**
 * Directive for SOON logo
 * @author SOON_
 * @module thisissoon.animation.snLogo
 * @class  snLogo
 */
angular.module("thisissoon.animation.snLogo", [])

.directive("snLogo",[
    "SOON_LOGO",
    /**
     * @constructor
     */
    function (SOON_LOGO){
        return {
            restrict: "E",
            scope: {
                style: "@"
            },
            templateUrl: "partials/logo.html",
            link: function($scope, $element) {

                /**
                 * Attach SOON logo animation config to scope
                 * @property logoAnimation
                 * @type     {Object}
                 */
                $scope.logoAnimation = SOON_LOGO.full;

            }
        };
    }
]);
