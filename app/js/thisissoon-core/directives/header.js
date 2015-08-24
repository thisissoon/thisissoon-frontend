"use strict";
/**
 * Directive for site header which contains navigation,
 * project list and filter.
 * @author SOON_
 * @module thisissoon.core
 * @class  header
 */
angular.module("thisissoon.core").directive("header",[
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
