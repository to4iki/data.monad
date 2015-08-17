'use strict';

var assert = require('assert');
var Identity = require('../lib/').Identity;

describe('Identity', function() {

    var r = new Identity(5);

    it('#toString', function() {
        assert(r.toString(), 'Identity(1)');
    });

    it('#bind', function() {
        var actual = r.bind(function (x) {
            return new Identity(6).bind(function (x2) {
                return new Identity(x + x2);
            });
        });
        assert(actual.toString, 'Identity(11)')
    });
});
