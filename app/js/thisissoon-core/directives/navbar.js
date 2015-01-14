"use strict";
/**
 * Directive for site navigation.
 * @author SOON_
 * @module thisissoon.core
 * @class  soonNavbar
 */
angular.module("thisissoon.core").directive("soonNavbar",[
    "$timeout",
    "ScrollService",
    /**
     * @constructor
     * @param {Service} $timeout      angular wrapper for setTimeout
     * @param {Service} ScrollService handles scroll events
     */
    function ($timeout, ScrollService){
        return {
            restrict: "A",
            controller: "NavCtrl",
            link: function($scope, $element) {

                /**
                 * @property lastScroll
                 * @type     {Integer}
                 */
                var lastScroll = 0;

                /**
                 * Hide navbar on scroll
                 * @param {Object} $event         scroll event
                 * @param {Object} scrollPosition data object with scroll postion
                 */
                var onScroll = function($event, scrollPosition) {

                    var timeNow = (new Date()).getTime();

                    // hide navigation on scroll action
                    if (lastScroll !== 0) {
                        $element.removeClass("navbar-show");
                        $element.addClass("navbar-hide");
                    }

                    // track lastScroll time
                    lastScroll = timeNow;

                    // show nav once scrolling has stopped for 800ms
                    $timeout(function() {
                        if (timeNow === lastScroll) {
                            $element.removeClass("navbar-hide");
                            $element.addClass("navbar-show");
                        }
                    }, 500);
                }

                ScrollService.add($scope.$id, onScroll);

                // on bootstrap scrollspy event set navigation style
                $("nav.navbar").on("activate.bs.scrollspy", function (event) {
                    var navStyle = angular.element(event.target).find("a").attr("data-nav-style");

                    switch(navStyle) {
                        case "dark":
                            $element.removeClass("navbar-light");
                            $element.addClass("navbar-dark");
                            break;
                        default:
                            $element.removeClass("navbar-dark");
                            $element.addClass("navbar-light");
                    }
                })

            }
        }
    }
]);
