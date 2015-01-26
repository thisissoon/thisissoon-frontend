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
    "soon.ui",
    "thisissoon.api",
    "sn.velocity"
])

.run([
    "$rootScope",
    "CacheService",
    /**
     * @constructor
     * @param {Service} $rootScope
     * @param {Service} CacheService
     */
    function ($rootScope, CacheService) {

        $rootScope.cache = CacheService;

        CacheService.put("navOpen", false);
        CacheService.put("loading", true);
        CacheService.put("projectList", false);

        // close nav menu when changing views
        $rootScope.$on("$routeChangeStart", function() {
            CacheService.put("navOpen", false);
            CacheService.put("loading", true);
        });

        // close nav menu when changing views
        $rootScope.$on("$routeChangeSuccess", function() {
            CacheService.put("loading", false);
        });

    }
]);
