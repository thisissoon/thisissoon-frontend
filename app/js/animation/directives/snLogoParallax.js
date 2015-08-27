"use strict";
/**
 * Directive for SOON logo parallax animation
 * @author SOON_
 * @module thisissoon.animation.snLogoParallax
 * @class  snLogoParralax
 * @requires sn.skrollr {@link https://github.com/thisissoon/angular-skrollr}
 */
angular.module("thisissoon.animation.snLogoParallax", [
    "sn.skrollr"
])

.directive("snLogoParallax", [
    /**
     * @constructor
     */
    function (){
        return {
            restrict: "E",
            scope: {
                logoStyle: "@",
                section: "@"
            },
            templateUrl: "partials/logo-parallax.html",
        };
    }
]);
