'use strict';

/**
 * Maybe[A] <: Eq, Show, Functor[A], Chain[A]
 */
export class Maybe {

    static Just(x) {
        return new Just(x)
    }

    static get Nothing() {
        return Nothing
    }
}

export class Just {
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

    // -- Eq

    isEqual(a) {
        return a.isDefined && (a.get === this.x)
    }

    // -- Show

    toString() {
        return `Just($(this.x))`;
    }

    // -- Extracting

    get get() {
        return this.x;
    }

    getOrElse(_) {
        return this.x;
    }

    orElse(_) {
        return this;
    }

    // -- Functor

    map(transform) {
        return new Just(transform(this.x));
    }

    // -- Chain

    bind(transform) {
        return transform(this.x);
    }

    // -- Other

    foreach(f) {
        f(this.x);
    }

    filter(p) {
        return (p(this.x)) ? this : Nothing;
    }

    reject(p) {
        return this.filter(function(x) { return !p(x) });
    }
}

export class Nothing {

    // -- Predicates

    static get isDefined() {
        return false;
    }

    static get isEmpty() {
        return true;
    }

    // -- Eq

    static isEqual(a) {
        return a.isEmpty && this.isEmpty;
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

    static orElse(or) {
        return or();
    }

    // -- Functor

    static map() {
        return this;
    }

    // -- Chain

    static bind() {
        return this;
    }

    // -- Other

    static foreach() {
        return;
    }

    static filter(p) {
        return this;
    }

    static reject(p) {
        return this;
    }
}
