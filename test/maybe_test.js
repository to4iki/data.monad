'use strict';

var assert = require('assert');
var Maybe = require('../lib/').Maybe;
var Just = Maybe.Just;
var Nothing = Maybe.Nothing;

describe('Maybe', function() {

    context('when Just', function() {
        var r = Just(1)

        it('#isDefined', function() {
            assert(r.isDefined === true);
        });

        it('#isEmpty', function() {
            assert(r.isEmpty === false);
        });

        it('#toString', function() {
            assert(r.toString(), 'Just(1)');
        });

        it('#get', function() {
            assert(r.get, 1);
        });

        it('#getOrElse', function() {
            assert(r.getOrElse(-1), 1);
        });

        it('#map', function() {
            var maped = r.map(function(x) { return x + 1 });
            assert(maped.get, 2);
        });

        it('#bind', function() {
            var binded = r.bind(function(x) {
                return Just(2).bind(function(x2) {
                    return Just(x + x2);
                });
            });
            assert(binded.get, 3);
        });
    });

    context('when Nothing', function() {
        var r = Nothing

        it('#isDefined', function() {
            assert(r.isDefined === false);
        });

        it('#isEmpty', function() {
            assert(r.isEmpty === true);
        });

        it('#toString', function() {
            assert(r.toString(), 'Nothing');
        });

        it('#get', function() {
            assert.throws(function() { r.get(); });
        });

        it('#getOrElse', function() {
            assert(r.getOrElse(-1), -1);
        });

        it('#map', function() {
            var called = false
            var maped = r.map(function(x) {
                called = true;
                return x + 1;
            });
            assert(called !== true);
            assert(maped.isEmpty === true);
        });

        it('#bind', function() {
            var binded = r.bind(function(x) {
                return Nothing.bind(function(x2) {
                    return Just(x + x2);
                });
            });
            assert(binded.isEmpty === true);
        });
    });
});
