'use strict';

export function doM (g) {
    function step(x) {
        let res = g.next(x);
        if (res.done) {
            return res.value;
        }
        return res.value.bind(step);
    }
    return step();
}
