'use strict';

var assert = require('assert');
var Monad = require('../lib/');
var Just = Monad.Just;
var Nothing = Monad.Nothing;

describe('Maybe', function() {

    context('when Just', function() {
        var r = new Just(1)

        it('#isDefined', function() {
            assert(r.isDefined === true);
        });

        it('#isEmpty', function() {
            assert(r.isEmpty === false);
        });

        it('#isEqual', function() {
            assert(r.isEqual(new Just(1)) === true);
            assert(r.isEqual(new Just(2)) !== true);
            assert(r.isEqual(Nothing) !== true);
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

        it('#orElse', function() {
            assert(r.getOrElse(function() { return -1 }), 1);
        });

        it('#map', function() {
            var maped = r.map(function(x) { return x + 1 });
            assert(maped.get, 2);
        });

        it('#bind', function() {
            var binded = r.bind(function(x) {
                return new Just(2).bind(function(x2) {
                    return new Just(x + x2);
                });
            });
            assert(binded.get, 3);
        });

        it('#foreach', function() {
            var called = false
            r.foreach(function(x) {
                called = true;
            });
            assert(called === true);
        });

        it('#filter', function() {
            var actual1 = r.filter(function(x) { return x === 1; });
            assert(actual1.isDefined === true);

            var actual2 = r.filter(function(x) { return x === 2; });
            assert(actual2.isDefined !== true);
        });

        it('#reject', function() {
            var actual1 = r.reject(function(x) { return x === 1; });
            assert(actual1.isDefined !== true);

            var actual2 = r.reject(function(x) { return x === 2; });
            assert(actual2.isDefined === true);
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

        it('#isEqual', function() {
            assert(r.isEqual(Nothing) === true);
            assert(r.isEqual(new Just(1)) !== true);
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

        it('#orElse', function() {
            assert(r.getOrElse(function() { return -1 }), -1);
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
                    return new Just(x + x2);
                });
            });
            assert(binded.isEmpty === true);
        });

        it('#foreach', function() {
            var called = false
            r.foreach(function(x) {
                called = true;
            });
            assert(called !== true);
        });

        it('#filter', function() {
            var actual = r.filter(function(x) { return x === 1; });
            assert(actual.isEmpty === true);
        });

        it('#reject', function() {
            var actual = r.reject(function(x) { return x === 1; });
            assert(actual.isEmpty === true);
        });
    });
});
