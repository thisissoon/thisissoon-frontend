"use strict";
/**
 * Directive for displaying current section.
 * @author SOON_
 * @module thisissoon.nav.snNavCounter
 * @class  snNavCounter
 */
angular.module("thisissoon.nav.snNavCounter", [
    "thisissoon.nav.config",
    "thisissoon.nav.snNumberString"
])

.directive("snNavCounter",[
    "$timeout",
    "ScrollService",
    "NAV",
    /**
     * @constructor
     */
    function ($timeout, ScrollService, NAV){
        return {
            restrict: "E",
            templateUrl: "partials/nav-counter.html",
            scope: {
                "style": "="
            },
            link: function($scope, $element) {

                $scope.sections = NAV;
                $scope.sectionCurrent = 1;

                var activeNav, activeLi, activeIndex, ul;

                /**
                 * Set nav style, active class and section index for current section
                 * @param {Object} event js event
                 * @param {Object} data  data object { event: js event from duScroll, navStyle: sections nav style }
                 */
                $scope.$on("snNavbar:scrollSectionChanged", function (event, data) {
                    // set nav style
                    $scope.style = data.navStyle;

                    // store active section href
                    activeNav = angular.element(data.event).find("a").attr("href");

                    // cache nav list items
                    ul = $element.find("ul").children();
                    ul.removeClass("active");

                    // set active class on active nav item
                    activeLi = angular.element($element[0].querySelector("li a[href='" + activeNav + "']")).parent();
                    activeLi.addClass("active");

                    // set current section index for 'x of x' display
                    var ulNodeList = Array.prototype.slice.call(ul);
                    $scope.sectionCurrent = ulNodeList.indexOf(activeLi[0]) + 1;
                });

            }
        }
    }
]);
