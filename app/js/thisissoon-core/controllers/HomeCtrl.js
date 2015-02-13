"use strict";
/**
 * Controller for root view or "/" view of app.
 * @module thisissoon.core
 * @author SOON_
 * @class  HomeCtrl
 */
angular.module("thisissoon.core").controller("HomeCtrl", [
    "$scope",
    "$rootScope",
    "$timeout",
    "$filter",
    "CacheService",
    "projects",
    "jobs",
    "GREETINGS",
    /**
     * @constructor
     * @param {Object}  $scope       date in controller scope
     * @param {Object}  $rootScope   application root scope
     * @param {Object}  $timeout     angular wrapper for timeout
     * @param {Object}  $filter      angular filter service
     * @param {Service} CacheService Stores data to share between controllers
     * @param {Object}  projects     List of projects from api
     * @param {Object}  jobs         List of jobs from api
     */
    function ($scope, $rootScope, $timeout, $filter, CacheService, projects, jobs, GREETINGS) {

        /**
         * List of projects from thisissoon api
         * @property projects
         * @type     {Array}
         */
        $scope.projects = projects.list;

        /**
         * The sticky/featured project
         * @property sticky
         * @type     {Object}
         */
        $scope.sticky = projects.list[0];

        /**
         * List of jobs from thisissoonapi
         * @property jobs
         * @type     {Object}
         */
        $scope.jobs = jobs.list;

        /**
         * Current greetings
         * @property greeting
         */
        $scope.greeting = {};

        /**
         * Get background color for hero section
         * @property getBackgroundColor
         * @type     {String}
         */
        $scope.getBackgroundColor = function getBackgroundColor(){
            return CacheService.get("backgroundColor");
        }

        /**
         * Toggle projects list
         * @method toggleProjects
         */
        $scope.toggleProjects = function toggleProjects(){
            CacheService.put("projectList", true);
        }

        /**
         * Gets current time to display in hero
         * @method currentTime
         */
        $scope.currentTime = {
            value: new Date(),
            get: function getTime() {
                $timeout(function(){
                    $scope.currentTime.value = new Date();
                    $scope.currentTime.get();
                }, 1000);
            }
        }

        /**
         * Returns time based greeting from GREETINGS
         * @returns {String} greeting string
         * @method getGreeting
         */
        $scope.getGreeting = function getGreeting() {
            var time = $scope.currentTime.value.getHours();
            return GREETINGS[time];
        }

        /**
         * Get current time on initialisaiton
         * @method init
         */
        $scope.init = function() {
            $scope.currentTime.get();
            $scope.greeting = $scope.getGreeting();
            $scope.sticky.navStyle = $filter("snHexShade")($scope.sticky.background_colour, true);

            $rootScope.cache.put("navStyle", "light");
        }

        $scope.init();

    }

]);
