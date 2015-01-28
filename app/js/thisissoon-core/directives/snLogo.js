"use strict";
/**
 * Directive for SOON logo
 * @author SOON_
 * @module thisissoon.core
 * @class  snLogo
 */
angular.module("thisissoon.core").directive("snLogo",[
    "SOON_LOGO",
    /**
     * @constructor
     */
    function (SOON_LOGO){
        return {
            restrict: "E",
            scope: {
                style: "@",
                section: "@"
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
        }
    }
]);
