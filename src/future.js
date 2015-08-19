'use strict';

/**
 * type synonym.
 * type Future = Promise
 */
export default Promise

Promise.prototype.bind = Promise.prototype.then;
