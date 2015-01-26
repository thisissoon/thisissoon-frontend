"use strict";
/**
 * Directive for site navigation.
 * @author SOON_
 * @module thisissoon.core
 * @class  soonNavbar
 */
angular.module("thisissoon.core").directive("soonNavbar",[
    "$timeout",
    "$rootScope",
    "$location",
    "ScrollService",
    "CacheService",
    /**
     * @constructor
     * @param {Service} $timeout      angular wrapper for setTimeout
     * @param {Service} ScrollService handles scroll events
     */
    function ($timeout, $rootScope, $location, ScrollService, CacheService){
        return {
            restrict: "A",
            link: function($scope, $element) {

                /**
                 * @property lastScroll
                 * @type     {Object}
                 */
                var lastScroll = {
                    time: 0,
                    position: {
                        px: 0
                    }
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
                    if (lastScroll.time !== 0 && lastScroll.position.px < scrollPosition.px) {
                        $element.removeClass("navbar-show").addClass("navbar-hide");
                    }

                    // track lastScroll properties
                    lastScroll = {
                        time: timeNow,
                        position: scrollPosition
                    }

                    // show nav once scrolling has stopped for 800ms
                    $timeout(function() {
                        if (timeNow === lastScroll.time) {
                            $element.removeClass("navbar-hide").addClass("navbar-show");
                        }
                    }, delay);
                }

                /**
                 * Hide the fullscreen navigation on selecting an item
                 * @method navClick
                 */
                $scope.navClick = function navClick(){
                    CacheService.put("navOpen", false);
                }

                /**
                 * Toggles the state of the main nav menu by updating
                 * the "navOpen" value in the CacheService service
                 * @method toggleNav
                 */
                $scope.toggleNav = function toggleNav($event){
                    CacheService.put("navOpen", !CacheService.get("navOpen"));
                }

                /**
                 * Switchs navbar style from navbar-light to navbar-dark
                 * @param {String}  navStyle  "dark"|"light"
                 * @method switchNavStyle
                 */
                $scope.switchNavStyle = function switchNavStyle(navStyle) {
                    switch(navStyle) {
                        case "dark":
                            $element.removeClass("navbar-light").addClass("navbar-dark");
                            CacheService.put("navStyle", "dark");
                            break;
                        default:
                            $element.removeClass("navbar-dark").addClass("navbar-light");
                            CacheService.put("navStyle", "light");
                    }
                }

                ScrollService.add($scope.$id, onScroll);

                // on bootstrap scrollspy event set navigation style
                $rootScope.$on("duScrollspy:becameActive", function($event, $element){
                    var anchor = angular.element($element).find("a");
                    var navStyle = anchor[0].dataset.navStyle;

                    $rootScope.$broadcast("scrollSpyChanged",  { event: $element, navStyle: navStyle });
                    $scope.switchNavStyle(navStyle);
                });

            }
        }
    }
]);
