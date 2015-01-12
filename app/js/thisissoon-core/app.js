"use strict";
/**
 * @module thisissoon.core
 * @author SOON_
 * @requires ngRoute {@link https://docs.angularjs.org/api/ngRoute}
 * @requires ngAnimate: {@link https://docs.angularjs.org/api/ngAnimate}
 * @requires ngAnimate: {@link https://docs.angularjs.org/api/ngAnimate}
 * @requires ui-bootstrap: {@link http://angular-ui.github.io/bootstrap}
 * @requires soon.ui
 * @requires soon.utils
 * @requires thisissoon.api
 */
angular.module("thisissoon.core", [
    "ngRoute",
    "ngSanitize",
    "ngAnimate",
    "ui.bootstrap",
    "soon.ui",
    "soon.utils",
    "thisissoon.api"
])

.run([
    "$rootScope",
    "DataStore",
    /**
     * @constructor
     * @param {Service} $rootScope
     * @param {Service} DataStore
     */
    function ($rootScope, DataStore) {

        $rootScope.dataStore = DataStore;

        DataStore.set("navOpen", false);
        DataStore.set("loading", true);

        // close nav menu when changing views
        $rootScope.$on("$routeChangeStart", function() {
            DataStore.set("navOpen", false);
            DataStore.set("loading", true);
        });

        // close nav menu when changing views
        $rootScope.$on("$routeChangeSuccess", function() {
            DataStore.set("loading", false);
        });

    }
]);
