data.monad
==========

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

1. bind(unit(x), f) ≡ f(x)
2. bind(m, unit) ≡ m
3. bind(bind(m, f), g) ≡ bind(m, x ⇒ bind(f(x), g))

## Usage

### Identity

### Maybe

## Installation

## Author

[to4iki](https://github.com/to4iki)

## Licence

[MIT](http://to4iki.mit-license.org/)

[license-url]: http://to4iki.mit-license.org/
[license-image]: http://img.shields.io/badge/license-MIT-brightgreen.svg
