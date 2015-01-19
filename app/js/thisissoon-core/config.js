"use strict";
/**
 * Configuration for thisissoon.core dependencies are set here.
 * @module thisissoon.core
 * @author SOON_
 */
angular.module("thisissoon.core").config([
    "$routeProvider",
    "$httpProvider",
    /**
     * @constructor
     * @param {Service} $routeProvider
     * @param {Service} $httpProvider
     */
    function ($routeProvider, $httpProvider) {

        $httpProvider.defaults.cache = false;

        $routeProvider
            .when("/", {
                templateUrl: "partials/home.html",
                controller: "HomeCtrl",
                resolve: {
                    projects: ["ThisissoonAPI", function (ThisissoonAPI){
                        return ThisissoonAPI.getProjects();
                    }],
                    jobs: ["ThisissoonAPI", function (ThisissoonAPI){
                        return ThisissoonAPI.getJobs();
                    }]
                }
            })
            .when("/projects/:id", {
                templateUrl: "partials/project-detail.html",
                controller: "ProjectCtrl",
                resolve: {
                    projects: ["ThisissoonAPI", function (ThisissoonAPI){
                        return ThisissoonAPI.getProjects();
                    }],
                    project: ["ThisissoonAPI", "$route", function (ThisissoonAPI, $route){
                        return ThisissoonAPI.getProjectDetail($route.current.params.id);
                    }]
                }
            })
            .otherwise({
                redirectTo: "/"
            })

    }
])
