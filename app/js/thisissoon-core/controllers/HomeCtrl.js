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
    "CacheService",
    "projects",
    "jobs",
    "GREETINGS",
    /**
     * @constructor
     * @param {Object}  $scope
     * @param {Object}  $rootScope
     * @param {Service} CacheService  Stores data to share between controllers
     * @param {Object}  projects   List of projects from api
     * @param {Object}  jobs       List of jobs from api
     */
    function ($scope, $rootScope, $timeout, CacheService, projects, jobs, GREETINGS) {

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
        $scope.sticky = projects.sticky;

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
        $scope.greeting = "";

        /**
         * Get background image for hero section
         * @property getBackgroundImage
         * @type     {String}
         */
        $scope.getBackgroundImage = function getBackgroundImage(){
            return CacheService.get("backgroundImage");
        }

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
         * Time boundaries for dynamic greeting
         * @property timeBoundaries
         */
        $scope.timeBoundaries = {
            am: new Date().setHours(0),
            pm: new Date().setHours(12),
            eve: new Date().setHours(18),
            tomo: new Date().setHours(24)
        }

        /**
         * Return random item from array
         * @param   {Array}  array array to parse
         * @returns {String} random item
         */
        $scope.randomItem = function randomItem(array) {
            return array[(Math.floor(Math.random() * array.length))];
        }

        /**
         * Returns time based greeting from GREETINGS
         * @returns {String} greeting string
         * @method getGreeting
         */
        $scope.getGreeting = function getGreeting() {

            var time = $scope.currentTime.value,
                am = time >= $scope.timeBoundaries.am && time < $scope.timeBoundaries.pm,
                pm = time >= $scope.timeBoundaries.pm && time < $scope.timeBoundaries.eve,
                eve = time >= $scope.timeBoundaries.eve && time < $scope.timeBoundaries.tomo;

            if (am) {
                return $scope.randomItem(GREETINGS.am);
            } else if (pm) {
                return $scope.randomItem(GREETINGS.pm);
            } else if (eve) {
                return $scope.randomItem(GREETINGS.eve);
            }
        }

        /**
         * Get current time on initialisaiton
         * @method init
         */
        $scope.init = function() {
            $scope.currentTime.get();
            $scope.greeting = $scope.getGreeting();
        }

        $scope.init();

    }

]);
