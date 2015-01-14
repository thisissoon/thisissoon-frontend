"use strict";
/**
 * Returns the current date
 * @module soon.utils
 * @author SOON_
 * @class  currentDate
 **/
angular.module("soon.utils").filter("currentDate", [
    "$filter",
    function($filter) {
        return function() {
            return $filter("date")(new Date(), "yyyy-MM-dd");
        };
    }
])
