'use strict';

var assert = require('assert');
var Identity = require('../lib/').Identity;

describe('Identity', function() {

    var r = new Identity(5).bind(function (x) {
        return new Identity(6).bind(function (x2) {
            return new Identity(x + x2);
        });
    });

    it('#bind', function() {
        assert(r.toString, 'Identity(11)')
    });
});
