"use strict";
/**
 * Wrapper for thisissoon API. Handles retrieving of project and category data
 * @module thisissoon.api
 * @author SOON_
 * @class ThisissoonAPI
 */
angular.module("thisissoon.api").service("ThisissoonAPI", [
    "$q",
    "$http",
    "ENV",
    /**
     * @constructor
     * @param {Service} $q    Angularjs deferred promised service
     * @param {Service} $http Angularjs XHR wrapper service
     */
    function ($q, $http, ENV) {

        /**
         * Retrieves a object that contains the details of a project
         * @function getProjectDetail
         * @param  {String}  slug The unique slug identifier for project
         * @return {Promise} A promise that will resolve if the project
         *                   exists or be rejected if it does not
         * @example
         * ThisissoonAPI.getProjectDetail("doit")
         *     .then(function(projectObj){
         *         console.log(projectObj)
         *         // Do something with project object here
         *     })
         *     .catch(function(){
         *         console.log("No Project Found")
         *         // error handling code
         *     })
         */
        this.getProjectDetail = function getProjectDetail(slug){
            var deferred = $q.defer();

            $http.get(ENV.API_ADDRESS + "projects/" + slug + "/")
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }

        /**
         * Retrieves a object that contains the list of projects
         * and a sticky project
         * @function getProjects
         * @return   {Promise} A promise that will resolve if the project
         *                   exists or be rejected if it does not
         * @example
         * ThisisssoonAPI.getProjects()
         *     .then(function(projectsObj){
         *         console.log(projectsObj)
         *         // Do something with project object here
         *     })
         *     .catch(function(){
         *         console.log("No Project Found")
         *         // error handling code
         *     })
         */
        this.getProjects = function getProjects(){
            var deferred = $q.defer();

            $http.get(ENV.API_ADDRESS + "projects/")
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }

        /**
         * Retrieves a object that contains the list of projects
         * and a sticky project
         * @function getCategories
         * @return   {Promise} A promise that will resolve if the project
         *                   exists or be rejected if it does not
         * @example
         * ThisisssoonAPI.getCategories()
         *     .then(function(categoriesObj){
         *         console.log(categoriesObj)
         *         // Do something with project object here
         *     })
         *     .catch(function(){
         *         console.log("No Project Found")
         *         // error handling code
         *     })
         */
        this.getCategories = function getCategories(){
            var deferred = $q.defer();

            $http.get(ENV.API_ADDRESS + "categories/")
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }

        /**
         * Retrieves a object that contains the list of jobs
         * @function getJobs
         * @return   {Promise} A promise that will resolve if jobs
         *                   exist or be rejected if it does not
         * @example
         * ThisisssoonAPI.getJobs()
         *     .then(function(jobsObj){
         *         console.log(jobsObj)
         *         // Do something with project object here
         *     })
         *     .catch(function(){
         *         console.log("No Jobs Found")
         *         // error handling code
         *     })
         */
        this.getJobs = function getCategories(){
            var deferred = $q.defer();

            $http.get(ENV.API_ADDRESS + "jobs/")
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }


    }
]);
