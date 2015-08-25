"use strict";
/**
 * Directive for html5 video that allows video to be
 * controlled through events.
 * @author SOON_
 * @module soon.ui.video
 * @class  video
 */
angular.module("soon.ui.video", [])

.directive("video",[
    "$rootScope",
    /**
     * @constructor
     * @param {Service} $rootScope
     */
    function ($rootScope){
        return {
            restrict: "E",
            scope: {
                video: "="
            },
            link: function ($scope, $element, attrs){

                /**
                 * The html5 video element
                 * @property video
                 * @type     {HTMLElement}
                 */
                var video = $element[0];

                video.load();

                /**
                 * Onload event
                 * @method onLoad
                 */
                var onLoad = function onLoad(){
                    if (attrs.autoplay) {
                        play();
                    } else {
                        pause();
                    }
                }

                /**
                 * Pause video playback
                 * @method pause
                 */
                var pause = function pause(){
                    video.pause();
                }

                /**
                 * Start/resume video playback
                 * @method play
                 */
                var play = function play(){
                    video.play();
                }

                /**
                 * Stop video playback and reset time to 0
                 * @method stop
                 */
                var stop = function stop(){
                    video.pause();
                    video.currentTime = 0;
                }

                /**
                 * Clear all listeners during angularjs $destory event
                 * @function onDestroy
                 */
                var onDestroy = function onDestroy(){
                    stop();
                    delete attrs.src;
                    video.removeEventListener("loadeddata");
                }

                // reload video on src change
                $scope.$watch("video", function () {
                    video.load();
                });

                video.addEventListener("loadeddata", onLoad, false);
                $rootScope.$on(attrs.id + ":play", play);
                $rootScope.$on(attrs.id + ":pause", pause);
                $rootScope.$on(attrs.id + ":stop", stop);
                $rootScope.$on("$destroy", onDestroy);

            }
        }
    }
]);
