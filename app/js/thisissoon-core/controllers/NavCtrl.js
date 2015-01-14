"use strict";
/**
 * Controller for main navigation
 * @module thisissoon.core
 * @author SOON_
 * @class  NavCtrl
 */
angular.module("thisissoon.core").controller("NavCtrl", [
    "$scope",
    "HOME_SECTIONS",
    /**
     * @constructor
     * @param {Object} $scope    Scope of the controller
     * @param {Array}  DataStore List of homepage sections
     */
    function ($scope, HOME_SECTIONS) {

        /**
         * List of home page sections
         * @property sections
         * @type     {Array}
         */
        $scope.sections = HOME_SECTIONS;

        /**
         * Initialise bootstrap scrollspy
         * @method init
         */
        $scope.init = function init(){
            $("body").scrollspy({ target: "nav.navbar" });
        }

        $scope.init();

    }
]);
