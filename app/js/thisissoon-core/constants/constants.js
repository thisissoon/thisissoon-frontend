"use strict";
/**
 * @module thisissoon.core
 * @author SOON_
 * @class  constants
 */
angular.module("thisissoon.core")

    /**
     * List of sections in each view
     * @name NAV
     * @type {Object}
     */
    .constant("NAV", {
        "home": [
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
        ]
    })

