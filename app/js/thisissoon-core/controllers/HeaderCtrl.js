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
     * @param {Object}  $scope        Scope of the controller
     * @param {Service} DataStore     Stores data to share between controllers
     * @param {Object}  ThisissoonAPI Provides access to api which contains all project case studies
     */
    function ($scope, DataStore, ThisissoonAPI) {

        /**
         * List of projects from thisissoon API
         * @property projects
         * @type     {Array}
         */
        $scope.projects = [];

        /**
         * Expose dataStore on isolate scope
         * @property dataStore
         * @type     {Function}
         */
        $scope.dataStore = DataStore;

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

        $scope.$on("currentProject", function(event, data){
            $scope.currentProject = data.currentCount;
            $scope.prevProject = data.previous;
            $scope.nextProject = data.next;
        });

    }

]);
