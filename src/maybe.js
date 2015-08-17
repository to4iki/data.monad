'use strict';

export class Maybe {
    static Just(x) {
        return new Just(x)
    }

    static Nothing() {
        return Nothing
    }
}

class Just {
    constructor(x) {
        this.x = x
    }

    // -- Show

    toString() {
        return 'Just(' + this.x + ')';
    }

    // -- Extracting

    get() {
        return this.x;
    }

    getOrElse(_) {
        return this.x;
    }

    // -- Functor

    map(transform) {
        return new Just(transform(this.x));
    }

    // -- Chain

    bind(transform) {
        return transform(this.x);
    }
}

class Nothing {

    static get

    static toString() {
        return 'Nothing';
    }

    static map() {
        return this;
    }

    static bind() {
        return this;
    }
}
