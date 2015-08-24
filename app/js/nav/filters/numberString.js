"use strict";
/**
 * Returns a string representation of a number between 1 and 10
 * @module thisissoon.nav.snNumberString
 * @author SOON_
 * @class  snNumberString
 **/
angular.module("thisissoon.nav.snNumberString", [])

.filter("snNumberString", [
    function() {
        return function (input) {
            switch(input) {
                case 1:
                    return "one";
                case 2:
                    return "two";
                case 3:
                    return "three";
                case 4:
                    return "four";
                case 5:
                    return "five";
                case 6:
                    return "six";
                case 7:
                    return "seven";
                case 8:
                    return "eight";
                case 9:
                    return "nine";
                case 10:
                    return "ten";
            }
        };
    }
]);
