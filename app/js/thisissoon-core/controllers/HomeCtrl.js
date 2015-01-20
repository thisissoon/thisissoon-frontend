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
    /**
     * @constructor
     * @param {Object}  $scope
     * @param {Object}  $rootScope
     * @param {Service} CacheService  Stores data to share between controllers
     * @param {Object}  projects   List of projects from api
     * @param {Object}  jobs       List of jobs from api
     */
    function ($scope, $rootScope, $timeout, CacheService, projects, jobs) {

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
            morning: new Date().setHours(5),
            afternoon: new Date().setHours(12),
            evening: new Date().setHours(18),
            night: new Date().setHours(23)
        }

        /**
         * Get current time on initialisaiton
         * @method init
         */
        $scope.init = function() {
            $scope.currentTime.get();
        }

        $scope.init();

    }

]);
