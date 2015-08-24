"use strict";
/**
 * Directive for hero background video to keep video vertically centered
 * @author SOON_
 * @module thisissoon.core
 * @class  heroVideo
 */
angular.module("thisissoon.core").directive("heroVideo",[
    "ResizeService",
    /**
     * @constructor
     * @param {Service} ResizeService
     */
    function (ResizeService){
        return {
            restrict: "C",
            link: function ($scope, $element){

                /**
                 * Object containing references to listenters
                 * to be cleared when directive is destory during
                 * garbage collection.
                 * @property listener_obj
                 * @type     {Object}
                 */
                var listener_obj = {};

                /**
                 * Resizes video on load to fill screen
                 * @method onLoad
                 */
                var onLoad = function onLoad () {
                    $element.addClass("show");
                    ResizeService.add($scope.$id, onResize);
                    play();
                };

                /**
                 * Recalculate css values on resize to
                 * keep video centered
                 * @method onResize
                 */
                var onResize = function onResize ($event, windowSize) {
                    if (windowSize.width > 1024){
                        $element.removeAttr("style");

                        var videoRatio = $element[0].offsetWidth / $element[0].offsetHeight,
                            windowRatio = windowSize.width / windowSize.height;


                        if (videoRatio > windowRatio){
                            $element.css({
                                "height": windowSize.height+"px"
                            });
                        } else {
                            $element.css({
                                "width": windowSize.width+"px"
                            });
                        }

                        $element.css({
                            "margin-left": ( ( windowSize.width - $element[0].offsetWidth ) * 0.5 ) + "px",
                            "margin-top": ( ( windowSize.height - $element[0].offsetHeight ) * 0.5 ) + "px"
                        });
                        play();
                    } else {
                        stop();
                    }
                };

                /**
                 * Pause hero video playback
                 * @method pause
                 */
                var pause = function pause () {
                    $element[0].pause();
                };

                /**
                 * Start/resume hero video playback
                 * @method play
                 */
                var play = function play () {
                    $element[0].play();
                };

                /**
                 * Stop video playback and reset time to 0
                 * @method stop
                 */
                var stop = function stop () {
                    $element[0].pause();
                    $element[0].currentTime = 0;
                };

                /**
                 * Clear all listeners during angularjs $destory event
                 * @function onDestroy
                 */
                var onDestroy = function onDestroy () {
                    stop();
                    ResizeService.remove($scope.$id);
                    $element[0].removeEventListener("loadeddata");
                    angular.forEach(listener_obj, function (value, key){
                        listener_obj[key].call(this);
                    });
                };

                $element.addClass("hide");
                $element[0].addEventListener("loadeddata", onLoad, false);
                listener_obj.play = $scope.$on("heroVideo:play", play);
                listener_obj.pause = $scope.$on("heroVideo:pause", pause);
                listener_obj.destroy = $scope.$on("$destroy", onDestroy);

                $element[0].load();

            }
        };
    }
]);
