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
    "HOME_SECTIONS",
    /**
     * @constructor
     * @param {Object}  $scope     Scope of the controller
     * @param {Object}  ThisissoonAPI  Provides access to api which contains all project case studies
     */
    function ($scope, DataStore, ThisissoonAPI, HOME_SECTIONS) {

        /**
         * List of projects from thisissoon API
         * @property projects
         * @type     {Array}
         */
        $scope.projects = [];

        /**
         * List of home page sections
         * @property sections
         * @type     {Array}
         */
        $scope.sections = HOME_SECTIONS;

        /**
         * Toggles the state of the project list menu by updating
         * the "projectList" value in the DataStore service
         * @method toggleProjects
         */
        $scope.toggleProjects = function toggleProjects($event){
            if($event) {
                $event.preventDefault();
            }

            DataStore.set("projectList", !DataStore.get("projectList"));
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

    }

]);
