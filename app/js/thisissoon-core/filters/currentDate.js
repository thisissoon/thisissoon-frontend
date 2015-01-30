"use strict";
/**
 * Returns the current date
 * @module thisissoon.core
 * @author SOON_
 * @class  currentDate
 **/
angular.module("thisissoon.core").filter("currentDate", [
    "$filter",
    function($filter) {
        return function() {
            return $filter("date")(new Date(), "yyyy-MM-dd");
        };
    }
])
