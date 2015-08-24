"use strict";
/**
 * Directive for SOON logo parallax animation
 * @author SOON_
 * @module thisissoon.animation.snLogoParallax
 * @class  snLogoParralax
 */
angular.module("thisissoon.animation.snLogoParallax", [])

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
