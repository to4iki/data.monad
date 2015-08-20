'use strict';

/**
 * do syntax.
 */
export function doM(g) {
    let step = x => {
        let res = g.next(x);
        if (res.done) {
            return res.value;
        }
        return res.value.bind(step);
    }
    return step();
}
