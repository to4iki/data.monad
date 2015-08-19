'use strict';

var assert = require('assert');
var doM = require('../lib/').doM;
var Just = require('../lib/').Just;
var Nothing = require('../lib/').Nothing;
var Future = require('../lib/').Future;

describe('Prelude', function() {

    describe('#doM', function() {

        describe('maybe', function() {

            it('should be bind', function() {
                var r = doM(function*() {
                    var v1 = yield new Just(5);
                    var v2 = yield new Just(6);
                    return new Just(v1 + v2);
                }());

                assert(r.isDefined === true);
                assert(r.isEqual(new Just(11)) === true);
            });

            it('should be not bind', function() {
                var r = doM(function*() {
                    var v1 = yield new Just(5);
                    var v2 = yield Nothing;
                    return new Just(v1 + v2);
                }());

                assert(r.isDefined !== true);
                assert(r.isEqual(Nothing) === true);
            });
        });

        describe('future', function() {

            function failTest() {
                throw new Error("Expected promise to be rejected but it was fulfilled");
            }

            it('should be bind', function() {
                var r = doM(function*() {
                    var v1 = yield Future.resolve(5);
                    var v2 = yield Future.resolve(6);
                    return v1 + v2;
                }());

                return r.bind(function(v) {
                    assert(v === 11);
                });
            });

            it('should be not bind', function() {
                var r = doM(function*() {
                    var v1 = yield Future.resolve(5);
                    var v2 = yield Future.reject(new Error('Failure'));
                    return v1 + v2;
                }());

                return r.bind(failTest, function(e) {
                    assert(e.message === 'Failure');
                });
            });
        });
    });
});
