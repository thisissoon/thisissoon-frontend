"use strict";
/**
 * Angular wrapper for velocityjs
 * @author SOON_
 * @module velocity
 * @class  velocity-group
 * @example <velocity-group data-keyframes=""></velocity>
 */
angular.module("velocity").directive("velocityGroup",[
    "$compile",
    /**
     * @constructor
     */
    function($compile) {
        return {
            restrict: "A",
            scope: {
                "velocityGroup": "="
            },
            link: function($scope, $element){

                angular.forEach($scope.velocityGroup, function(keyframes, key){
                    var animateElement = $element.find(key);
                    var scope = $scope;
                    scope.keyframes = keyframes;

                    animateElement.attr("velocity", "keyframes");

                    $compile(animateElement)(scope);
                });

            }
        }
    }
]);
