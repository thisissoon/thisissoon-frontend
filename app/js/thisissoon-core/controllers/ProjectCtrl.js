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
    "CacheService",
    "project",
    "projects",
    /**
     * @constructor
     * @param {Object}  $scope     Scope of the controller
     * @param {Service} CacheService  Stores data to share between controllers
     * @param {Object}  project    Project detail object from thisissoon API
     * @param {Object}  projects   List of projects from api
     */
    function ($scope, $rootScope, CacheService, project, projects) {

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
            $scope.setNextPrevious();

            if ($scope.project.link) {
                $scope.project.linkText = $scope.project.link.split('/')[2].split('www.')[1];
            }
        }

        /**
         * Finds the next and previous projects based on the current project
         * @method setNextPrevious
         */
        $scope.setNextPrevious = function setNextPrevious(){
            var index = 0;

            angular.forEach($scope.projects, function (project, key){
                if ($scope.project.id === project.id) {
                    index = key;
                    $scope.current = key + 1;

                    if (typeof $scope.projects[key + 1] !== "undefined"){
                        $scope.next = $scope.projects[key + 1].id;
                    }

                    if (typeof $scope.projects[key - 1] !== "undefined"){
                        $scope.previous = $scope.projects[key - 1].id;
                    }
                }
            })

            $rootScope.$broadcast("currentProject", { id: $scope.project.id, currentCount: $scope.current, next: $scope.next, previous: $scope.previous });
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
         * Converts an hexidecimal color value to an rgba string.
         * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
         * @method hexToRgba
         * @param  {String} hex     The hex value to be converted
         * @param  {Float}  opacity The opacity value, defaults to 1
         * @return {String}         The converted rgba value
         */
        $scope.hexToRgba = function hexToRgba(hex, opacity) {

            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                (parseFloat(opacity || 1))
            ].join(",") : null;
        }

        $scope.$on("$destroy", function(){
            CacheService.remove("projectView");
        })

        $scope.init();

    }

]);
