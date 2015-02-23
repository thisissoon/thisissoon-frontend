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
    "config",
    "ngRoute",
    "ngSanitize",
    "soon.ui",
    "thisissoon.api",
    "thisissoon.nav",
    "thisissoon.cache",
    "thisissoon.animation",
    "sn.velocity",
    "sn.skrollr",
    "sn.addthis",
    "duScroll"
])

.run([
    "$rootScope",
    "ResizeService",
    "$window",
    "$timeout",
    "CacheService",
    "snSkrollr",
    "ENV",
    /**
     * @constructor
     * @param {Service} $rootScope
     * @param {Service} CacheService
     */
    function ($rootScope, ResizeService, $window, $timeout, CacheService, snSkrollr, ENV) {

        var skrollrBreakpoint = 1024;

        ResizeService.add($rootScope.$id, function(event, size) {
            if (size.width >= skrollrBreakpoint && !$rootScope.skrollrInitialised) {
                snSkrollr.init();
                $rootScope.skrollrInitialised = true;
            } else if (size.width < skrollrBreakpoint && $rootScope.skrollrInitialised) {
                $rootScope.skrollrInitialised = false;
                snSkrollr.destroy();
            }
        });

        $rootScope.cache = CacheService;
        $rootScope.env = ENV;

        CacheService.put("navOpen", false);
        CacheService.put("loading", true);
        CacheService.put("projectList", false);

        // close nav menu and destroy skrollr when changing views
        $rootScope.$on("$routeChangeStart", function() {
            CacheService.put("navOpen", false);
            CacheService.put("loading", true);

            if ($rootScope.skrollrInitialised) {
                snSkrollr.destroy();
            }
        });

        // close nav menu and re-initialise skrollr when changing views
        $rootScope.$on("$routeChangeSuccess", function() {
            CacheService.put("loading", false);

            if ($window.innerWidth >= skrollrBreakpoint && !$rootScope.skrollrInitialised) {
                snSkrollr.init();
                $rootScope.skrollrInitialised = true;
            }

            if ($rootScope.skrollrInitialised) {
                $timeout(snSkrollr.refresh, 200);
            }
        });

    }
]);
