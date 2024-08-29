"use strict";
// --------------------------extention function----------------------------------
String.prototype.toProperCase = function () {
    return this.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};
String.prototype.bool = function () {
    return this.toLowerCase() == 'true';
};
String.prototype.endsWith = function (pattern) {
    //return this.match(pattern+'$') == null ? true : false;
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
};
String.prototype.isNullOrEmpty = function () {
    return (!this || this == undefined || this.length === 0);
};
String.prototype.EncodeHtml = function () {
    return this
        // .replace(/\\/g, "\\\\")
        // //.replace(/{/g, '\\{')
        // //.replace(/}/g, '\\}')
        // //.replace(/:/g, '\\:')
        // .replace(/"/g, '\\"')
        // .replace(/'/g, "\\'")
        // .replace(/\//g, "\\/")
        // .replace(/\f/g, "\\f")
        // //.replace(/\b/g, "\\b")
        // .replace(/\t/g, "\\t")
        // .replace(/\r/g, "\\r")
        // .replace(/\n/g, "\\n")
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/:/g, '&colon;')
        .replace(/{{/g, '{ { ')
        .replace(/}}/g, ' } }')
        .replace(/\[\[/g, '[ [ ')
        .replace(/\]\]/g, ' ] ]');
};
String.prototype._htmlDecode = function (html) {
    // return $('<div/>').html(html).text();
    return html
        //.replace(/\\&/g, "&")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&colon;/g, ':')
        .replace(/{ { /g, '{{')
        .replace(/ } }/g, '}}')
        .replace(/\[ \[ /g, '[[')
        .replace(/ \] \]/g, ']]');
};
