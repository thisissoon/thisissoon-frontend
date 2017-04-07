"use strict";
/**
 * Controller for "/projects" view of app. Displays project
 * infomation and tells project story.
 * @module thisissoon.projects.ProjectCtrl
 * @author SOON_
 * @class  ProjectCtrl
 */
angular.module("thisissoon.projects.ProjectCtrl", [
    "ngRoute",
    "ngSanitize",

    "soon.ui.video",

    "thisissoon.api",
    "thisissoon.cache",
    "thisissoon.animation.viewportEnter",
    "thisissoon.home.linkDisplay"
])

.config([
    "$routeProvider",
    function ($routeProvider) {

        $routeProvider
            .when("/projects/:slug", {
                templateUrl: "partials/projects/detail.html",
                controller: "ProjectCtrl",
                resolve: {
                    projects: ["ThisissoonAPI", function (ThisissoonAPI){
                        return ThisissoonAPI.getProjects();
                    }],
                    project: ["ThisissoonAPI", "$route", function (ThisissoonAPI, $route){
                        return ThisissoonAPI.getProjectDetail($route.current.params.slug);
                    }]
                }
            });

    }
])

.controller("ProjectCtrl", [
    "$scope",
    "$rootScope",
    "$filter",
    "$sce",
    "CacheService",
    "project",
    "projects",
    /**
     * @constructor
     * @param   {Object}   $scope       Scope of the controller
     * @param   {Object}   $rootScope   application root scope
     * @param   {Service}  $filter      angular filter service; selects subset of items from array and returns it as a new array.
     * @param   {Service}  $sce         Strict contextual escaping service
     * @param   {Service}  CacheService Stores data to share between controllers
     * @param   {Object}   project      Project detail object from thisissoon API
     * @param   {Object}   projects     List of projects from api
     */
    function ($scope, $rootScope, $filter, $sce, CacheService, project, projects) {

        /**
         * List of projects from thisissoon API
         * @property {Array} projects
         */
        $scope.projects = projects.list;

        /**
         * Project detail object from thisissoon API
         * @property {Object} project
         */
        $scope.project = project;

        /**
         * Project video
         * @property {Object} video
         */
        $scope.video = {
            mp4: $scope.env.SERVER_ADDRESS + project.desktop_mp4,
            mobile: {
                mp4: $scope.env.SERVER_ADDRESS + project.mobile_mp4,
                webm: $scope.env.SERVER_ADDRESS + project.mobile_webm
            },
            poster: project.video_background ? $scope.env.SERVER_ADDRESS + project.video_background.huge : undefined
        };

        /**
         * Assigns section numbers and generates next and previous urls
         * @method init
         */
        $scope.init = function init () {
            CacheService.put("projectView", true);
            CacheService.put("backgroundColor", project.background_colour);
            $scope.setNextPrevious();

            // format link for display
            if ($scope.project.link) {
                $scope.project.linkText = $filter("linkDisplay")($scope.project.link);
            }

            if ($scope.project.title === "Team Sky") {
                $scope.project.webbyCode = $sce.trustAsHtml(
                    "<span id=\"webby-pv-2014-bug\" style=\"position: fixed; z-index: 99999;\
                     top: 0; right: 0; width: 161px; height: 161px; margin: 0; padding: 0;\">\
                     <iframe src=\"https://vote.webbyawards.com/sitebug?entryid=42782&\
                     display_rank=0&data=2017/websites/general-website/sports\" \
                     style=\"position: relative; z-index: 99999; width: 161px; height: 161px;\
                      margin: 0; border: 0 none;\" height=\"161\" width=\"161\" scrolling=\"no\"\
                       frameborder=\"0\" seamless></iframe></span>");
            } else {
                $scope.project.webbyCode = "";
            }
        };

        /**
         * Finds the next and previous projects based on the current project
         * @method setNextPrevious
         */
        $scope.setNextPrevious = function setNextPrevious () {
            var index = 0;

            angular.forEach($scope.projects, function (project, key){
                if ($scope.project.id === project.id) {
                    index = key;

                    if (typeof $scope.projects[key + 1] !== "undefined"){
                        $scope.next = $scope.projects[key + 1].slug;
                    } else {
                        // back to first project
                        $scope.next = $scope.projects[0].slug;
                    }

                    if (typeof $scope.projects[key - 1] !== "undefined"){
                        $scope.previous = $scope.projects[key - 1].slug;
                    } else {
                        // back to last project
                        $scope.previous = $scope.projects[$scope.projects.length - 1].slug;
                    }
                }
            });

            CacheService.put("project", {
                id: $scope.project.id,
                current: index + 1,
                next: $scope.next,
                previous: $scope.previous,
                count: projects.list.length,
                backgroundColor: project.background_colour
            });
        };

        /**
         * Get background color for hero section
         * @property {String} getBackgroundColor
         */
        $scope.getBackgroundColor = function getBackgroundColor () {
            return CacheService.get("backgroundColor");
        };

        /**
         * Trigger video playback
         * @method playVideo
         * @param {String} id  DOM id of video to play
         */
        $scope.playVideo = function playVideo (id) {
            $scope.$emit(id + ":play");
        };

        /**
         * Trigger video stop
         * @method stopVideo
         * @param {String} id  DOM id of video to stop
         */
        $scope.stopVideo = function stopVideo (id) {
            $scope.$emit(id + ":stop");
        };

        $scope.$on("$destroy", function(){
            CacheService.remove("projectView");
            CacheService.remove("backgroundColor");
            CacheService.remove("project");
        });

        $scope.init();

    }

]);
