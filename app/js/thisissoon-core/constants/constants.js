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

    .constant("SOON_LOGO", {
        "full": {
            "path,polygon,rect": [{
                "props": { fill: "#FFFFFF" },
                "options": { duration: 0 }
            }],
            "#s": [
                {
                    "props": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "props": { opacity: 1 },
                    "options": { duration: 0, delay: 1300 }
                }
            ],
            "#o-1": [
                {
                    "props": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "props": { opacity: 1 },
                    "options": { duration: 0, delay: 1450 }
                }
            ],
            "#o-2": [
                {
                    "props": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "props": { opacity: 1 },
                    "options": { duration: 0, delay: 1600 }
                }
            ],
            "#n": [
                {
                    "props": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "props": { opacity: 1 },
                    "options": { duration: 0, delay: 1750 }
                }
            ],
            "#underscore": [
                {
                    "props": { opacity: 1, x: "0" },
                    "options": { duration: 0 }
                },{
                    "props": { opacity: 0 },
                    "options": { duration: 0, delay: 100, loop: 4 }
                },{
                    "props": { x: "+=100" },
                    "options": { duration: 0, delay: 150 }
                },{
                    "props": { x: "+=100" },
                    "options": { duration: 0, delay: 150 }
                },{
                    "props": { x: "+=100" },
                    "options": { duration: 0, delay: 150 }
                },{
                    "props": { x: "+=100" },
                    "options": { duration: 0, delay: 150 }
                },{
                    "props": { opacity: 0 },
                    "options": { duration: 0, delay: 300, loop: 2 }
                }
            ]
        },
        "blinking": {
            "path,polygon,rect": [{
                "props": { fill: "#FFFFFF" },
                "options": { duration: 0 }
            }],
            "#underscore": [
                {
                    "props": { opacity: 0 },
                    "options": { duration: 0, delay: 300, loop: true }
                }
            ]
        },
        "underscore": {
            "#underscore": [
                {
                    "props": { opacity: 0 },
                    "options": { duration: 0, delay: 100, loop: true }
                }
            ]
        }
    })

    .constant("ICONS", {
        "burger": {
            "#burger-top": [
                {
                    "props": { transformOrigin: "0%", rotateZ: "45deg", translateY: "-16px" },
                    "options": { duration: 150 }
                }
            ],
            "#burger-bottom": [
                {
                    "props": { transformOrigin: "0%", rotateZ: "-45deg", translateY: "16px" },
                    "options": { duration: 150 }
                }
            ],
            "#burger-middle": [
                {
                    "props": { opacity: 0 },
                    "options": { duration: 50 }
                }
            ]
        }
    })

