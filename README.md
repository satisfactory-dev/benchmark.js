# Satisfactory.dev Benchmark.js Fork

[![Coverage Status](https://coveralls.io/repos/github/satisfactory-dev/benchmark.js/badge.svg?branch=main)](https://coveralls.io/github/satisfactory-dev/benchmark.js?branch=main)
[![Workflow Status](https://github.com/satisfactory-dev/benchmark.js/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/satisfactory-dev/benchmark.js/actions/workflows/nodejs.yml?query=branch%3Amain)

Forked from [benchmark.js](https://github.com/bestiejs/benchmark.js)

## Documentation

* [API Documentation](https://benchmarkjs.com/docs)

## Installation

Benchmark.js’ only hard dependency is [lodash](https://lodash.com/).
Include [platform.js](https://mths.be/platform) to populate [Benchmark.platform](https://benchmarkjs.com/docs#platform).

In a browser:

```html
<script src="lodash.js"></script>
<script src="platform.js"></script>
<script src="benchmark.js"></script>
```

In an AMD loader:

```js
require({
  'paths': {
    'benchmark': 'path/to/benchmark',
    'lodash': 'path/to/lodash',
    'platform': 'path/to/platform'
  }
},
['benchmark'], function(Benchmark) {/*…*/});
```

Using npm:

```shell
$ npm i --save benchmark
```

In Node.js:

```js
var Benchmark = require('benchmark');
```

Optionally, use the [microtime module](https://github.com/wadey/node-microtime) by Wade Simmons:

```shell
npm i --save microtime
```

Usage example:

```js
var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf
```

## Support

<!-- #region Tested In -->
Tested in Tested in Chromium (143.0.7499.4), Firefox (144.0.2), WebKit (26.0), Node (20-25)
<!-- #endregion Tested In -->
