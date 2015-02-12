"use strict";
/**
 * Controller for navbar
 * @module thisissoon.nav
 * @author SOON_
 * @class  NavbarCtrl
 */
angular.module("thisissoon.nav.snNavbar").controller("NavbarCtrl", [
    "$scope",
    "$rootScope",
    "CacheService",
    "NAV",
    /**
     * @constructor
     * @param {Object}  $scope       scope of the controller
     * @param {Object}  $rootScope   root scope object for thisissoon app
     * @param {Service} CacheService Stores data to share between controllers
     * @param {Object}  NAV          Nav sections config
     */
    function ($scope, $rootScope, CacheService, NAV) {
        /**
         * Expose CacheService on scope
         * @property cache
         * @type     {Service}
         */
        $scope.cache = CacheService;

        /**
         * Navigation sections config
         * @property sections
         * @type     {Object}
         */
        $scope.sections = NAV;

        /**
         * Track navbar colour in project view
         * @property navStyle
         * @type     {String}
         */
        $scope.navStyle = "light";

        /**
         * Current project details
         * @property {Object} project
         */
        $scope.project = {};

        /**
         * Hide the fullscreen navigation on selecting an item
         * @method navClick
         */
        $scope.navClick = function navClick(event){
            CacheService.put("navOpen", false);

            if (event && event.path) {
                var eventName = angular.element(event.path).find("a").attr("data-event");
                $scope.$emit("snNavbar:" + eventName, event);
            }
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
         * On scrollspy event set navigation style
         * @param {Object} $event   js event object
         * @param {Object} $element anchor element for active section
         */
        $rootScope.$on("duScrollspy:becameActive", function($event, $element){
            var anchor = angular.element($element).find("a"),
                navStyle = anchor[0].dataset.navStyle;

            $rootScope.$broadcast("snNavbar:scrollSectionChanged",  {
                section: anchor.attr("href"),
                navStyle: navStyle
            });
            $scope.setNavStyle(navStyle);
        });

        /**
         * On project change set next/previous and nav style
         * @param {Object} newProject project navigated too (current)
         * @param {Object} oldProject project navigated away from
         */
        $scope.$watch("cache.get('project')", function(newProject, oldProject){
            if (newProject && newProject.backgroundColor) {
                $scope.project = newProject;
                $scope.setNavStyle(newProject.backgroundColor);
            }
        });
    }
]);
