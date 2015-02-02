"use strict";
/**
 * Directive for site navigation.
 * @author SOON_
 * @module thisissoon.nav
 * @class  snNavbar
 */
angular.module("thisissoon.nav.snNavbar").directive("snNavbar",[
    "$timeout",
    "$rootScope",
    "$filter",
    "ScrollService",
    "CacheService",
    "NAV",
    /**
     * @constructor
     * @param {Service} $timeout      angular wrapper for setTimeout
     * @param {Service} ScrollService handles scroll events
     */
    function ($timeout, $rootScope, $filter, ScrollService, CacheService){
        return {
            restrict: "E",
            scope: {},
            templateUrl: "partials/navbar.html",
            controller: "NavbarCtrl",
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
                        $element.find("nav").addClass("navbar-hide");
                    }

                    // track lastScroll properties
                    lastScroll = {
                        time: timeNow,
                        position: scrollPosition
                    }

                    // show nav once scrolling has stopped for 800ms
                    $timeout(function() {
                        if (timeNow === lastScroll.time) {
                            $element.find("nav").removeClass("navbar-hide");
                        }
                    }, delay);
                }

                /**
                 * Set navbar style from backgroundColor
                 * @method setNavStyle
                 */
                $scope.setNavStyle = function setNavStyle(navStyle) {

                    if (navStyle && navStyle.charAt(0) === "#") {
                        $scope.navStyle = $filter("snHexShade")(navStyle, true);
                    } else if (navStyle) {
                        $scope.navStyle = navStyle;
                    }

                    switch($scope.navStyle) {
                        case "dark":
                            $element.find("nav").addClass("navbar-dark").removeClass("navbar-light");
                            CacheService.put("navStyle", "dark");
                            break;
                        default:
                            $element.find("nav").removeClass("navbar-dark").addClass("navbar-light");
                            CacheService.put("navStyle", "light");
                    }
                }

                ScrollService.add($scope.$id, onScroll);
            }
        }
    }
]);
