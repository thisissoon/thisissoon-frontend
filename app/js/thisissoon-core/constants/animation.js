"use strict";
/**
 * @module thisissoon.core
 * @author SOON_
 * @class  animation
 */
angular.module("thisissoon.core")

    .constant("SOON_LOGO", {
        "full": {
            "path,polygon,rect": [{
                "properties": { fill: "#FFFFFF" },
                "options": { duration: 0 }
            }],
            "#s": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 1 },
                    "options": { duration: 0, delay: 1300 }
                }
            ],
            "#o-1": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 1 },
                    "options": { duration: 0, delay: 1450 }
                }
            ],
            "#o-2": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 1 },
                    "options": { duration: 0, delay: 1600 }
                }
            ],
            "#n": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 1 },
                    "options": { duration: 0, delay: 1750 }
                }
            ],
            "#underscore": [
                {
                    "properties": { opacity: 1, x: "0" },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 0 },
                    "options": { duration: 0, delay: 100, loop: 5 }
                },{
                    "properties": { x: "+=100" },
                    "options": { duration: 0, delay: 150 }
                },{
                    "properties": { x: "+=100" },
                    "options": { duration: 0, delay: 150 }
                },{
                    "properties": { x: "+=100" },
                    "options": { duration: 0, delay: 150 }
                },{
                    "properties": { x: "+=100" },
                    "options": { duration: 0, delay: 150 }
                },{
                    "properties": { opacity: 0 },
                    "options": { duration: 0, delay: 300, loop: 2 }
                }
            ]
        },
        "blinking": {
            "path,polygon,rect": [{
                "properties": { fill: "#FFFFFF" },
                "options": { duration: 0 }
            }],
            "#underscore": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0, delay: 300, loop: true }
                }
            ]
        },
        "underscore": {
            "#underscore": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0, delay: 100, loop: true }
                }
            ]
        }
    })

    .constant("ICONS", {
        "burger": {
            "#burger-top": [
                {
                    "properties": { transformOrigin: "0%", rotateZ: "45deg", translateY: "-16px" },
                    "options": { duration: 150 }
                }
            ],
            "#burger-bottom": [
                {
                    "properties": { transformOrigin: "0%", rotateZ: "-45deg", translateY: "16px" },
                    "options": { duration: 150 }
                }
            ],
            "#burger-middle": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 50 }
                }
            ]
        }
    })

