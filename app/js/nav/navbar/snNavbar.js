"use strict";
/**
 * Directive for site navigation.
 * @author SOON_
 * @module thisissoon.nav
 * @class  snNavbar
 */
angular.module("thisissoon.nav.snNavbar", [
    "duScroll",
    "soon.ui.ScrollService",

    "thisissoon.nav.config",
    "thisissoon.nav.NavbarCtrl",
    "thisissoon.cache",
    "thisissoon.nav.snHexShade"
])

.directive("snNavbar",[
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
            templateUrl: "partials/nav/navbar.html",
            controller: "NavbarCtrl",
            link: function($scope, $element) {

                /**
                 * @property {Object} lastScroll
                 */
                $scope.lastScroll = {
                    time: 0,
                    position: {
                        px: 0
                    }
                };

                /**
                 * Hide navbar on scroll
                 * @param {Object} $event         scroll event
                 * @param {Object} scrollPosition data object with scroll postion
                 */
                $scope.onScroll = function onScroll ($event, scrollPosition) {

                    var timeNow = (new Date()).getTime(),
                        delay = 500;

                    // hide navigation on scroll action
                    if ($scope.lastScroll.time !== 0 && $scope.lastScroll.position.px < scrollPosition.px) {
                        $element.find("nav").addClass("navbar-hide");
                    }

                    // track lastScroll properties
                    $scope.lastScroll = {
                        time: timeNow,
                        position: scrollPosition
                    };

                    // show nav once scrolling has stopped for 800ms
                    $timeout(function() {
                        if (timeNow === $scope.lastScroll.time) {
                            $element.find("nav").removeClass("navbar-hide");
                        }

                        // set 'scrolled' class if page has been scrolled
                        if ($scope.lastScroll.position.px !== 0) {
                            $element.addClass("scrolled");
                        } else {
                            $element.removeClass("scrolled");
                        }
                    }, delay);
                };

                /**
                 * Set navbar style from backgroundColor
                 * @method setNavStyle
                 */
                $scope.setNavStyle = function setNavStyle (navStyle) {

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
                };

                ScrollService.add($scope.$id, $scope.onScroll);
            }
        };
    }
]);
