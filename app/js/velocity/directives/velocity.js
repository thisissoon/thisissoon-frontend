"use strict";
/**
 * Set velocity.js keyframe animation on element
 * The animation start may be bound to js event such as 'click' with the `data-bind` attribute, to reverse animation on second event set `data-toggle`
 * @author SOON_
 * @module velocity
 * @class  velocity
 * @example
 * <velocity data-src="'img/header/SOON.svg'" data-keyframes="keyframes"></velocity>
 *
 * example keyframes object:
 * {
 *      "animated-element-selector": [
 *          {
 *              "props": { velocity animation properties },
 *              "options": { velocity animation options }
 *          },{
 *              "props": { opacity: 0 },
 *              "options": { duration: 500 }
 *          }
 *      ]
 * }
 */
angular.module("velocity").directive("velocity",[
    "$http",
    /**
     * @constructor
     */
    function($http) {
        return {
            restrict: "EA",
            scope: {
                "src": "=",
                "keyframes": "=",
                "bind": "=",
                "toggle": "="
            },
            link: function($scope, $element){

                /**
                 * Load SVG or HTML from external file
                 * @param {String}   src relative fiel path of file
                 * @param {Function} cb  callback to run on completion
                 * @method loadFile
                 */
                $scope.loadFile = function loadFile(src, cb) {
                    $http.get(src)
                        .then(function(response) {
                            if(response.status == 200){
                                $element.append(response.data);

                                if (cb) {
                                    cb.apply(this, [$element, $scope.keyframes]);
                                }
                            }
                        })
                }

                /**
                 * Initialise keyframe animation
                 * @param {Object} element      angular element
                 * @param {Object} keyframesObj animation object with key for each element to animate (see example above)
                 */
                $scope.initAnimation = function(element, keyframesObj) {
                    angular.forEach(keyframesObj, function(keyframes, key){
                        var animateElement = element.find(key);

                        angular.forEach(keyframes, function(frame){
                            var props = frame.props || frame.command;
                            animateElement.velocity(props, frame.options);
                        });
                    });
                }

                $scope.reverseAnimation = function(element, keyframesObj) {
                    angular.forEach(keyframesObj, function(keyframes, key){
                        element.find(key).velocity("reverse");
                    });
                }

                var isEven = function isEven(n) {
                    return n === parseFloat(n)? !(n%2) : void 0;
                }

                /**
                 * Load file, bind events and/or initialise animation
                 * @method init
                 */
                $scope.init = function(){

                    $scope.eventCount = 0;

                    if ($scope.bind) {

                        if ($scope.src) $scope.loadFile($scope.src);

                        $element.bind($scope.bind, function(){
                            $scope.eventCount++;

                            if ($scope.toggle && isEven($scope.eventCount)) {
                                $scope.reverseAnimation($element, $scope.keyframes);
                            } else {
                                $scope.initAnimation($element, $scope.keyframes);
                            }
                        })

                    } else {
                        if ($scope.src) {
                            $scope.loadFile($scope.src, $scope.initAnimation);
                        } else {
                            $scope.initAnimation($element, $scope.keyframes);
                        }
                    }
                }

                $scope.init();

            }
        }
    }
]);
