"use strict";
/**
 * Returns the current date
 * @module thisissoon.core
 * @author SOON_
 * @class  linkDisplay
 **/
angular.module("thisissoon.core").filter("linkDisplay", [
    "$filter",
    function($filter) {
        return function(input) {
            return input.replace("http://", "").replace("www.", "");
        };
    }
])

