"use strict";
/**
 * Require additional modules
 */
let qs = require("qs");

/**
 * Base64 loader module
 * @param src
 * @return {*}
 */
module.exports = function loader(src) {
    /**
     * Cache loaded results
     */
    this.cacheable();
    /**
     * If loaded data is not empty
     */
    if (src) {
        /**
         * Get loader params
         * @type {{}}
         */
        let query = {
            type: "plain/text",
        };
        if (this.query) {
            query = qs.parse(this.query.substr(1));
        }
        /**
         * Set loaded content type
         * @type {string}
         */
        query.type = query.type || "plain/text";
        /**
         * Return loaded content as base64 with right mime type
         */
        return ' module.exports = "' + ("data:" + query.type + ";base64," + src.toString('base64')) + '";';
    }
    /**
     * Return empty data
     */
    return 'module.exports = "";';
};
/**
 * Load as raw data
 * @type {boolean}
 */
module.exports.raw = true;
