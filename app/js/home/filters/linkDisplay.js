"use strict";
/**
 * Formats link for display
 * @module thisissoon.home.linkDisplay
 * @author SOON_
 * @class  linkDisplay
 */
angular.module("thisissoon.home.linkDisplay", [])

.filter("linkDisplay", [
    "$filter",
    function($filter) {
        return function(input) {
            return input.replace(/.*?:\/\//g, "").replace(/w{3}./, "").replace(/\/.*/g, "");
        };
    }
]);

