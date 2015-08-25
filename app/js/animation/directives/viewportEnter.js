"use strict";
/*
 * @module   thisissoon.animation.viewportEnter
 * @author   SOON_
 */
angular.module("thisissoon.animation.viewportEnter", [
    "soon.ui.ScrollService",
    "soon.ui.ResizeService"
])
/**
 * @example
 *  <div sn-viewport-enter="doThis()" sn-viewport-exit="doThis()"></div>
 * @constructor
 * @class snViewportEnter
 */
.directive("snViewportEnter",[
    "$window",
    "$timeout",
    "ScrollService",
    "ResizeService",
    /**
     * @param   {Service} $window       Angular wrapper for window
     * @param   {Service} $timeout      Angualr wrapper for setTimeout
     * @param   {Service} ScrollService Service to add/remove scroll event handlers
     * @param   {Servcie} ResizeService Service to add/remove resize event handlers
     */
    function ($window, $timeout, ScrollService, ResizeService){
        return {
            restrict: "A",
            scope: {
                snViewportEnter: "&",
                snViewportExit: "&"
            },
            link: function($scope, $element, attrs){

                /**
                 * Status of call to handler functions
                 * @property {Boolean} callStatus
                 */
                var callStatus = false;

                /**
                 * On scroll check if element is in viewport, call handlers on viewport enter/exit
                 * @function onScroll
                 */
                var onScroll = function onScroll(){

                    var offset = attrs.offset || 0;
                    var elementInViewport = ( ($window.innerHeight - offset) >= $element[0].getBoundingClientRect().top );

                    if (elementInViewport && !callStatus) {
                        $element.addClass( "ng-enter-active" );
                        $scope.snViewportEnter();
                        callStatus = true;
                    } else if (!elementInViewport && callStatus && $scope.snViewportExit) {
                        $scope.snViewportExit();
                        callStatus = false;
                    }

                };

                /**
                 * Remove event listeners
                 * @function removeListeners
                 */
                var removeListeners = function removeListeners(){
                    ScrollService.remove($scope.$id, onScroll);
                    ResizeService.remove($scope.$id, onScroll);
                };

                $element.addClass("ng-enter");
                $scope.$on("$destroy", removeListeners);

                ScrollService.add($scope.$id, onScroll);
                ResizeService.add($scope.$id, onScroll);

                $timeout(onScroll, 500);

            }
        };
    }
]);
