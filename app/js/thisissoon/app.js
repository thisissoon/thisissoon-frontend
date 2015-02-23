"use strict";
/**
 * @module thisissoon
 * @author SOON_
 * @requires sn.velocity {@link https://github.com/thisissoon/angular-velocity}
 * @requires sn.addthis {@link https://github.com/thisissoon/angular-skrollr}
 * @requires sn.addthis {@link https://github.com/thisissoon/angular-addthis}
 * @requires duScroll {@link https://github.com/oblador/angular-scroll}
 * @requires angulartics {@link https://github.com/luisfarzati/angulartics}
 * @requires angulartics.google.analytics {@link https://github.com/luisfarzati/angulartics}
 * @requires thisissoon.core
 * @requires thisissoon.api
 * @requires thisissoon.nav
 * @requires thisissoon.cache
 * @requires thisissoon.animation
 */
angular.module("thisissoon", [
    "ngRoute",
    "sn.velocity",
    "sn.skrollr",
    "sn.addthis",
    "duScroll",
    "angulartics",
    "angulartics.google.analytics",
    "thisissoon.core",
    "thisissoon.api",
    "thisissoon.nav",
    "thisissoon.cache",
    "thisissoon.animation"
]);
