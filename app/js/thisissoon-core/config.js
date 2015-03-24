"use strict";
/**
 * Configuration for thisissoon.core dependencies are set here.
 * @module thisissoon.core
 * @author SOON_
 */
angular.module("thisissoon.core").config([
    "$routeProvider",
    "$httpProvider",
    "$locationProvider",
    "snSkrollrProvider",
    /**
     * @constructor
     * @param {Service} $routeProvider
     * @param {Service} $httpProvider
     */
    function ($routeProvider, $httpProvider, $locationProvider, snSkrollrProvider) {

        snSkrollrProvider.config = {
            forceHeight: false,
            smoothScrolling: true,
            mobileDeceleration: 0.004
        };

        $httpProvider.defaults.cache = false;

        $locationProvider.html5Mode(true).hashPrefix("!");

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
            .when("/projects/:slug", {
                templateUrl: "partials/project-detail.html",
                controller: "ProjectCtrl",
                resolve: {
                    projects: ["ThisissoonAPI", function (ThisissoonAPI){
                        return ThisissoonAPI.getProjects();
                    }],
                    project: ["ThisissoonAPI", "$route", function (ThisissoonAPI, $route){
                        return ThisissoonAPI.getProjectDetail($route.current.params.slug);
                    }]
                }
            })
            .otherwise({
                redirectTo: "/"
            })

    }
])
