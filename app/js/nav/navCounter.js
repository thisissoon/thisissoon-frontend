"use strict";
/**
 * Directive for displaying current section.
 * @author SOON_
 * @module thisissoon.nav.snNavCounter
 * @class  snNavCounter
 */
angular.module("thisissoon.nav.snNavCounter", [
    "soon.ui.ScrollService",

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
            templateUrl: "partials/nav/nav-counter.html",
            scope: {
                "style": "="
            },
            link: function($scope, $element) {

                /**
                 * Sections from NAV config object
                 * @property {Object} sections
                 */
                $scope.sections = NAV;

                /**
                 * Index of current section
                 * @property {Number} sectionCurrent
                 */
                $scope.sectionCurrent = 1;

                /**
                 * Cached navCounter list items
                 * @property {Object} ul
                 */
                var ul;

                /**
                 * Cached active navCounter list item
                 * @property {Object} activeLi
                 */
                var activeLi;

                /**
                 * Set nav style, active class and section index for current section
                 * @param {Object} event js event
                 * @param {Object} data  data object { section: id of active section, navStyle: navStyle of active section }
                 */
                $scope.$on("snNavbar:scrollSectionChanged", function onScrollSectionChange(event, data) {

                    // set nav style and active section from data object
                    $scope.style = data.navStyle;
                    $scope.active = data.section;

                    // cache navCounter list items
                    ul = $element.find("ul").children();
                    ul.removeClass("active");

                    // set active class on active nav item
                    activeLi = angular.element($element[0].querySelector("li a[href='" + $scope.active + "']")).parent();
                    activeLi.addClass("active");

                    // set current section index for 'x of x' display
                    var ulNodeList = Array.prototype.slice.call(ul);
                    $scope.sectionCurrent = ulNodeList.indexOf(activeLi[0]) + 1;
                });

            }
        };
    }
]);
