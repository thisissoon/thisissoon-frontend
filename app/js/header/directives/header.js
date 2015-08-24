"use strict";
/**
 * Directive for site header which contains navigation,
 * project list and filter.
 * @author SOON_
 * @module thisissoon.header.header
 * @class  header
 */
angular.module("thisissoon.header.header", [
    "thisissoon.header.HeaderCtrl"
])

.directive("header",[
    /**
     * @constructor
     */
    function (){
        return {
            restrict: "C",
            scope: {},
            controller: "HeaderCtrl",
            templateUrl: "partials/header.html"
        };
    }
]);
