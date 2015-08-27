"use strict";
/**
 * Scrolls smoothly to an element without using jquery. based on:
 * {@link https://gist.github.com/justinmc/d72f38339e0c654437a2}
 * @author SOON_
 * @module soon.ui.snScrollTo
 * @class  snScrollTo
 */
angular.module("soon.ui.snScrollTo", [])

.directive("snScrollTo", [
    "$location",
    "$document",
    "$window",
    /**
     * @constructor
     * @param {Service} $location
     * @param {Service} $document
     * @param {Service} $window
     */
    function ($location, $document, $window) {
        return {
            restrict: "A",
            replace: false,
            scope: {
                "scrollTo": "@soonScrollTo"
            },
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
                 * Listen to click event on element and prevent default
                 * events occuring then call scrollTo function.
                 * @method createEventListeners
                 * @parm   $event angularjs mouse click event
                 */
                var onClick = function onClick($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    // smooth scroll to the passed in element
                    scrollTo($scope.scrollTo);
                }

                /**
                 * Scrolls smoothly to an element. based on:
                 * {@link http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript}
                 * @method scrollTo
                 * @param  {String} eID The id of the element to scroll to
                 */
                var scrollTo = function scrollTo(eID) {

                    if ($document[0].getElementById(eID)){
                        var i;
                        var startY = currentYPosition();
                        var stopY = elmYPosition(eID);
                        var distance = stopY > startY ? stopY - startY : startY - stopY;
                        if (distance < 100) {
                            scrollTo(0, stopY); return;
                        }
                        var speed = Math.round(distance / 100);
                        if (speed >= 20) speed = 20;
                        var step = Math.round(distance / 25);
                        var leapY = stopY > startY ? startY + step : startY - step;
                        var timer = 0;
                        if (stopY > startY) {
                            for (i = startY; i < stopY; i += step) {
                                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                            } return;
                        }
                        for (i = startY; i > stopY; i -= step) {
                            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
                        }
                    }
                }

                /**
                 * Calculate the elements offset in pixels from the top of the page
                 * @method currentYPosition
                 * @return {Number} the number of pixels the element is offset from the top
                 */
                var currentYPosition = function currentYPosition() {
                    // Firefox, Chrome, Opera, Safari
                    if ($window.pageYOffset) {
                        return $window.pageYOffset;
                    }
                    // Internet Explorer 6, 7 and 8
                    if ($document[0].body.scrollTop) {
                        return $document[0].body.scrollTop;
                    }
                    return 0;
                }

                /**
                 * Calculate the offset in pixels from the top of
                 * the page given an element ID.
                 * @method elmYPosition
                 * @param  {String} eID The id of the element to calculate
                 * @return {Number}     the number of pixels the element is offset from the top
                 */
                var elmYPosition = function elmYPosition(eID) {
                    var elm = $document[0].getElementById(eID);
                    var y = elm.offsetTop;
                    var node = elm;
                    while (node.offsetParent && node.offsetParent != $document[0].body) {
                        node = node.offsetParent;
                        y += node.offsetTop;
                    } return y;
                }

                /**
                 * Clear all listeners during angularjs $destory event
                 * @function onDestroy
                 */
                var onDestroy = function onDestroy(){
                    angular.forEach(listener_obj, function (value, key){
                        value.apply(this);
                    });
                    $element.off("click", onClick);
                }

                $element.on("click", onClick);
                listener_obj.destroy = $scope.$on("$destroy", onDestroy);

            }
        }
    }
]);
