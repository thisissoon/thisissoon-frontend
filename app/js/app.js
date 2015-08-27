"use strict";
/**
 * @module thisissoon
 * @author SOON_
 * @requires angulartics {@link https://github.com/luisfarzati/angulartics}
 * @requires angulartics.google.analytics {@link https://github.com/luisfarzati/angulartics}
 * @requires sn.skrollr {@link https://github.com/thisissoon/angular-skrollr}
 * @requires config
 * @requires thisissoon.header
 * @requires thisissoon.cache
 * @requires thisissoon.home
 * @requires thisissoon.projects
 */
angular.module("thisissoon", [
    "angulartics",
    "angulartics.google.analytics",
    "sn.skrollr",
    "soon.ui.ResizeService",

    "config",
    "thisissoon.header",
    "thisissoon.cache",
    "thisissoon.home",
    "thisissoon.projects"
])

.config([
    "$routeProvider",
    "$httpProvider",
    "$locationProvider",
    "snSkrollrProvider",
    /**
     * @constructor
     * @param {Service} $routeProvider
     * @param {Service} $httpProvider
     * @param {Object}  $locationProvider
     * @param {Object}  snSkrollrProvider
     */
    function ($routeProvider, $httpProvider, $locationProvider, snSkrollrProvider) {

        snSkrollrProvider.config = {
            forceHeight: false,
            smoothScrolling: true,
            mobileDeceleration: 0.004
        };

        $httpProvider.defaults.cache = false;

        $locationProvider.html5Mode(true).hashPrefix("!");

        $routeProvider
            .otherwise({
                redirectTo: "/"
            });

    }
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
     * @param {Service} $rootScope    Application root data
     * @param {Service} ResizeService Service to handle window resize events
     * @param {Object}  $window       Angular wrapper for window
     * @param {Service} $timeout      Angular wrapper for setTimeout
     * @param {Service} CacheService  Cache factory
     * @param {Object}  snSkrollr     Wrapper for skrollr library
     * @param {Object}  ENV           Environment configuration
     */
    function ($rootScope, ResizeService, $window, $timeout, CacheService, snSkrollr, ENV) {

        var desktopMin = 1024,
            tabletMin = 768;

        ResizeService.add($rootScope.$id, function(event, size) {
            if (size.width >= desktopMin && !$rootScope.skrollrInitialised) {
                // Desktop
                snSkrollr.init();
                $rootScope.skrollrInitialised = true;
            } else if (size.width < desktopMin && $rootScope.skrollrInitialised) {
                // Disable skrollr on tablet and smaller sizes
                $rootScope.skrollrInitialised = false;
                snSkrollr.destroy();
            }
        });

        ResizeService.add($rootScope.$id, function(event, size) {
            if (size.width >= tabletMin) {
                $rootScope.isMobile = false;
            } else if (size.width < tabletMin) {
                $rootScope.isMobile = true;
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

            if ($window.innerWidth >= desktopMin && !$rootScope.skrollrInitialised) {
                snSkrollr.init();
                $rootScope.skrollrInitialised = true;
            }

            if ($rootScope.skrollrInitialised) {
                $timeout(snSkrollr.refresh, 200);
            }
        });

    }
]);
