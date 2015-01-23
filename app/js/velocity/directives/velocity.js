"use strict";
/**
 * Angular wrapper for velocityjs
 * @author SOON_
 * @module velocity
 * @class  velocity
 * @example <div velocity="[{'properties': { opacity: 0 }, 'options': { duration: 1000 }},{'properties': { opacity: 1 },'options': { duration: 1000 }}]"></div>
 */
angular.module("velocity").directive("velocity",[
    /**
     * @constructor
     */
    function() {
        return {
            restrict: "A",
            scope: {
                "velocity": "="
            },
            link: function($scope, $element){

                angular.forEach($scope.velocity, function(value, index){
                    $element.velocity(value);
                });

            }
        }
    }
]);
