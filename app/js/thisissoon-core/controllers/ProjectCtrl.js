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
    "$modal",
    "$sce",
    "DataStore",
    "SECTIONS",
    "project",
    "projects",
    /**
     * @constructor
     * @param {Object}  $scope     Scope of the controller
     * @param {Service} $modal     Angular-bootstrap modal service
     * @param {Service} $sce       angular sanitize service
     * @param {Service} DataStore  Stores data to share between controllers
     * @param {Object}  SECTIONS   Sections of the project detail view, their display status and positions
     * @param {Object}  project    Project detail object from thisissoon API
     * @param {Object}  projects   List of projects from api
     */
    function ($scope, $modal, $sce, DataStore, SECTIONS, project, projects) {

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
         * An index to use as a reference when assigning
         * section numbers.
         * @property sectionIndex
         * @type     {Number}
         */
        $scope.sectionIndex = 1;

        /**
         * Contains the required data for each sections
         * and a number based on their position.
         * @property sections
         * @type     {Object}
         */
        $scope.sections = SECTIONS;

        /**
         * Assigns section numbers and generates next and previous urls
         * @method init
         */
        $scope.init = function init(){
            DataStore.set("projectView", true);
            if ($scope.project.video && $scope.project.video !== "") {
                console.log("sjfhasjda")
                $scope.project.video = $sce.trustAsResourceUrl($scope.project.video + "?autoplay=1&autohide=1")
            } else {
                $scope.project.video = null;
            }
            $scope.assignSectionNo();
            $scope.setNextPrevious();
        }

        /**
         * Assigns a number to a section of the view if
         * there is enough infomation from the api to display
         * the section
         * @method assignSectionNo
         */
        $scope.assignSectionNo = function assignSectionNo(){

            $scope.sectionIndex = 1;

            angular.forEach($scope.sections, function (section){
                if ($scope.project[section.data].length > 0){
                    section.no = ($scope.sectionIndex > 9) ? $scope.sectionIndex.toString() : ("0" + $scope.sectionIndex);
                    section.display = true;
                    $scope.sectionIndex++;
                } else {
                    section.no = null;
                    section.display = false;
                }
            })

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

                    if (typeof $scope.projects[key + 1] !== "undefined"){
                        $scope.next = $scope.projects[key + 1].id;
                    }

                    if (typeof $scope.projects[key - 1] !== "undefined"){
                        $scope.previous = $scope.projects[key - 1].id;
                    }
                }
            })


        }

        /**
         * Get background image for hero section
         * @property getBackgroundImage
         * @type     {String}
         */
        $scope.getBackgroundImage = function getBackgroundImage(){
            return DataStore.get("backgroundImage");
        }

        /**
         * Get background color for hero section
         * @property getBackgroundColor
         * @type     {String}
         */
        $scope.getBackgroundColor = function getBackgroundColor(){
            return DataStore.get("backgroundColor");
        }

        /**
         * Opens modal window with youtube player inside
         * @method PlayVideo
         */
        $scope.playVideo = function playVideo(){
            $modal.open({
                templateUrl: "partials/modal-youtube.html",
                scope: $scope
            });
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
            DataStore.remove("projectView");
        })

        $scope.init();

    }

]);
