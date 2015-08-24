"use strict";
/**
 * Returns the shade of a hex value, light or dark
 * @module thisissoon.nav.snHexShade
 * @author SOON_
 * @class  snHexShade
 **/
angular.module("thisissoon.nav.snHexShade", [])

.filter("snHexShade", [
    function() {

        /**
         * Checks hexidecimal color value to determine whether it is light or dark
         * @method hexIsLight
         * @param   {String}  hexcolor hexidecimal color value
         * @param   {Boolean} reverse  light|dark response
         * @returns {Boolean} true if color is light
         */
        var hexIsLight = function hexIsLight (hexcolor, reverse) {
            var r = parseInt(hexcolor.substr(1,2),16);
            var g = parseInt(hexcolor.substr(3,2),16);
            var b = parseInt(hexcolor.substr(5,2),16);
            var yiq = ((r*299)+(g*587)+(b*114))/1000;

            if (reverse) {
                return (yiq >= 128) ? "dark" : "light";
            } else {
                return (yiq >= 128) ? "light" : "dark";
            }
        };

        return hexIsLight;
    }
]);
