"use strict";
/**
 * Controller for "/projects" view of app. Displays project
 * infomation and tells project story.
 * @module thisissoon.core
 * @author SOON_
 * @class  ProjectCtrl
 */
angular.module("thisissoon.core").controller("ProjectCtrl", [
    "$scope",
    "$rootScope",
    "$filter",
    "$sce",
    "CacheService",
    "project",
    "projects",
    /**
     * @constructor
     * @param   {Object}   $scope       Scope of the controller
     * @param   {Object}   $rootScope   application root scope
     * @param   {Service}  $filter      angular filter service; selects subset of items from array and returns it as a new array.
     * @param   {Service}  $sce         Strict contextual escaping service
     * @param   {Service}  CacheService Stores data to share between controllers
     * @param   {Object}   project      Project detail object from thisissoon API
     * @param   {Object}   projects     List of projects from api
     */
    function ($scope, $rootScope, $filter, $sce, CacheService, project, projects) {

        /**
         * List of projects from thisissoon API
         * @property {Array} projects
         */
        $scope.projects = projects.list;

        /**
         * Project detail object from thisissoon API
         * @property {Object} project
         */
        $scope.project = project;

        /**
         * Assigns section numbers and generates next and previous urls
         * @method init
         */
        $scope.init = function init () {
            CacheService.put("projectView", true);
            CacheService.put("backgroundColor", project.background_colour);
            $scope.setNextPrevious();

            // format link for display
            if ($scope.project.link) {
                $scope.project.linkText = $filter("linkDisplay")($scope.project.link);
            }

            if ($scope.project.video && $scope.project.video !== "") {
                $scope.project.video = $sce.trustAsResourceUrl($scope.project.video + "?autohide=1");
            } else {
                $scope.project.video = null;
            }
        };

        /**
         * Finds the next and previous projects based on the current project
         * @method setNextPrevious
         */
        $scope.setNextPrevious = function setNextPrevious () {
            var index = 0;

            angular.forEach($scope.projects, function (project, key){
                if ($scope.project.id === project.id) {
                    index = key;

                    if (typeof $scope.projects[key + 1] !== "undefined"){
                        $scope.next = $scope.projects[key + 1].slug;
                    } else {
                        // back to first project
                        $scope.next = $scope.projects[0].slug;
                    }

                    if (typeof $scope.projects[key - 1] !== "undefined"){
                        $scope.previous = $scope.projects[key - 1].slug;
                    } else {
                        // back to last project
                        $scope.previous = $scope.projects[$scope.projects.length - 1].slug;
                    }
                }
            });

            CacheService.put("project", {
                id: $scope.project.id,
                current: index + 1,
                next: $scope.next,
                previous: $scope.previous,
                count: projects.list.length,
                backgroundColor: project.background_colour
            });
        };

        /**
         * Get background color for hero section
         * @property {String} getBackgroundColor
         */
        $scope.getBackgroundColor = function getBackgroundColor () {
            return CacheService.get("backgroundColor");
        };

        $scope.$on("$destroy", function(){
            CacheService.remove("projectView");
            CacheService.remove("backgroundColor");
            CacheService.remove("project");
        });

        $scope.init();

    }

]);
