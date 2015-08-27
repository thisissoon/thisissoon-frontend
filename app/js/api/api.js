"use strict";
/**
 * Module which communicates with thisissoon api to provide
 * data and infomation to display in app
 * @module thisissoon.api
 * @author SOON_
 */
angular.module("thisissoon.api", [
    "config",
    "ngSanitize"
])

.config([
    "$sceDelegateProvider",
    "ENV",
    /**
     * @class config
     * @param {Service} $sceDelegateProvider
     * @param {Object}  ENV
     */
    function ($sceDelegateProvider, ENV) {

        /**
         * Whitelist regex for server address
         * @property {String} serverAddress
         */
        var serverAddress = ENV.SERVER_ADDRESS + "**";

        // add server urls to resource whitelist
        $sceDelegateProvider.resourceUrlWhitelist([ "self", serverAddress ]);
    }
]);
