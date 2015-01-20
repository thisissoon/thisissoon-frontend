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
    "CacheService",
    /**
     * @constructor
     * @param {Service} $timeout      angular wrapper for setTimeout
     * @param {Service} ScrollService handles scroll events
     */
    function ($timeout, ScrollService, CacheService){
        return {
            restrict: "A",
            link: function($scope, $element) {

                /**
                 * @property lastScroll
                 * @type     {Object}
                 */
                var lastScroll = {
                    time: 0,
                    position: {}
                }

                /**
                 * Hide navbar on scroll
                 * @param {Object} $event         scroll event
                 * @param {Object} scrollPosition data object with scroll postion
                 */
                var onScroll = function($event, scrollPosition) {

                    var timeNow = (new Date()).getTime(),
                        delay = 500;

                    // hide navigation on scroll action
                    if (lastScroll.time !== 0) {
                        $element.removeClass("navbar-show");
                        $element.addClass("navbar-hide");
                    }

                    // track lastScroll properties
                    lastScroll = {
                        time: timeNow,
                        position: scrollPosition
                    }

                    // show nav once scrolling has stopped for 800ms
                    $timeout(function() {
                        if (timeNow === lastScroll.time) {
                            $element.removeClass("navbar-hide");
                            $element.addClass("navbar-show");
                        }
                    }, delay);
                }

                /**
                 * Hide the fullscreen navigation on selecting an item
                 * @method navClick
                 */
                $scope.navClick = function navClick(){
                    angular.element("nav").find(".icon-burger").removeClass("close");
                    CacheService.put("navOpen", false);
                }

                /**
                 * Toggles the state of the main nav menu by updating
                 * the "navOpen" value in the CacheService service
                 * @method toggleNav
                 */
                $scope.toggleNav = function toggleNav($event){
                    angular.element($event.currentTarget).find(".icon-burger").toggleClass("close");
                    CacheService.put("navOpen", !CacheService.get("navOpen"));
                }

                ScrollService.add($scope.$id, onScroll);

                /**
                 * Initialise scrollspy
                 */
                $("body").scrollspy({ target: "nav.navbar" });

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
