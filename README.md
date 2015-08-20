data.monad
==========

[![NPM package][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![License][license-image]][license-url]

## Description
javascript monad structure.

### Type Signature

interface.

```js
interface M<T> {
    // return
    function unit<T>(value: T): M<T> {
    }

    // >>=
    function bind<T, U>(instance: M<T>, transform: (value: T) => M<U>): M<U> {
    }
}
```

1. bind(unit(x), f) == f(x)
2. bind(m, unit) == m
3. bind(bind(m, f), g) == bind(m, x => bind(f(x), g))

## Usage

### Identity

```js
new Identity(5).bind(x =>
    new Identity(6).bind(x2 =>
        new Identity(x + x2)
    )
);
// => Identity(11)
```

### Maybe

```js
new Just(5).bind(x =>
    new Just(6).bind(x2 =>
        new Just(x + x2)
    )
);
// => Just(11)

new Just(5).bind(x =>
    Nothing.bind(x2 =>
        new Just(x + x2)
    )
);
// => Nothing
```

do syntax

```js
doM(function*() {
    let v1 = yield new Just(5);
    let v2 = yield new Just(6);
    return new Just(v1 + v2);
}());
// => Just(11)
```

### Promise

```js
let p1 = doM(function*() {
    let v1 = yield Promise.resolve(5);
    let v2 = yield Promise.resolve(6);
    return v1 + v2;
}());

p1.bind(v => console.log(v * v)); // 121

let p2 = doM(function*() {
    let v1 = yield Promise.resolve(5);
    let v2 = yield Promise.reject(new Error('Failure'));
    return v1 + v2;
}());

p2.bind(v => console.log(v * v)); // empty
p2.catch(e => console.log(e.message)); // 'Failure'
```

## Installation

### npm
Install

```
$ npm i -D data.monad
```

Use

```javascript
var Monad = require('data.monad');
```

## Author

[to4iki](https://github.com/to4iki)

## Licence

[MIT](http://to4iki.mit-license.org/)

[travis-url]: http://travis-ci.org/to4iki/data.monad
[travis-image]: https://travis-ci.org/to4iki/data.monad.svg?branch=master

[npm-url]: https://npmjs.org/package/data.monad
[npm-image]: https://badge.fury.io/js/data.monad.svg

[license-url]: http://to4iki.mit-license.org/
[license-image]: http://img.shields.io/badge/license-MIT-brightgreen.svg
