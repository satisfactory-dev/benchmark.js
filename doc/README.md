# @satisfactory-dev/benchmark <span>55776a9bf0ba5a90cd029dc39f53ce4c771db581</span>

<!-- div class="toc-container" -->

<!-- div -->

## `Methods`
* <a href="#-destroyelementelement">`#destroyElement`</a>
* <a href="#benchmarkprototypeconstructorclone-timer">`Benchmark.prototype.constructor`</a>
* <a href="#benchmarkprototypeconstructortype">`Benchmark.prototype.constructor`</a>
* <a href="#benchmarkprototypeconstructorname-options">`Benchmark.prototype.constructor`</a>
* <a href="#abort">`abort`</a>
* <a href="#abort">`abort`</a>
* <a href="#addname-fn-options">`add`</a>
* <a href="#callbackbench">`callback`</a>
* <a href="#cloneoptions">`clone`</a>
* <a href="#cloneoptions">`clone`</a>
* <a href="#compareother">`compare`</a>
* <a href="#constructordoc">`constructor`</a>
* <a href="#constructorns-res-unit">`constructor`</a>
* <a href="#constructormaybename-fn-options">`constructor`</a>
* <a href="#createcompiledbench-decompilable-deferred-body-timer">`createCompiled`</a>
* <a href="#emitevent-args">`emit`</a>
* <a href="#filtercallback">`filter`</a>
* <a href="#getnextevent">`getNext`</a>
* <a href="#getresultregex-str">`getResult`</a>
* <a href="#getscorexa-sampleb">`getScore`</a>
* <a href="#getusamplea-sampleb">`getU`</a>
* <a href="#getzu">`getZ`</a>
* <a href="#hasmaybe-prop">`has`</a>
* <a href="#has_divisormaybe">`has_divisor`</a>
* <a href="#indexofbench">`indexOf`</a>
* <a href="#interpolatestring">`interpolate`</a>
* <a href="#listenerstype">`listeners`</a>
* <a href="#offtype-listener">`off`</a>
* <a href="#ontype-listener">`on`</a>
* <a href="#reset">`reset`</a>
* <a href="#reset">`reset`</a>
* <a href="#reverse">`reverse`</a>
* <a href="#runoptions">`run`</a>
* <a href="#runoptions">`run`</a>
* <a href="#runscriptcode">`runScript`</a>
* <a href="#setoptionsoptions">`setOptions`</a>
* <a href="#shift">`shift`</a>
* <a href="#static-getresunitunit-ns">`static #getRes`</a>
* <a href="#staticdefaultvalues">`static defaultValues`</a>
* <a href="#staticfilterarrayarray-callback">`static filter`</a>
* <a href="#staticinvokebenchesbenches-maybename-args">`static invoke`</a>
* <a href="#staticjoinobjectobject-separator1-separator2">`static join`</a>
* <a href="#tagged_-string">`tagged`</a>
* <a href="#tostring">`toString`</a>
* <a href="#updateevent">`update`</a>

<!-- /div -->

<!-- div -->

## `Properties`
* <a href="#-start">`#start`</a>
* <a href="#-stop">`#stop`</a>
* <a href="#aborted">`aborted`</a>
* <a href="#aborted">`aborted`</a>
* <a href="#aborted">`aborted`</a>
* <a href="#args">`args`</a>
* <a href="#async">`async`</a>
* <a href="#async">`async`</a>
* <a href="#bench">`bench`</a>
* <a href="#calledby">`calledBy`</a>
* <a href="#cancelled">`cancelled`</a>
* <a href="#changes">`changes`</a>
* <a href="#clocked">`clocked`</a>
* <a href="#compiled">`compiled`</a>
* <a href="#count">`count`</a>
* <a href="#currenttarget">`currentTarget`</a>
* <a href="#cycle">`cycle`</a>
* <a href="#cycles">`cycles`</a>
* <a href="#cycles">`cycles`</a>
* <a href="#defer">`defer`</a>
* <a href="#defer">`defer`</a>
* <a href="#delay">`delay`</a>
* <a href="#delay">`delay`</a>
* <a href="#deviation">`deviation`</a>
* <a href="#elapsed">`elapsed`</a>
* <a href="#elapsed">`elapsed`</a>
* <a href="#error">`error`</a>
* <a href="#event">`event`</a>
* <a href="#events">`events`</a>
* <a href="#fn">`fn`</a>
* <a href="#hz">`hz`</a>
* <a href="#id">`id`</a>
* <a href="#index">`index`</a>
* <a href="#initcount">`initCount`</a>
* <a href="#initcount">`initCount`</a>
* <a href="#maxtime">`maxTime`</a>
* <a href="#maxtime">`maxTime`</a>
* <a href="#mean">`mean`</a>
* <a href="#minsamples">`minSamples`</a>
* <a href="#minsamples">`minSamples`</a>
* <a href="#mintime">`minTime`</a>
* <a href="#mintime">`minTime`</a>
* <a href="#moe">`moe`</a>
* <a href="#name">`name`</a>
* <a href="#name">`name`</a>
* <a href="#onabort">`onAbort`</a>
* <a href="#oncomplete">`onComplete`</a>
* <a href="#oncycle">`onCycle`</a>
* <a href="#onerror">`onError`</a>
* <a href="#onreset">`onReset`</a>
* <a href="#onstart">`onStart`</a>
* <a href="#options">`options`</a>
* <a href="#parts">`parts`</a>
* <a href="#period">`period`</a>
* <a href="#queue">`queue`</a>
* <a href="#queued">`queued`</a>
* <a href="#result">`result`</a>
* <a href="#result">`result`</a>
* <a href="#rme">`rme`</a>
* <a href="#running">`running`</a>
* <a href="#running">`running`</a>
* <a href="#sample">`sample`</a>
* <a href="#sem">`sem`</a>
* <a href="#setup">`setup`</a>
* <a href="#static-highestdefaulttimer">`static #highestDefaultTimer`</a>
* <a href="#staticanchor">`static anchor`</a>
* <a href="#staticoptions">`static options`</a>
* <a href="#staticversion">`static version`</a>
* <a href="#target">`target`</a>
* <a href="#teardown">`teardown`</a>
* <a href="#templatedata">`templateData`</a>
* <a href="#timestamp">`timeStamp`</a>
* <a href="#timestamp">`timeStamp`</a>
* <a href="#timestamp">`timeStamp`</a>
* <a href="#timers">`timers`</a>
* <a href="#variance">`variance`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `Methods`

<!-- div -->

<h3 id="-destroyelementelement"><code>#destroyElement(element)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L160 [&#x24C9;][1]

Destroys the given element.

#### Arguments
1. `element` *(Element)*: The element to destroy.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeconstructorclone-timer"><code>Benchmark.prototype.constructor(clone, timer)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2091 [&#x24C9;][1]

The Deferred constructor.

#### Arguments
1. `clone` *(Benchmark)*: The cloned benchmark instance.
2. `timer` *(Timer)*: The timer instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeconstructortype"><code>Benchmark.prototype.constructor(type)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2181 [&#x24C9;][1]

The Event constructor.

#### Arguments
1. `type` *(Object|string)*: The event type.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeconstructorname-options"><code>Benchmark.prototype.constructor(name, [options={}])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2262 [&#x24C9;][1]

The Suite constructor.

#### Arguments
1. `name` *(string)*: A name to identify the suite.
2. `[options={}]` *(Object)*: Options object.

#### Example
```js
// basic usage (the `new` operator is optional)
var suite = new Benchmark.Suite;

// or using a name first
var suite = new Benchmark.Suite('foo');

// or with options
var suite = new Benchmark.Suite('foo', {

  // called when the suite starts running
  'onStart': onStart,

  // called between running benchmarks
  'onCycle': onCycle,

  // called when aborted
  'onAbort': onAbort,

  // called when a test errors
  'onError': onError,

  // called when reset
  'onReset': onReset,

  // called when the suite completes running
  'onComplete': onComplete
});
```
---

<!-- /div -->

<!-- div -->

<h3 id="abort"><code>abort()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1703 [&#x24C9;][1]

Aborts the benchmark without recording times.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="abort"><code>abort()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2338 [&#x24C9;][1]

Aborts all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="addname-fn-options"><code>add(name, fn, [options={}])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2397 [&#x24C9;][1]

Adds a test to the benchmark suite.

#### Arguments
1. `name` *(string)*: A name to identify the benchmark.
2. `fn` *(Function|string)*: The test to benchmark.
3. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The suite instance.

#### Example
```js
// basic usage
suite.add(fn);

// or using a name first
suite.add('foo', fn);

// or with options
suite.add('foo', fn, {
  'onCycle': onCycle,
  'onComplete': onComplete
});

// or name and options
suite.add('foo', {
  'fn': fn,
  'onCycle': onCycle,
  'onComplete': onComplete
});

// or options only
suite.add({
  'name': 'foo',
  'fn': fn,
  'onCycle': onCycle,
  'onComplete': onComplete
});
```
---

<!-- /div -->

<!-- div -->

<h3 id="callbackbench"><code>callback(bench)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1301 [&#x24C9;][1]

Callback to exclude those that are errored, unrun, or have hz of Infinity.

#### Arguments
1. `bench` *(Benchmark)*: <br>
<br>

#### Returns
*(boolean)*:

---

<!-- /div -->

<!-- div -->

<h3 id="cloneoptions"><code>clone([options])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1739 [&#x24C9;][1]

Creates a new benchmark using the same test and options.

#### Arguments
1. `[options]` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Benchmark)*: The new benchmark instance.

#### Example
```js
var bizarro = bench.clone({
  'name': 'doppelganger'
});
```
---

<!-- /div -->

<!-- div -->

<h3 id="cloneoptions"><code>clone(options)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2414 [&#x24C9;][1]

Creates a new suite with cloned benchmarks.

#### Arguments
1. `options` *(Object)*: Options object to overwrite cloned options.

#### Returns
*(Object)*: The new suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="compareother"><code>compare(other)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1779 [&#x24C9;][1]

Determines if a benchmark is faster than another.

#### Arguments
1. `other` *(Benchmark)*: The benchmark to compare.

#### Returns
*(number)*: Returns `-1` if slower, `1` if faster, and `0` if indeterminate.

---

<!-- /div -->

<!-- div -->

<h3 id="constructordoc"><code>constructor(doc)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L150 [&#x24C9;][1]



#### Arguments
1. `doc` *(Document)*:

---

<!-- /div -->

<!-- div -->

<h3 id="constructorns-res-unit"><code>constructor(ns, res, unit)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L431 [&#x24C9;][1]



#### Arguments
1. `ns` ():
2. `res` ():
3. `unit` ():

---

<!-- /div -->

<!-- div -->

<h3 id="constructormaybename-fn-options"><code>constructor(maybeName, [fn], [options])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1673 [&#x24C9;][1]

The Benchmark constructor.

#### Arguments
1. `maybeName` *(Function|object|string)*: A name to identify the benchmark.
2. `[fn]` *(Function|string)*: The test to benchmark.
3. `[options]` *(Object)*: Options object.

#### Example
```js
// basic usage (the `new` operator is optional)
var bench = new Benchmark(fn);

// or using a name first
var bench = new Benchmark('foo', fn);

// or with options
var bench = new Benchmark('foo', fn, {

  // displayed by `Benchmark#toString` if `name` is not available
  'id': 'xyz',

  // called when the benchmark starts running
  'onStart': onStart,

  // called after each run cycle
  'onCycle': onCycle,

  // called when aborted
  'onAbort': onAbort,

  // called when a test errors
  'onError': onError,

  // called when reset
  'onReset': onReset,

  // called when the benchmark completes running
  'onComplete': onComplete,

  // compiled/called before the test loop
  'setup': setup,

  // compiled/called after the test loop
  'teardown': teardown
});

// or name and options
var bench = new Benchmark('foo', {

  // a flag to indicate the benchmark is deferred
  'defer': true,

  // benchmark test function
  'fn': function(deferred) {
    // call `Deferred#resolve` when the deferred test is finished
    deferred.resolve();
  }
});

// or options only
var bench = new Benchmark({

  // benchmark name
  'name': 'foo',

  // benchmark test as a string
  'fn': '[1,2,3,4].sort()'
});

// a test's `this` binding is set to the benchmark instance
var bench = new Benchmark('foo', function() {
  'My name is '.concat(this.name); // "My name is foo"
});
```
---

<!-- /div -->

<!-- div -->

<h3 id="createcompiledbench-decompilable-deferred-body-timer"><code>createCompiled(bench, decompilable, deferred, body, timer)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2663 [&#x24C9;][1]

Creates a compiled function from the given function `body`.

#### Arguments
1. `bench` *(Benchmark)*:
2. `decompilable` *(boolean)*:
3. `deferred` *(boolean)*:
4. `body` *(string)*:
5. `timer` *(Timer)*: <br>
<br>

#### Returns
*(Function)*:

---

<!-- /div -->

<!-- div -->

<h3 id="emitevent-args"><code>emit(event, [args])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L614 [&#x24C9;][1]

Executes all registered listeners of the specified event type.

#### Arguments
1. `event` *(Event)*: The event type or object.
2. `[args]` *(...JsdocTypeAny)*: Arguments to invoke the listener with.

#### Returns
*(&#42;)*: Returns the return value of the last listener executed.

---

<!-- /div -->

<!-- div -->

<h3 id="filtercallback"><code>filter(callback)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2435 [&#x24C9;][1]

An `Array#filter` like method.

#### Arguments
1. `callback` *(Function|string)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

---

<!-- /div -->

<!-- div -->

<h3 id="getnextevent"><code>getNext([event])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1464 [&#x24C9;][1]

Fetches the next bench or executes `onComplete` callback.

#### Arguments
1. `[event]` *(Event)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getresultregex-str"><code>getResult(regex, str)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L105 [&#x24C9;][1]



#### Arguments
1. `regex` *(RegExp)*:
2. `str` *(string)*: <br>
<br>

#### Returns
*(string)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getscorexa-sampleb"><code>getScore(xA, sampleB)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1803 [&#x24C9;][1]



#### Arguments
1. `xA` *(number)*:
2. `sampleB` ():

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getusamplea-sampleb"><code>getU(sampleA, sampleB)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1814 [&#x24C9;][1]



#### Arguments
1. `sampleA` ():
2. `sampleB` ():

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getzu"><code>getZ(u)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1824 [&#x24C9;][1]



#### Arguments
1. `u` *(number)*:

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="hasmaybe-prop"><code>has(maybe, prop)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L93 [&#x24C9;][1]



#### Arguments
1. `maybe` *(&#42;)*:
2. `prop` *(string)*: <br>
<br>

#### Returns
*(boolean)*:

---

<!-- /div -->

<!-- div -->

<h3 id="has_divisormaybe"><code>has_divisor(maybe)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2977 [&#x24C9;][1]



#### Arguments
1. `maybe` *(number)*: <br>
<br>

#### Returns
*(boolean)*:

---

<!-- /div -->

<!-- div -->

<h3 id="indexofbench"><code>indexOf(bench)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2329 [&#x24C9;][1]



#### Arguments
1. `bench` *(Benchmark)*: <br>
<br>

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="interpolatestring"><code>interpolate(string)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2726 [&#x24C9;][1]

Interpolates a given template string.

#### Arguments
1. `string` *(string)*: <br>
<br>

#### Returns
*(string)*:

---

<!-- /div -->

<!-- div -->

<h3 id="listenerstype"><code>listeners(type)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L644 [&#x24C9;][1]

Returns an array of event listeners for a given type that can be manipulated to add or remove listeners.

#### Arguments
1. `type` *(string)*: The event type.

#### Returns
*(&#42;)*: The listeners array.

---

<!-- /div -->

<!-- div -->

<h3 id="offtype-listener"><code>off([type], [listener])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L680 [&#x24C9;][1]

Unregisters a listener for the specified event type(s), or unregisters all listeners for the specified event type(s), or unregisters all listeners for all event types.

#### Arguments
1. `[type]` *(string)*: The event type.
2. `[listener]` *(Function)*: The function to unregister.

#### Returns
*(Object)*: The current instance.

#### Example
```js
// unregister a listener for an event type
bench.off('cycle', listener);

// unregister a listener for multiple event types
bench.off('start cycle', listener);

// unregister all listeners for an event type
bench.off('cycle');

// unregister all listeners for multiple event types
bench.off('start cycle complete');

// unregister all listeners for all event types
bench.off();
```
---

<!-- /div -->

<!-- div -->

<h3 id="ontype-listener"><code>on(type, listener)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L728 [&#x24C9;][1]

Registers a listener for the specified event type(s).

#### Arguments
1. `type` *(string)*: The event type.
2. `listener` *(Function)*: The function to register.

#### Returns
*(Object)*: The current instance.

#### Example
```js
// register a listener for an event type
bench.on('cycle', listener);

// register a listener for multiple event types
bench.on('start cycle', listener);
```
---

<!-- /div -->

<!-- div -->

<h3 id="reset"><code>reset()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1872 [&#x24C9;][1]

Reset properties and abort if running.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="reset"><code>reset()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2451 [&#x24C9;][1]

Resets all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="reverse"><code>reverse()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2309 [&#x24C9;][1]

Reverse the benchmarks order

#### Returns
*(Suite)*:

---

<!-- /div -->

<!-- div -->

<h3 id="runoptions"><code>run([options={}])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2005 [&#x24C9;][1]

Runs the benchmark.

#### Arguments
1. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The benchmark instance.

#### Example
```js
// basic usage
bench.run();

// or with options
bench.run({ 'async': true });
```
---

<!-- /div -->

<!-- div -->

<h3 id="runoptions"><code>run([options={}])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2486 [&#x24C9;][1]

Runs the suite.

#### Arguments
1. `[options={}]` *(Object)*: Options object.

#### Returns
*(Object)*: The suite instance.

#### Example
```js
// basic usage
suite.run();

// or with options
suite.run({ 'async': true, 'queued': true });
```
---

<!-- /div -->

<!-- div -->

<h3 id="runscriptcode"><code>runScript(code)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L170 [&#x24C9;][1]

Runs a snippet of JavaScript via script injection.

#### Arguments
1. `code` *(string)*: The code to run.

---

<!-- /div -->

<!-- div -->

<h3 id="setoptionsoptions"><code>setOptions([options={}])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L747 [&#x24C9;][1]

A helper function for setting options/event handlers.

#### Arguments
1. `[options={}]` *(Object)*: Options object.

---

<!-- /div -->

<!-- div -->

<h3 id="shift"><code>shift()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2320 [&#x24C9;][1]

Removes the first benchmark from the benchmarks array and returns it

#### Returns
*(Benchmark|undefined)*:

---

<!-- /div -->

<!-- div -->

<h3 id="static-getresunitunit-ns"><code>static #getRes(unit(unit, ns)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L483 [&#x24C9;][1]

Gets the current timer's minimum resolution *(secs)*.

#### Arguments
1. `unit` ():
2. `ns` ():

---

<!-- /div -->

<!-- div -->

<h3 id="staticdefaultvalues"><code>static defaultValues()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L821 [&#x24C9;][1]

The default values for Benchmark instance properties

#### Returns
*(Object)*:

---

<!-- /div -->

<!-- div -->

<h3 id="staticfilterarrayarray-callback"><code>static filter(array(array, callback)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1292 [&#x24C9;][1]

A generic `Array#filter` like method.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `callback` *(Function|string)*: The function/alias called per iteration.

#### Returns
*(Array)*: A new array of values that passed callback filter.

#### Example
```js
// get odd numbers
Benchmark.filter([1, 2, 3, 4, 5], function(n) {
  return n % 2;
}); // -> [1, 3, 5];

// get fastest benchmarks
Benchmark.filter(benches, 'fastest');

// get slowest benchmarks
Benchmark.filter(benches, 'slowest');

// get benchmarks that completed without erroring
Benchmark.filter(benches, 'successful');
```
---

<!-- /div -->

<!-- div -->

<h3 id="staticinvokebenchesbenches-maybename-args"><code>static invoke(benches(benches, maybeName, [args])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1409 [&#x24C9;][1]

Invokes a method on all items in an array.

#### Arguments
1. `benches` *(Benchmark&#91;&#93;|Suite)*: Array of benchmarks to iterate over.
2. `maybeName` *(JsdocTypeObject|string)*: The name of the method to invoke OR options object.
3. `[args]` *(...JsdocTypeAny)*: Arguments to invoke the method with.

#### Returns
*(Array)*: A new array of values returned from each method invoked.

#### Example
```js
// invoke `reset` on all benchmarks
Benchmark.invoke(benches, 'reset');

// invoke `emit` with arguments
Benchmark.invoke(benches, 'emit', 'complete', listener);

// invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
Benchmark.invoke(benches, {

  // invoke the `run` method
  'name': 'run',

  // pass a single argument
  'args': true,

  // treat as queue, removing benchmarks from front of `benches` until empty
  'queued': true,

  // called before any benchmarks have been invoked.
  'onStart': onStart,

  // called between invoking benchmarks
  'onCycle': onCycle,

  // called after all benchmarks have been invoked.
  'onComplete': onComplete
});
```
---

<!-- /div -->

<!-- div -->

<h3 id="staticjoinobjectobject-separator1-separator2"><code>static join(object(object, [separator1], [separator2])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1579 [&#x24C9;][1]

Creates a string of joined array values or object key-value pairs.

#### Arguments
1. `object` *(Array|Object)*: The object to operate on.
2. `[separator1]` *(string)*: The separator used between key-value pairs.
3. `[separator2]` *(string)*: The separator used between keys and values.

#### Returns
*(string)*: The joined result.

---

<!-- /div -->

<!-- div -->

<h3 id="tagged_-string"><code>tagged(_, string)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2733 [&#x24C9;][1]



#### Arguments
1. `_` *(TemplateStringsArray)*:
2. `string` *(string)*: <br>
<br>

#### Returns
*(string)*:

---

<!-- /div -->

<!-- div -->

<h3 id="tostring"><code>toString()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1963 [&#x24C9;][1]

Displays relevant benchmark information when coerced to a string.

#### Returns
*(string)*: A string representation of the benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="updateevent"><code>update(event)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2786 [&#x24C9;][1]

Updates the clone/original benchmarks to keep their data in sync.

#### Arguments
1. `event` *(Event)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

<h3 id="-start"><code>#start</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L372 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="-stop"><code>#stop</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L393 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="aborted"><code>aborted</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L974 [&#x24C9;][1]

(boolean): A flag to indicate if the benchmark is aborted.

---

<!-- /div -->

<!-- div -->

<h3 id="aborted"><code>aborted</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2128 [&#x24C9;][1]

(boolean): A flag to indicate if the emitters listener iteration is aborted.

---

<!-- /div -->

<!-- div -->

<h3 id="aborted"><code>aborted</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2217 [&#x24C9;][1]

(boolean): A flag to indicate if the suite is aborted.

---

<!-- /div -->

<!-- div -->

<h3 id="args"><code>args</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1411 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="async"><code>async</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L859 [&#x24C9;][1]

(boolean): A flag to indicate that benchmark cycles will execute asynchronously by default.

---

<!-- /div -->

<!-- div -->

<h3 id="async"><code>async</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L982 [&#x24C9;][1]

(boolean): A flag to indicate that benchmark cycles will execute asynchronously by default.

---

<!-- /div -->

<!-- div -->

<h3 id="bench"><code>bench</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1413 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="calledby"><code>calledBy</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L129 [&#x24C9;][1]

({abort?: true, abortSuite?: true, reset?: true, resetSuite?: true}): Used to avoid infinite recursion when methods call each other.

---

<!-- /div -->

<!-- div -->

<h3 id="cancelled"><code>cancelled</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2135 [&#x24C9;][1]

(boolean): A flag to indicate if the default action is cancelled.

---

<!-- /div -->

<!-- div -->

<h3 id="changes"><code>changes</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1886 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="clocked"><code>clocked</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2928 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="compiled"><code>compiled</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L989 [&#x24C9;][1]

(Function, undefined): The compiled test function.

---

<!-- /div -->

<!-- div -->

<h3 id="count"><code>count</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L996 [&#x24C9;][1]

(number): The number of times a test was executed.

---

<!-- /div -->

<!-- div -->

<h3 id="currenttarget"><code>currentTarget</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2142 [&#x24C9;][1]

(*(EventTarget[])*, EventTarget, undefined): The object whose listeners are currently being processed.

---

<!-- /div -->

<!-- div -->

<h3 id="cycle"><code>cycle</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1224 [&#x24C9;][1]

(number): The time taken to complete the last cycle *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="cycles"><code>cycles</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1003 [&#x24C9;][1]

(number): The number of cycles performed while benchmarking.

---

<!-- /div -->

<!-- div -->

<h3 id="cycles"><code>cycles</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2068 [&#x24C9;][1]

(number): The number of deferred cycles performed while benchmarking.

---

<!-- /div -->

<!-- div -->

<h3 id="defer"><code>defer</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L866 [&#x24C9;][1]

(boolean): A flag to indicate that the benchmark clock is deferred.

---

<!-- /div -->

<!-- div -->

<h3 id="defer"><code>defer</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1010 [&#x24C9;][1]

(boolean): A flag to indicate that the benchmark clock is deferred.

---

<!-- /div -->

<!-- div -->

<h3 id="delay"><code>delay</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L872 [&#x24C9;][1]

(number, 'idle'): The delay between test cycles *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="delay"><code>delay</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1017 [&#x24C9;][1]

(number, 'idle'): The delay between test cycles *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="deviation"><code>deviation</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1184 [&#x24C9;][1]

(number): The sample standard deviation.

---

<!-- /div -->

<!-- div -->

<h3 id="elapsed"><code>elapsed</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1231 [&#x24C9;][1]

(number): The time taken to complete the benchmark *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="elapsed"><code>elapsed</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2075 [&#x24C9;][1]

(number): The time taken to complete the deferred benchmark *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="error"><code>error</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1024 [&#x24C9;][1]

(Object, undefined): The error object if the test failed.

---

<!-- /div -->

<!-- div -->

<h3 id="event"><code>event</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1883 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="events"><code>events</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L598 [&#x24C9;][1]

(Object<string, Function[]>): Registered events for the event target

---

<!-- /div -->

<!-- div -->

<h3 id="fn"><code>fn</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1031 [&#x24C9;][1]

(Function, string, undefined): The test to benchmark.

---

<!-- /div -->

<!-- div -->

<h3 id="hz"><code>hz</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1038 [&#x24C9;][1]

(number): The number of executions per second.

---

<!-- /div -->

<!-- div -->

<h3 id="id"><code>id</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L880 [&#x24C9;][1]

(string, undefined): Displayed by `Benchmark#toString` when a `name` is not available *(auto-generated if absent)*.

---

<!-- /div -->

<!-- div -->

<h3 id="index"><code>index</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1417 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="initcount"><code>initCount</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L887 [&#x24C9;][1]

(number): The default number of times to execute a test on a benchmark's first cycle.

---

<!-- /div -->

<!-- div -->

<h3 id="initcount"><code>initCount</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1053 [&#x24C9;][1]

(number): The default number of times to execute a test on a benchmark's first cycle.

---

<!-- /div -->

<!-- div -->

<h3 id="maxtime"><code>maxTime</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L896 [&#x24C9;][1]

(number): The maximum time a benchmark is allowed to run before finishing *(secs)*. Note: Cycle delays aren't counted toward the maximum time.

---

<!-- /div -->

<!-- div -->

<h3 id="maxtime"><code>maxTime</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1062 [&#x24C9;][1]

(number): The maximum time a benchmark is allowed to run before finishing *(secs)*. Note: Cycle delays aren't counted toward the maximum time.

---

<!-- /div -->

<!-- div -->

<h3 id="mean"><code>mean</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1191 [&#x24C9;][1]

(number): The sample arithmetic mean *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="minsamples"><code>minSamples</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L903 [&#x24C9;][1]

(number): The minimum sample size required to perform statistical analysis.

---

<!-- /div -->

<!-- div -->

<h3 id="minsamples"><code>minSamples</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1069 [&#x24C9;][1]

(number): The minimum sample size required to perform statistical analysis.

---

<!-- /div -->

<!-- div -->

<h3 id="mintime"><code>minTime</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L910 [&#x24C9;][1]

(number): The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="mintime"><code>minTime</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1076 [&#x24C9;][1]

(number): The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="moe"><code>moe</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1163 [&#x24C9;][1]

(number): The margin of error.

---

<!-- /div -->

<!-- div -->

<h3 id="name"><code>name</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L917 [&#x24C9;][1]

(string, undefined): The name of the benchmark.

---

<!-- /div -->

<!-- div -->

<h3 id="name"><code>name</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2206 [&#x24C9;][1]

(string, string): The name of the suite.

---

<!-- /div -->

<!-- div -->

<h3 id="onabort"><code>onAbort</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L924 [&#x24C9;][1]

(Function, undefined): An event listener called when the benchmark is aborted.

---

<!-- /div -->

<!-- div -->

<h3 id="oncomplete"><code>onComplete</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L931 [&#x24C9;][1]

(Function, undefined): An event listener called when the benchmark completes running.

---

<!-- /div -->

<!-- div -->

<h3 id="oncycle"><code>onCycle</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L938 [&#x24C9;][1]

(Function, undefined): An event listener called after each run cycle.

---

<!-- /div -->

<!-- div -->

<h3 id="onerror"><code>onError</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L945 [&#x24C9;][1]

(Function, undefined): An event listener called when a test errors.

---

<!-- /div -->

<!-- div -->

<h3 id="onreset"><code>onReset</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L952 [&#x24C9;][1]

(Function, undefined): An event listener called when the benchmark is reset.

---

<!-- /div -->

<!-- div -->

<h3 id="onstart"><code>onStart</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L959 [&#x24C9;][1]

(Function, undefined): An event listener called when the benchmark starts running.

---

<!-- /div -->

<!-- div -->

<h3 id="options"><code>options</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L605 [&#x24C9;][1]

(Object): Instance options

---

<!-- /div -->

<!-- div -->

<h3 id="parts"><code>parts</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1367 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="period"><code>period</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1238 [&#x24C9;][1]

(number): The time taken to execute the test once *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="queue"><code>queue</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1888 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="queued"><code>queued</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1415 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="result"><code>result</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1581 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="result"><code>result</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2149 [&#x24C9;][1]

(*): The return value of the last executed listener.

---

<!-- /div -->

<!-- div -->

<h3 id="rme"><code>rme</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1170 [&#x24C9;][1]

(number): The relative margin of error *(expressed as a percentage of the mean)*.

---

<!-- /div -->

<!-- div -->

<h3 id="running"><code>running</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1090 [&#x24C9;][1]

(boolean): A flag to indicate if the benchmark is running.

---

<!-- /div -->

<!-- div -->

<h3 id="running"><code>running</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2224 [&#x24C9;][1]

(boolean): A flag to indicate if the suite is running.

---

<!-- /div -->

<!-- div -->

<h3 id="sample"><code>sample</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1198 [&#x24C9;][1]

(Array): The array of sampled periods.

---

<!-- /div -->

<!-- div -->

<h3 id="sem"><code>sem</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1177 [&#x24C9;][1]

(number): The standard error of the mean.

---

<!-- /div -->

<!-- div -->

<h3 id="setup"><code>setup</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1152 [&#x24C9;][1]

(Function, string): Compiled into the test and executed immediately **before** the test loop.

#### Example
```js
// basic usage
var bench = Benchmark({
  'setup': function() {
    var c = this.count,
        element = document.getElementById('container');
    while (c--) {
      element.appendChild(document.createElement('div'));
    }
  },
  'fn': function() {
    element.removeChild(element.lastChild);
  }
});

// compiles to something like:
var c = this.count,
    element = document.getElementById('container');
while (c--) {
  element.appendChild(document.createElement('div'));
}
var start = new Date;
while (count--) {
  element.removeChild(element.lastChild);
}
var end = new Date - start;

// or using strings
var bench = Benchmark({
  'setup': '\
    var a = 0;\n\
    (function() {\n\
      (function() {\n\
        (function() {',
  'fn': 'a += 1;',
  'teardown': '\
         }())\n\
       }())\n\
     }())'
});

// compiles to something like:
var a = 0;
(function() {
  (function() {
    (function() {
      var start = new Date;
      while (count--) {
        a += 1;
      }
      var end = new Date - start;
    }())
  }())
}())
```
---

<!-- /div -->

<!-- div -->

<h3 id="static-highestdefaulttimer"><code>static #highestDefaultTimer</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L449 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="staticanchor"><code>static anchor</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L814 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="staticoptions"><code>static options</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2199 [&#x24C9;][1]

(Object): The default options copied by suite instances.

---

<!-- /div -->

<!-- div -->

<h3 id="staticversion"><code>static version</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1256 [&#x24C9;][1]

(string): The semantic version number.

---

<!-- /div -->

<!-- div -->

<h3 id="target"><code>target</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2156 [&#x24C9;][1]

(EventTarget, undefined): The object to which the event was originally emitted.

---

<!-- /div -->

<!-- div -->

<h3 id="teardown"><code>teardown</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1213 [&#x24C9;][1]

(Function, string): Compiled into the test and executed immediately **after** the test loop.

---

<!-- /div -->

<!-- div -->

<h3 id="templatedata"><code>templateData</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2521 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="timestamp"><code>timeStamp</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1245 [&#x24C9;][1]

(number): A timestamp of when the benchmark started *(ms)*.

---

<!-- /div -->

<!-- div -->

<h3 id="timestamp"><code>timeStamp</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2082 [&#x24C9;][1]

(number): A timestamp of when the deferred benchmark started *(ms)*.

---

<!-- /div -->

<!-- div -->

<h3 id="timestamp"><code>timeStamp</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L2163 [&#x24C9;][1]

(number): A timestamp of when the event was created *(ms)*.

---

<!-- /div -->

<!-- div -->

<h3 id="timers"><code>timers</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L536 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="variance"><code>variance</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/55776a9bf0ba5a90cd029dc39f53ce4c771db581/benchmark.js#L1205 [&#x24C9;][1]

(number): The sample variance.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #methods "Jump back to the TOC."
