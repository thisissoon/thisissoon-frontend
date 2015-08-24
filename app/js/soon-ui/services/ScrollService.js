"use strict";
/**
 * Service wrapper for detecting and handling window scroll events. Event
 * handlers can be passed to the service using 'ScrollService.add($scope.$id, eventHandler)'
 * the service will call the event handler every time the browser window is triggers a scroll
 * event with the arguments (event) where event is the scroll event is an object containing
 * the current browsers width and height values. The handlers can be removed by using
 * 'ScrollService.remove($scope.$id, eventHadler)'
 * @author SOON_
 * @module soon.ui.ScrollService
 * @class  ScrollService
 */
angular.module("soon.ui.ScrollService", []).service("ScrollService", [
    "$rootScope",
    "$document",
    "$window",
    /**
     * @constructor
     * @param $rootScope {Object}
     * @param $document  {Object}
     * @param $window    {Object}
     */
    function ($rootScope, $document, $window) {

        var _this = this;

        /**
         * Object of events handlers to trigger on scroll event
         * @private
         * @property handlerObj
         * @type Object
         */
        var handlerObj = {};

        /**
         * The current scroll position of the window as a percentage
         * @private
         * @property scrollPercentage
         * @type integer
         */
        var scrollPercentage;

        /**
         * The current scroll position of the window in pixels
         * @private
         * @property scrollTopPxPosition
         * @type integer
         */
        var scrollTopPxPosition;

        /**
         * Calculate and set the scrollTopPxPosition and scrollPercentage values
         * @private
         * @method setScrollValues
         */
        var setScrollValues = function setScrollValues(){
            var doc = $document[0].documentElement,
                body = $document[0].body,
                scrollTop = (doc && doc.scrollTop  || body && body.scrollTop  || 0),
                adjustedBodyHeight = ( body.offsetHeight - $window.innerHeight ),
                percentage = Math.round( ( scrollTop / adjustedBodyHeight ) * 100 );

            scrollPercentage = percentage;
            scrollTopPxPosition = scrollTop;

            //console.log("scrollPercentage: " + scrollPercentage+"%", "scrollTopPxPosition: " + scrollTopPxPosition+"px");
        }

        /**
         * On a scroll event this function loops through handlerObj
         * and calls all functions stored in handlerObj and passes the
         * scroll event and scroll position object as an argument for
         * all event handler function calls.
         * @private
         * @method onScrollEvent
         */
        var onScrollEvent = function onScrollEvent(){

            setScrollValues();

            var informAllFunction = function informAllFunction (){
                angular.forEach(handlerObj, function (value, key){
                    var event = {};
                    value.apply(this, [event, {
                        px: scrollTopPxPosition,
                        percent: scrollPercentage
                    }]);
                });
            }

            if (!$rootScope.$$phase) {
                $rootScope.$apply(function () {
                   informAllFunction();
                });
            } else {
               informAllFunction();
            }
        }


        /**
         * Adds an event handler to the ScrollService to be called on a window
         * scroll event. Store the handler as a key, value pair in handlerObj
         * @method add
         * @param id {String}   the unique ID to associate with the function
         * @param fn {Function} the function to call on a scroll event
         */
        this.add = function add(id, fn){
            handlerObj[id] = fn;
            onScrollEvent();
        }

        /**
         * Remove event handler from ScrollService
         * @method remove
         * @param id {String}
         */
        this.remove = function remove(id){
            if (handlerObj[id]){
                delete handlerObj[id];
            }
        }

        angular.element($window).on("scroll", onScrollEvent);

}]);
