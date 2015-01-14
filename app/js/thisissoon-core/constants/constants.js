"use strict";
/**
 * @module thisissoon.core
 * @author SOON_
 * @class  constants
 */
angular.module("thisissoon.core")
    /**
     * @constant
     * @name        SECTIONS
     * @type        {Object}
     * @description Object conatining sections of the project detail
     *              view, their display status and positions
     */
    .constant("SECTIONS", {
        "info": {
            "no": null,
            "data": "title",
            "display": false
        },
        "judges": {
            "no": null,
            "data": "judges_comments",
            "display": false
        },
        "ideas": {
            "no": null,
            "data": "early_ideas",
            "display": false
        },
        "questions": {
            "no": null,
            "data": "answers",
            "display": false
        },
        "stats": {
            "no": null,
            "data": "project_stats",
            "display": false
        },
        "final": {
            "no": null,
            "data": "screenshots",
            "display": false
        }
    })

    .constant("HOME_SECTIONS", [
        {
            "id": "hero",
            "title": "Hello",
            "navStyle": "light"
        },{
            "id": "project",
            "title": "Casestudies",
            "icon": "icon-casestudies",
            "navStyle": "dark"
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
    ])
