'use strict';

export class Maybe {

    static Just(x) {
        return new Just(x)
    }

    static get Nothing() {
        return Nothing
    }
}

class Just {
    constructor(x) {
        this.x = x
    }

    // -- Predicates

    get isDefined() {
        return true;
    }

    get isEmpty() {
        return false;
    }

    // -- Show

    toString() {
        return 'Just(' + this.x + ')';
    }

    // -- Extracting

    get get() {
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

    // -- Predicates

    static get isDefined() {
        return false;
    }

    static get isEmpty() {
        return true;
    }

    // -- Show

    static toString() {
        return 'Nothing';
    }

    // -- Extracting

    static get get() {
        throw new TypeError("Can't extract the value of a Nothing.");
    }

    static getOrElse(or) {
        return or;
    }

    // -- Functor

    static map() {
        return this;
    }

    // -- Chain

    static bind() {
        return this;
    }
}
