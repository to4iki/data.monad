'use strict';

/**
 * Promise: 継続モナド
 * - Promise.resolve(value): unit
 * - Promise.prototype.then(onFullfill: value => Promise): bind
 */

var result = Promise.resolve(5).then(v =>
    return Promise.resolve(6).then(v2 =>
        return v + v2;
    )
)

result.then(v => console.log(v););
