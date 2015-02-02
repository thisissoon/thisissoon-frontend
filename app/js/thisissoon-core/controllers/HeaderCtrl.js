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
    "$rootScope",
    "$document",
    "$filter",
    "CacheService",
    "ThisissoonAPI",
    "ICONS",
    "NAV",
    /**
     * @constructor
     * @param {Object}  $scope        Scope of the controller
     * @param {Object}  $rootScope    thisissoon app root scope
     * @param {Service} $document     angular wrapper for document
     * @param {Service} $filter       angular filters
     * @param {Service} CacheService  Stores data to share between controllers
     * @param {Object}  ThisissoonAPI Provides access to api which contains all project case studies
     * @param {Object}  ICONS         Icon animation config constant
     * @param {Object}  NAV           nav section config
     */
    function ($scope, $rootScope, $document, $filter, CacheService, ThisissoonAPI, ICONS, NAV) {

        /**
         * Expose env in isolate scope
         * @property env
         * @type     {Object}
         */
        $scope.env = $rootScope.env;

        /**
         * List of projects from thisissoon API
         * @property projects
         * @type     {Array}
         */
        $scope.projects = [];

        /**
         * Expose icon animation object on scope
         * @property iconAnimation
         * @type     {Object}
         */
        $scope.iconAnimations = ICONS;

        /**
         * Track navbar colour in project view
         * @propert  navStyle
         * @property {String}
         */
        $scope.navStyle = "light";

        /**
         * Toggles the state of the project list menu by updating
         * the "projectList" value in the CacheService service
         * @method toggleProjects
         */
        $scope.toggleProjects = function toggleProjects(event, navEvent){
            CacheService.put("projectList", !CacheService.get("projectList"));

            if(navEvent){
                navEvent.preventDefault();
            }
            $document.duScrollTop(0);
        }

        /**
         * Load list of projects data on initialisation
         * @method init
         */
        $scope.init = function init(){
            ThisissoonAPI.getProjects()
                .then(function (response){
                    $scope.projects = response.list;
                    NAV[1].navStyle = $filter("snHexShade")(response.list[0].background_colour, true);
                })
        }

        $scope.init();

        $scope.$on("snNavbar:project", $scope.toggleProjects);

        $scope.$on("snNavbar:styleChanged", function(event, data){
            $scope.navStyle = data.navStyle;
        });
    }

]);
