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

                $scope.$on("snNavbar:scrollSectionChanged", function (event, data) {
                    activeNav = angular.element(data.event).find("a").attr("href");

                    ul = $element.find("ul").children();
                    ul.removeClass("active");

                    activeLi = angular.element($element[0].querySelector("li a[href='" + activeNav + "']")).parent();
                    activeLi.addClass("active");

                    var ulNodeList = Array.prototype.slice.call(ul);
                    $scope.sectionCurrent = ulNodeList.indexOf(activeLi[0]) + 1;
                });

            }
        }
    }
]);
