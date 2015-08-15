'use strict';

class Identity {
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

// exec
var result = new Identity(5).bind(value =>
    new Identity(6).bind(value2 =>
        new Identity(value + value2)
    )
);

console.log(result.toString());
