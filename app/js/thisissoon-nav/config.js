"use strict";
/**
 * @module thisissoon.nav.config
 * @author SOON_
 */
angular.module("thisissoon.nav.config", [])

    /**
     * List of sections in each view
     * @name NAV
     * @type {Object}
     */
    .constant("NAV", [
            {
                "id": "hero",
                "title": "Hello",
                "navStyle": "light"
            },{
                "id": "project",
                "title": "Casestudies",
                "navStyle": "dark",
                "icon": "icon-casestudies"
            },{
                "id": "services",
                "title": "Services",
                "navStyle": "dark"
            },{
                "id": "about",
                "title": "About",
                "navStyle": "dark"
            },{
                "id": "join",
                "title": "Join",
                "navStyle": "light"
            },{
                "id": "contact",
                "title": "Contact",
                "navStyle": "light"
            }
    ]);
