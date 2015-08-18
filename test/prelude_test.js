'use strict';

var assert = require('assert');
var doM = require('../lib/').doM;
var Just = require('../lib/').Just;
var Nothing = require('../lib/').Nothing;

describe('Prelude', function() {

    describe('#doM', function() {

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
});
