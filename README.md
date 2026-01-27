# Satisfactory.dev Benchmark.js Fork

[![Coverage Status](https://coveralls.io/repos/github/satisfactory-dev/benchmark.js/badge.svg?branch=main)](https://coveralls.io/github/satisfactory-dev/benchmark.js?branch=main)
[![Workflow Status](https://github.com/satisfactory-dev/benchmark.js/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/satisfactory-dev/benchmark.js/actions/workflows/nodejs.yml?query=branch%3Amain)

Forked from [benchmark.js](https://github.com/bestiejs/benchmark.js)

## Documentation

* [API Documentation](https://github.com/satisfactory-dev/benchmark.js/tree/main/doc)

In a browser:

```html
<script type="importmap">
{
  "imports": {
    "@satifactory-dev/benchmark": "../path/to/benchmark.js"
  }
}
</script>
<script type="module">
  import Benchmark from '@satifactory-dev/benchmark';
</script>
```

Using npm:

```shell
$ npm i --save @satisfactory-dev/benchmark
```

In Node.js:

```js
import Benchmark from '@satisfactory-dev/benchmark';
```

Optionally, use the [microtime module](https://github.com/wadey/node-microtime) by Wade Simmons:

```shell
npm i --save microtime
```

```js
import Benchmark from '@satisfactory-dev/benchmark';

function microtime() {
  const version = globalThis?.process?.version || '';
  if (
    version.startsWith('v21.') ||
    version.startsWith('v22.') ||
    version.startsWith('v23.')
  ) {
    console.warn('microtime appears to misbehave on node 21-23');

    return;
  }

  try {
    const result = require('microtime');

    console.log('using microtime');

    return result.now;
  } catch {
  }

  console.log('not using microtime');

  return undefined;
}

const maybe_microtime = microtime();

if (maybe_microtime) {
  Benchmark.Timer.changeContext({
    usTimer: maybe_microtime,
  });
}
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

### Bencher Integration

#### logger.js
```ts
import {
  bencherLogger,
  bencherReduction,
  extractStats,
} from '@satisfactory-dev/benchmark/integrations/bencher';

function reducer(was, stats) {
  was[`${stats.suite}::${stats.benchmark}`] = {
    hz: {
      value: stats.hz,
    },
    rme: {
      value: stats.stats.rme,
    },
    sample: {
      value: stats.stats.mean,
      lower_value: stats.sample.sort((a, b) => a - b)[0],
      upper_value: stats.sample.sort((a, b) => b - a)[0],
    },
  }

  return was;
}

async function* formatter(
  cycleFormatter,
  reducer,
  suiteSets,
) {
  for (const suites of suiteSets) {
    const result = await Suite.formatCycles(cycleFormatter, ...suites);
    yield bencherReduction(reducer, ...result);
  }
}

async function logger(suiteSets) {
  return bencherLogger(
    extractStats,
    reducer,
    formatter,
    suiteSets,
    process.stdout,
  )
}

export default logger;
```

#### example_perf.js
```js
import Benchmark from '@satifactory-dev/benchmark';
import logger from 'logger.js';

// suite definitions goes here, pretend we have `const suites = [];`

// if one exports the suites, one can execute the benchmarks in batch
export default suites;

// if one checks to see if the file is called directly, one can execute just these benchmarks
if (process.argv[1] === import.meta.filename) {
  await logger([suites]);
}

```

## Support

<!-- #region Tested In -->
Tested in Tested in Chromium (143.0.7499.4), Firefox (144.0.2), WebKit (26.0), Node (20-25)
<!-- #endregion Tested In -->
