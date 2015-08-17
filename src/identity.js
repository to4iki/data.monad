'use strict';

export class Identity {
    constructor(x) {
        this.x = x;
    }

    // -- Show

    toString() {
        return 'Identity(' + this.x + ')';
    }

    // -- Chain

    bind(transform) {
        return transform(this.x);
    }
}
