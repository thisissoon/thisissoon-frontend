"use strict";
/**
 * AddThis widget directive, Re-renders addthis buttons as we change views in our app since they only
 * load by default on page load and not when the DOM is updated. based on:
 * {@link http://stackoverflow.com/questions/15593039/angularjs-and-addthis-social-plugin}
 * @example
 *  Usage:
 *   <!-- 1. include `addthis_widget.js` in index page with async=1 parameter -->
 *   <script src="//s7.addthis.com/js/300/addthis_widget.js#pubid={pubid}&domready=1" async="async"></script>
 *
 *   <!-- 2. add "soon-addthis-toolbox" directive to a widget's toolbox div
 *   <div class="addthis_custom_sharing" soon-addthis-toolbox>
 *     ...       ^
 *   </div>
 * @author SOON_
 * @module soon.utils
 * @class  addthisToolbox
 */
angular.module("soon.utils").directive("soonAddthisToolbox", [
    "$document",
    /**
     * @constructor
     * @param {Service} $document
     */
    function ($document) {
        return {
            restrict: "A",
            scope: {
                url: "@",
                title: "@",
                description: "@",
            },
            templateUrl: "partials/addthis.html",
            link: function ($scope, $element, attrs) {
                /**
                 * {@link http://support.addthis.com/customer/portal/articles/1337994-the-addthis_config-variable}
                 * @property addthis_config
                 * @type     {Object}
                 */
                var addthis_config = addthis_config || {};

                /**
                 * {@link http://support.addthis.com/customer/portal/articles/1337996-the-addthis_share-variable}
                 * @property addthis_share
                 * @type     {Object}
                 */
                var addthis_share = {
                    url: $scope.url,
                    title : $scope.title,
                    description : $scope.description
                }

                /**
                 * Initialise the addthis buttons on directive load
                 * @method init
                 */
                var init = function init(){

                    addthis.init();

                    addthis.toolbox($element[0], addthis_config, addthis_share);
                }

                init();

            }
        }
    }
]);

