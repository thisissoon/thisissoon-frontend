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
    "$location",
    "CacheService",
    "project",
    "projects",
    /**
     * @constructor
     * @param   {Object}  $scope       Scope of the controller
     * @param   {Object}  $rootScope   application root scope
     * @param   {Service} $filter      angular filter service; selects a subset of items from array and returns it as a new array.
     * @param   {Service} CacheService Stores data to share between controllers
     * @param   {Object}  project      Project detail object from thisissoon API
     * @param   {Object}  projects     List of projects from api
     */
    function ($scope, $rootScope, $filter, $location, CacheService, project, projects) {

        /**
         * List of projects from thisissoon API
         * @property projects
         * @type     {Array}
         */
        $scope.projects = projects.list;

        /**
         * Project detail object from thisissoon API
         * @property project
         * @type     {Object}
         */
        $scope.project = project;

        /**
         * Assigns section numbers and generates next and previous urls
         * @method init
         */
        $scope.init = function init(){
            CacheService.put("projectView", true);
            CacheService.put("backgroundColor", project.background_colour);
            $scope.setNextPrevious();

            // format link for display
            if ($scope.project.link) {
                $scope.project.linkText = $filter("linkDisplay")($scope.project.link);
            }

            $rootScope.socialMeta = {
                description: $scope.project.introduction,
                title: $scope.project.title,
                image: $rootScope.env.SERVER_ADDRESS + $scope.project.hero_image.huge,
                url: $location.absUrl()
            };
        }

        /**
         * Finds the next and previous projects based on the current project
         * @method setNextPrevious
         */
        $scope.setNextPrevious = function setNextPrevious(){
            var index = 0,
                current = 0,
                next = 0,
                previous = 0;

            angular.forEach($scope.projects, function (project, key){
                if ($scope.project.id === project.id) {
                    index = key;

                    if (typeof $scope.projects[key + 1] !== "undefined"){
                        $scope.next = $scope.projects[key + 1].id;
                    }

                    if (typeof $scope.projects[key - 1] !== "undefined"){
                        $scope.previous = $scope.projects[key - 1].id;
                    }
                }
            })

            $rootScope.$broadcast("thisissoon:projectChanged", {
                id: $scope.project.id,
                current: index + 1,
                next: $scope.next,
                previous: $scope.previous,
                count: projects.list.length,
                backgroundColor: project.background_colour
            });
        }

        /**
         * Get background color for hero section
         * @property getBackgroundColor
         * @type     {String}
         */
        $scope.getBackgroundColor = function getBackgroundColor(){
            return CacheService.get("backgroundColor");
        }

        $scope.$on("$destroy", function(){
            CacheService.remove("projectView");
            CacheService.remove("backgroundColor");
        })

        $scope.init();

    }

]);
