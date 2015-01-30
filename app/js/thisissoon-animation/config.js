"use strict";
/**
 * @module thisissoon.animation
 * @author SOON_
 */
angular.module("thisissoon.animation")

    .constant("SOON_LOGO", {
        "full": {
            "#s": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 1 },
                    "options": { duration: 0, delay: 1150 }
                }
            ],
            "#o-1": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 1 },
                    "options": { duration: 0, delay: 1300 }
                }
            ],
            "#o-2": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 1 },
                    "options": { duration: 0, delay: 1450 }
                }
            ],
            "#n": [
                {
                    "properties": { opacity: 0 },
                    "options": { duration: 0 }
                },{
                    "properties": { opacity: 1 },
                    "options": { duration: 0, delay: 1600 }
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
                    "options": { duration: 0, delay: 300, loop: 3 }
                }
            ]
        },
        "blinking": [
            {
                "properties": { opacity: 0 },
                "options": { duration: 0, delay: 300, loop: true }
            }
        ],
        "underscore": [
            {
                "properties": { opacity: 0 },
                "options": { duration: 0, delay: 100, loop: true }
            }
        ]
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

