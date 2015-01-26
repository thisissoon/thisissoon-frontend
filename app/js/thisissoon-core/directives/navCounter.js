"use strict";
/**
 * Directive for section pagination.
 * @author SOON_
 * @module thisissoon.core
 * @class  soonPagination
 */
angular.module("thisissoon.core").directive("navCounter",[
    "$timeout",
    "ScrollService",
    /**
     * @constructor
     */
    function ($timeout, ScrollService){
        return {
            restrict: "EAC",
            templateUrl: "partials/nav-counter.html",
            link: function($scope, $element) {

                $scope.sectionCurrent = 1;

                var activeNav, activeLi, activeIndex, ul;

                $scope.$on("scrollSpyChanged", function (event, data) {
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
