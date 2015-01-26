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
    "CacheService",
    "ThisissoonAPI",
    "NAV",
    "SOON_LOGO",
    "ICONS",
    /**
     * @constructor
     * @param {Object}  $scope        Scope of the controller
     * @param {Service} CacheService  Stores data to share between controllers
     * @param {Object}  ThisissoonAPI Provides access to api which contains all project case studies
     * @param {Object}  NAV           Provides lists of nav menu items for each view
     * @param {Object}  ICONS         Icon animation config constant
     */
    function ($scope, $rootScope, CacheService, ThisissoonAPI, NAV, SOON_LOGO, ICONS) {

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
         * Expose logo animation object on scope
         * @property logoAnimation
         * @type     {Function}
         */
        $scope.logoAnimation = SOON_LOGO.full;

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
        $scope.toggleProjects = function toggleProjects($event){
            if($event) {
                $event.preventDefault();
            }

            CacheService.put("projectList", !CacheService.get("projectList"));
        }

        /**
         * Checks hexidecimal color value to determine whether it is light or dark
         * @method hexIsLight
         * @param   {String}  hexcolor hexidecimal color value
         * @returns {Boolean} true if color is light
         */
        $scope.hexIsLight = function hexIsLight(hexcolor) {
            var r = parseInt(hexcolor.substr(1,2),16);
            var g = parseInt(hexcolor.substr(3,2),16);
            var b = parseInt(hexcolor.substr(5,2),16);
            var yiq = ((r*299)+(g*587)+(b*114))/1000;
            return (yiq >= 128) ? true : false;
        }

        /**
         * On project load set nav style
         * @method onProjectLoad
         */
        $scope.onProjectLoad = function(data) {
            if(!$rootScope.$$phase){
                $scope.$apply(function(){
                    $scope.navStyle =  $scope.hexIsLight( CacheService.get("backgroundColor") ) ? "dark" : "light";
                })
            } else {
                $scope.navStyle =  $scope.hexIsLight( CacheService.get("backgroundColor") ) ? "dark" : "light";
            }
        }

        /**
         * Load list of projects data on initialisation
         * @method init
         */
        $scope.init = function init(){
            ThisissoonAPI.getProjects()
                .then(function (response){
                    $scope.projects = response.list;
                    $scope.sections[1].navStyle = $scope.hexIsLight(response.list[0].background_colour) ? "dark" : "light";
                })
        }

        $scope.init();

        $scope.$on("currentProject", function(event, data){
            $scope.currentProject = data.currentCount;
            $scope.prevProject = data.previous;
            $scope.nextProject = data.next;
            $scope.onProjectLoad(data);
        });

        $scope.$on("scrollSpyChanged", function(event, data){
            $scope.navStyle = data.navStyle;
        });
    }

]);
