"use strict";
/**
 * Adds a class 'fixed' to the element on the browser windows top
 * position is greater than the elements scroll top position.
 * Example usage would be when needing to change an elements styling
 * once the browser has scrolled below an element. Such as an element
 * which is static until the browser has scrolled below it a which point
 * it is then fixed to the top of the window.
 * @author SOON_
 * @module soon.ui.snFixed
 * @class  soonFixed
 */
angular.module("soon.ui.snFixed", [
    "soon.ui.ScrollService"
])

.directive("snFixed",[
    "$rootScope",
    "$window",
    "$document",
    "ScrollService",
    /**
     * @constructor
     * @param $rootScope    {Object}
     * @param $window       {Object}
     * @param $document     {Object}
     * @param ScrollService {Service}
     */
    function ($rootScope, $window, $document, ScrollService){
        return {
            restrict: "A",
            scope: {},
            link: function($scope, $element, attrs){

                /**
                 * collection of listeners in directive
                 * @property listener_obj
                 * @type Object
                 **/
                var listener_obj = {};

                /**
                 * Number of pixels between the top of the element
                 * and the top of the document
                 * @property elementTopPos
                 * @type Integer
                 **/
                var elementTopPos = $element[0].offsetTop;

                /**
                 * Calculates if element is at the top of window
                 * @method isElementAtTop
                 **/
                var isElementAtTop = function isElementAtTop(event, scrollPosition){
                    var windowTopPos = scrollPosition.px;

                    if ( elementTopPos <= windowTopPos ) {
                        $element.addClass("fixed");
                    } else {
                        $element.removeClass("fixed");
                    }
                }

                /**
                 * Add event handler to scroll service to calculate element position
                 * @method init
                 **/
                var init = function init (){
                    elementTopPos = $element[0].offsetTop;
                    ScrollService.add($scope.$id, isElementAtTop);
                }

                /**
                 * clear all listeners during angularjs garbage collection
                 * @method onDestroy
                 **/
                var onDestroy = function onDestroy(){

                    angular.forEach(listener_obj, function (value, key){
                        listener_obj[key].call(this);
                    });

                    ScrollService.remove($scope.$id);
                }

                listener_obj.destroy = $scope.$on("$destroy", onDestroy);

                init();

            }

        }
    }
]);
