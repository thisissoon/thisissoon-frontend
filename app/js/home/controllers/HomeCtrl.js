"use strict";
/**
 * Controller for root view or "/" view of app.
 * @module thisissoon.home.HomeCtrl
 * @author SOON_
 * @class  HomeCtrl
 * @requires ngRoute {@link https://docs.angularjs.org/api/ngRoute}
 * @requires sn.addthis {@link https://github.com/thisissoon/angular-addthis}
 *
 */
angular.module("thisissoon.home.HomeCtrl", [
    "ngRoute",

    "thisissoon.home.greetings",
    "thisissoon.nav.snHexShade",
    "thisissoon.cache",
    "thisissoon.api"
])

.config([
    "$routeProvider",
    function ($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "partials/home/home.html",
                controller: "HomeCtrl",
                resolve: {
                    projects: ["ThisissoonAPI", function (ThisissoonAPI){
                        return ThisissoonAPI.getProjects();
                    }],
                    jobs: ["ThisissoonAPI", function (ThisissoonAPI){
                        return ThisissoonAPI.getJobs();
                    }]
                }
            });

    }
])

.controller("HomeCtrl", [
    "$scope",
    "$rootScope",
    "$timeout",
    "$filter",
    "$document",
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
     * @param {Object}  $document    angular wrapper for document
     * @param {Service} CacheService Stores data to share between controllers
     * @param {Object}  projects     List of projects from api
     * @param {Object}  jobs         List of jobs from api
     * @param {Object}  GREETINGS    Data for hourly greetings
     */
    function ($scope, $rootScope, $timeout, $filter, $document, CacheService, projects, jobs, GREETINGS) {

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
        $scope.getBackgroundColor = function getBackgroundColor () {
            return CacheService.get("backgroundColor");
        };

        /**
         * Toggle projects list
         * @method toggleProjects
         */
        $scope.toggleProjects = function toggleProjects () {
            $document.duScrollTop(0, 0).then(function(){
                CacheService.put("projectList", true);
            });
        };

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
        };

        /**
         * Returns time based greeting from GREETINGS
         * @returns {String} greeting string
         * @method getGreeting
         */
        $scope.getGreeting = function getGreeting () {
            var time = $scope.currentTime.value.getHours();
            return GREETINGS[time];
        };

        /**
         * Get current time on initialisaiton
         * @method init
         */
        $scope.init = function () {
            $scope.currentTime.get();
            $scope.greeting = $scope.getGreeting();
            $scope.sticky.navStyle = $filter("snHexShade")($scope.sticky.background_colour, true);

            $rootScope.cache.put("navStyle", "light");
        };

        $scope.init();

    }

]);
