"use strict";
/**
 * Service wrapper for detecting and handling window resize events. Event
 * handles can be passed to Service using 'ResizeService.add($scope.$id, eventHadler)'
 * the service will call the event handler every time the browser window is resized.
 * with the arguments (event, windowSize) where event is the resize event and windowSize
 * is an object containing the current browsers width and height values. The handlers
 * can be removed by using 'ResizeService.remove($scope.$id, eventHadler)'
 * @author SOON_
 * @module soon.ui.ResizeService
 * @class  ResizeService
 */
angular.module("soon.ui.ResizeService", []).service("ResizeService", [
    "$rootScope",
    "$window",
    /**
     * @constructor
     * @param $rootScope {Object}  root scope that all other scope are descendant scopes of
     * @param $window    {Service} A reference to the browser's window object
     */
    function ($rootScope, $window) {

        /**
         * Object containing references to event handlers
         * to be called on window resize event.
         * @private
         * @property handlerObj
         * @type     {Array}
         */
        var handlerObj = {};

        /**
         * Stores the current height and width of browser window.
         * @private
         * @property size
         * @type     {Object}
         * @example
         * {
         *     height: 1920px,
         *     width: 1080px
         * }
         */
        var size = {};

        /**
         * Gets the current height and width of the browser window
         * and saves the values in size Object.
         * @private
         * @function getWindowSize
         * @return   {Object} The current height and width of browser window
         */
        var getWindowSize = function getWindowSize(){
            size.height =  $window.innerHeight;
            size.width =  $window.innerWidth;

            return size;
        }

        /**
         * On a resize event this function loops through handlerObj
         * and calls all functions stored in handlerObj and passes the
         * resize event and window size objects as arguments for all
         * function calls.
         * @private
         * @function informAllFunctions
         * @param    {Event} event Window resize event Object
         */
        var informAllFunctions = function informAllFunctions (event){
            angular.forEach(handlerObj, function (value){
                value.apply(this, [event, size]);
            });
        }

        /**
         * On resize event gets the current windows height and width values then
         * loops through all keys in handlerObj and call their values passing the
         * resize event and window size objects as arguments for all function calls.
         * @private
         * @function onResize
         * @param    {Event} event Window resize event Object
         *
         */
        var onResize = function onResize(event){
            getWindowSize();

            if (!$rootScope.$$phase) {
                $rootScope.$apply(function () {
                   informAllFunctions(event);
                });
            } else {
               informAllFunctions(event);
            }
        }

        /**
         * @public
         * @function height
         * @return   {Integer} The height of the window as an integer
         */
        this.height = function height(){
            return size.height;
        }

        /**
         * @public
         * @function width
         * @return   {Integer} The width of the window as an integer
         */
        this.width = function width(){
            return size.width;
        }

        /**
         * Adds an event handler to the ResizeService to be called on a window
         * resize event. Store the handler as a key, value pair in handlerObj
         * @public
         * @function add
         * @param    id {String} the unique id to associate with the function
         * @param    fn {Function} the function to call on a resize event
         */
        this.add = function add(id, fn){
            handlerObj[id] = fn;
            onResize();
        }

        /**
         * Remove event handler from ResizeService
         * @public
         * @method remove
         * @param  id {String} the id of the event handler
         */
        this.remove = function remove(id){
            if (handlerObj[id]){
                delete handlerObj[id];
            }
        }

        angular.element($window).on("resize", onResize);
}]);
