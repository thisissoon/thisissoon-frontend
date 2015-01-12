"use strict";
/**
 * Controller for root view or "/" view of app.
 * @module thisissoon.core
 * @author SOON_
 * @class  HomeCtrl
 */
angular.module("thisissoon.core").controller("HomeCtrl", [
    "$scope",
    "$rootScope",
    "$modal",
    "$sce",
    "$timeout",
    "DataStore",
    "projects",
    /**
     * @constructor
     * @param {Object}  $scope
     * @param {Object}  $rootScope
     * @param {Service} $modal    Angular-bootstrap modal service
     * @param {Service} $sce      Angular sanitize service
     * @param {Service} DataStore Stores data to share between controllers
     * @param {Object}  projects  List of projects from api
     */
    function ($scope, $rootScope, $modal, $sce, $timeout, DataStore, projects) {

        /**
         * List of projects from thisissoon api
         * @property projects
         * @type     {Array}
         */
        $scope.projects = projects.list;

        /**
         * The sticky/featured project
         * @property sticky
         * @type     {Object}
         */
        $scope.sticky = projects.sticky;

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
         * Opens modal window with video player inside
         * @method PlayVideo
         */
        $scope.playVideo = function playVideo(){
            $scope.$broadcast("heroVideo:pause");

            $scope.project = {
                video: $sce.trustAsResourceUrl("//www.youtube.com/embed/oa-E5MRI9d0?autoplay=1&autohide=1")
            }

            var modal = $modal.open({
                templateUrl: "partials/modal-youtube.html",
                scope: $scope
            });

            modal.result.finally(function(){
                $scope.$broadcast("heroVideo:play");
            })
        }

        /**
         * Gets current time to display in hero
         * @method currentTime
         */
        $scope.currentTime = {
            value: new Date(),
            get: function getTime() {
                $timeout(function(){
                    $scope.currentTime.value = new Date();
                    $scope.currentTime.get();
                }, 1000);
            }
        }

        $scope.currentTime.get();

    }

]);
