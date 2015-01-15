/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2014
 *
 * @author Matt Dunn
 *
 */

if (!String.prototype.rtrim) {
    String.prototype.rtrim = function() {
        return this.replace(/\s*$/,"");
    };
}

if (!String.prototype.ltrim) {
    String.prototype.ltrim = function() {
        return this.replace(/^\s*/,"");
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.ltrim().rtrim();
    };
}

if (!String.prototype.capitaliseFirstWord) {
    String.prototype.capitaliseFirstWord = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
    };
}

if (!String.prototype.lowerCamelCase) {
    String.prototype.lowerCamelCase = function() {
        return this.charAt(0).toLowerCase() + this.substring(1);
    };
}

if (!String.prototype.beginsWith) {
    String.prototype.beginsWith = function(s) {
        return (this.substr(0, s.length) === s);
    };
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(s) {
        return (this.substr(this.length - s.length) === s);
    };
}

if (!String.prototype.repeat) {
    String.prototype.repeat = function(num) {
        return new Array(num + 1).join( this );
    };
}

if (!String.prototype.coerce) {
    String.prototype.coerce = function() {
        if (!isNaN(this)) {
            return parseFloat(this);
        } else if (this.toLowerCase() === "true") {
            return true;
        } else if (this.toLowerCase() === "false") {
            return false;
        } else if (this.toLowerCase() === "null") {
            return null;
        } else if (this.toString() === "undefined") {
            return undefined;
        }

        return this.toString();
    };
}

if (!Math.degrees) {
    Math.degrees = function(radians) {
        return radians * 180 / Math.PI;
    };
}

if (!Number.prototype.bytesToSize) {
    Number.prototype.bytesToSize = function(precision) {
        var bytes = parseInt(this, 10),
            kilobyte = 1024,
            megabyte = kilobyte * 1024,
            gigabyte = megabyte * 1024,
            terabyte = gigabyte * 1024,
            petabyte = terabyte * 1024;

        if (isNaN(bytes)) {
            return "";
        }

        if ((bytes >= 0) && (bytes < kilobyte)) {
            return bytes + ' byte' + (bytes !== 1 ? "s" : "");

        } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
            return parseFloat((bytes / kilobyte).toFixed(precision)) + ' KB';

        } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
            return parseFloat((bytes / megabyte).toFixed(precision)) + ' MB';

        } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
            return parseFloat((bytes / gigabyte).toFixed(precision)) + ' GB';

        } else if ((bytes >= terabyte) && (bytes < petabyte)) {
            return parseFloat((bytes / terabyte).toFixed(precision)) + ' TB';

        } else if (bytes >= petabyte) {
            return parseFloat((bytes / petabyte).toFixed(precision)) + ' PB';

        } else {
            return bytes + ' byte' + (bytes !== 1 ? "s" : "");
        }
    };
}
