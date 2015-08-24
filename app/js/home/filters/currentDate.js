"use strict";
/**
 * Returns the current date
 * @module thisissoon.home.currentDate
 * @author SOON_
 * @class  currentDate
 **/
angular.module("thisissoon.home.currentDate", [])

.filter("currentDate", [
    "$filter",
    function($filter) {
        return function() {
            return $filter("date")(new Date(), "yyyy-MM-dd");
        };
    }
]);
