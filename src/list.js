'use strict';

function* unit(x) {
    yield x;
}

function* bind(list, transform) {
    for (var x of list) {
        yield* transform(x);
    }
}

// exec

var result = bind([0, 1, 2], function (element) {
    return bind([0, 1, 2], function* (element2) {
        yield element + element2;
    });
});

for (var item of result) {
    console.log(item);
}
