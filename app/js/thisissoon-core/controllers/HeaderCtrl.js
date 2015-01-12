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
    "DataStore",
    "ThisissoonAPI",
    /**
     * @constructor
     * @param {Object}  $scope     Scope of the controller
     * @param {Service} DataStore  Stores data to share between controllers
     * @param {Object}  ThisissoonAPI  Provides access to api which contains all project case studies
     */
    function ($scope, DataStore, ThisissoonAPI) {

        /**
         * List of projects from thisissoon API
         * @property projects
         * @type     {Array}
         */
        $scope.projects = [];

        /**
         * Object containing categories to filter by
         * @property filter
         * @type     {Object}
         */
        $scope.filter = {};

        /**
         * Specifies if the filter is open, only effects
         * mobile and tablet devices.
         * @property filterOpen
         * @type     {Boolean}
         */
        $scope.filterOpen = false;

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

        /**
         * Toggles the state of the main nav menu by updating
         * the "navOpen" value in the DataStore service
         * @method toggleNav
         */
        $scope.toggleNav = function toggleNav(){
            DataStore.set("navOpen", !DataStore.get("navOpen"));
        }

        /**
         * Toggles the state of the filter by updating
         * the "filterOpen" value in controller
         * @method toggleFilter
         */
        $scope.toggleFilter = function toggleFilter(){
            $scope.filterOpen = !$scope.filterOpen;
        }

        /**
         * Sets the background image of the page to the url thats
         * passed to the function
         * @method setBackgroundImage
         * @param  {String}           url URL of background image to set to hero section
         * @param  {String}           hex color of project as a hex value
         */
        $scope.setBackgroundImage = function setBackgroundImage(url, hex){
            DataStore.set("backgroundImage", url);
            DataStore.set("backgroundColor", $scope.hexToRgba(hex, 0.5));

        }

        /**
         * Removes the background image from the hero section
         * @method removeBackgroundImage
         */
        $scope.removeBackgroundImage = function removeBackgroundImage(){
            DataStore.remove("backgroundImage");
            DataStore.remove("backgroundColor");
        }

        /**
         * @method isFilterActive
         * @return {Boolean}      Returns true if any of the project filters are active.
         */
        $scope.isFilterActive = function isFilterActive(){
            var noSelected = true;

            angular.forEach($scope.filter, function (active){
                if (active) {
                    noSelected = false;
                }
            })

            return !noSelected;
        }

        /**
         * Filter for project list, the function checks in the category
         * array and the award_year values in the project object againist
         * the list of active filters.
         * @method categoryFilter
         * @param  {Object}       project Item in list to filter
         * @return {Boolean}      returns true if the item is to be included
         *                        the filtered list
         */
        $scope.categoryFilter = function categoryFilter(project){
            var include = true;

            if (!$scope.isFilterActive()) {
                // if none of the filters are active include everything
                include = true;
            } else {
                // loop through the projects categories and the filters to check
                // if the project contains all categories who's filter is active
                angular.forEach($scope.filter, function (active, filter){
                    // check if filter is the year filter
                    if (filter === "year") {
                        // check if not null so if the year filter is active
                        // and if the project year matches the filter
                        if ((typeof active === "number") && (parseInt(project.award_year) !== active)){
                            include = false;
                        }

                    } else if (typeof active === "string") {
                        var containsCategory = false;
                        // check if the current filter is in the projects category array
                        angular.forEach(project.categories, function (category) {
                            if ($scope.filter.category === category.slug){
                                containsCategory = true;
                            }
                        });

                        if (!containsCategory) {
                            include = false;
                        }
                    }

                });
            }
            return include;
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

        $scope.init();

    }

]);
