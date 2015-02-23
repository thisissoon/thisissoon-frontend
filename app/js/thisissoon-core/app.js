"use strict";
/**
 * @module thisissoon.core
 * @author SOON_
 * @requires ngRoute {@link https://docs.angularjs.org/api/ngRoute}
 * @requires sn.skrollr {@link https://github.com/thisissoon/angular-skrollr}
 * @requires soon.ui
 */
angular.module("thisissoon.core", [
    "config",
    "ngRoute",
    "sn.skrollr",
    "soon.ui",
    "thisissoon.cache",
    "thisissoon.api",
    "thisissoon.nav"
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

        ResizeService.add($rootScope.$id, function(event, size) {
            if (size.width >= 1024 && !$rootScope.skrollrInitialised) {
                snSkrollr.init();
                $rootScope.skrollrInitialised = true;
            } else if (size.width < 1024 && $rootScope.skrollrInitialised) {
                $rootScope.skrollrInitialised = false;
                snSkrollr.destroy();
            }
        });

        $rootScope.cache = CacheService;
        $rootScope.env = ENV;

        CacheService.put("navOpen", false);
        CacheService.put("loading", true);
        CacheService.put("projectList", false);

        // close nav menu when changing views
        $rootScope.$on("$routeChangeStart", function() {
            CacheService.put("navOpen", false);
            CacheService.put("loading", true);
            snSkrollr.destroy();
        });

        // close nav menu when changing views
        $rootScope.$on("$routeChangeSuccess", function() {
            CacheService.put("loading", false);
            snSkrollr.init();
            if ($rootScope.skrollrInitialised) {
                $timeout(snSkrollr.refresh, 200);
            }
        });

    }
]);
