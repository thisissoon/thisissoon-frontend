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
            restrict: "E",
            templateUrl: "partials/nav-counter.html",
            link: function($scope, $element) {

                $scope.sectionCurrent = 1;

                var activeNav, activeLi, activeIndex, ul;

                $scope.$on("scrollSpyChanged", function (event, data) {

                    activeNav = angular.element(data.target).find("a").attr("href");

                    ul = $element.find("li");
                    ul.removeClass("active");

                    activeLi = $element.find("li a[href='" + activeNav + "']").parent();
                    activeLi.addClass("active");

                    $scope.sectionCurrent = activeLi.index() + 1;
                });

            }
        }
    }
]);
