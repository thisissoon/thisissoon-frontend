"use strict";
/**
 * @module thisissoon.core
 * @author SOON_
 * @requires ngRoute {@link https://docs.angularjs.org/api/ngRoute}
 * @requires ngAnimate: {@link https://docs.angularjs.org/api/ngAnimate}
 * @requires ui-bootstrap: {@link http://angular-ui.github.io/bootstrap}
 * @requires soon.ui
 * @requires soon.utils
 * @requires thisissoon.api
 * @requires sn.velocity
 * @requires duScroll
 */
angular.module("thisissoon.core", [
    "ngRoute",
    "ngSanitize",
    "soon.ui",
    "thisissoon.api",
    "thisissoon.nav",
    "thisissoon.cache",
    "thisissoon.animation",
    "sn.velocity",
    "duScroll"
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
