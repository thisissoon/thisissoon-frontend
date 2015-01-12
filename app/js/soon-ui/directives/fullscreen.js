"use strict";
/**
 * Makes an HTML element's height equal to the height of the
 * browser's viewport if the element's height is not already
 * greater than the height of the viewport
 * @author SOON_
 * @module soon.ui
 * @class  soonFullscreen
 */
angular.module("soon.ui").directive("soonFullscreen",[
    "ResizeService",
    /**
     * @constructor
     * @param {Service} ResizeService Service for detecting and handling window resize events
     */
    function (ResizeService){
        return {
            restrict: "A",
            scope: {},
            link: function($scope, $element, attrs) {

                /**
                 * Object containing references to listenters
                 * to be cleared when directive is destory during
                 * garbage collection.
                 * @property listener_obj
                 * @type     {Object}
                 */
                var listener_obj = {};

                /**
                 * Function to run on directive initialisation. Adds event handler to
                 * ResizeService to update elements 'min-height' value.
                 * @function init
                 */
                var init = function init (){
                    ResizeService.add($scope.$id, makeFullScreen);
                }

                /**
                 * Changes the css 'min-height' value of $element to ensure it's height
                 * is at least equal to or greater than the browser's viewport height.
                 * We update 'min-height' instead of 'height' because the $element
                 * height may already be greater than the viewport height.
                 * @function makeFullScreen
                 * @param    {Event}  $event     Window resize event Object
                 * @param    {Object} windowSize Object containing the current window height and width values
                 */
                var makeFullScreen = function makeFullScreen($event, windowSize){
                    var cssProperty = attrs.soonFullscreen ? "height" : "min-height";
                    $element.css(cssProperty, (windowSize.height+"px"));
                }

                /**
                 * Clear all listeners during angularjs $destory event
                 * @function onDestroy
                 */
                var onDestroy = function onDestroy(){
                    angular.forEach(listener_obj, function (value, key){
                        listener_obj[key].call(this);
                    });
                    ResizeService.remove($scope.$id);
                }

                listener_obj.destroy = $scope.$on("$destroy", onDestroy);

                init();

            }

        }
    }
]);
