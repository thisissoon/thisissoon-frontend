"use strict";
/**
 * Directive for html5 video that allows video to be
 * controlled through events.
 * @author SOON_
 * @module soon.ui
 * @class  video
 */
angular.module("soon.ui").directive("video",[
    "$rootScope",
    /**
     * @constructor
     * @param {Service} $rootScope
     */
    function ($rootScope){
        return {
            restrict: "E",
            link: function ($scope, $element, attrs){

                /**
                 * Object containing references to listenters
                 * to be cleared when directive is destory during
                 * garbage collection.
                 * @property listener_obj
                 * @type     {Object}
                 */
                var listener_obj = {};

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
                    play();
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
                    angular.forEach(listener_obj, function (value, key){
                        listener_obj[key].call(this);
                    });
                }

                video.addEventListener("loadeddata", onLoad, false);
                listener_obj.play = $rootScope.$on(attrs.id+":play", play);
                listener_obj.pause = $rootScope.$on(attrs.id+":pause", pause);
                listener_obj.stop = $rootScope.$on(attrs.id+":stop", stop);
                listener_obj.destroy = $rootScope.$on("$destroy", onDestroy);

            }
        }
    }
]);
