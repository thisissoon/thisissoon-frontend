"use strict";
/**
 * Controller for "/projects" view of app. Displays project
 * infomation and tells project story.
 * @module thisissoon.core
 * @author SOON_
 * @class  HeaderCtrl
 */
angular.module("thisissoon.core").controller("HeaderCtrl", [
    "$scope",
    "CacheService",
    "ThisissoonAPI",
    "NAV",
    /**
     * @constructor
     * @param {Object}  $scope        Scope of the controller
     * @param {Service} CacheService  Stores data to share between controllers
     * @param {Object}  ThisissoonAPI Provides access to api which contains all project case studies
     * @param {Object}  NAV           Provides lists of nav menu items for each view
     */
    function ($scope, CacheService, ThisissoonAPI, NAV) {

        /**
         * List of projects from thisissoon API
         * @property projects
         * @type     {Array}
         */
        $scope.projects = [];

        /**
         * List of home sections
         * @property sections
         * @type     {Array}
         */
        $scope.sections = NAV.home;

        /**
         * Expose cache in isolate scope
         * @property cache
         * @type     {Function}
         */
        $scope.cache = CacheService;

        /**
         * Toggles the state of the project list menu by updating
         * the "projectList" value in the CacheService service
         * @method toggleProjects
         */
        $scope.toggleProjects = function toggleProjects($event){
            if($event) {
                $event.preventDefault();
            }

            CacheService.put("projectList", !CacheService.get("projectList"));
        }

        /**
         * Load list of projects data on initialisation
         * @method init
         */
        $scope.init = function init(){
            ThisissoonAPI.getProjects()
                .then(function (response){
                    $scope.projects = response.list;
                })
        }

        $scope.init();

        $scope.$on("currentProject", function(event, data){
            $scope.currentProject = data.currentCount;
            $scope.prevProject = data.previous;
            $scope.nextProject = data.next;
        });

    }

]);
