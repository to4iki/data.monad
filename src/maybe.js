'use strict';

class Just {
    constructor(x) {
        this.x = x
    }

    // -- Show

    toString() {
        return 'Just(' + this.x + ')';
    }

    // -- Chain

    bind(transform) {
        return transform(this.x);
    }
}

var Nothing = {
    toString: function() {
        return 'Nothing';
    },
    bind: function() {
        return this;
    }
}

// exec

var result = new Just(5).bind(value =>
    Nothing.bind(value2 =>
        new Just(value + value2)
    )
);

console.log(result.toString());
