"use strict";
/**
 * Loading view
 * @module thisissoon.core
 * @author SOON_
 * @class  LoadingCtrl
 */
angular.module("thisissoon.core").controller("LoadingCtrl", [
    "$scope",
    "SOON_LOGO",
    /**
     * @constructor
     * @param {Object} $scope    Scope of the controller
     * @param {Object} SOON_LOGO logo keyframe animation config
     */
    function ($scope, SOON_LOGO) {

        $scope.keyframes = SOON_LOGO.underscore;

    }
]);
