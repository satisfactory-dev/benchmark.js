# @satisfactory-dev/benchmark <span>b1f0d8e9ea390424b92078d919ffce031dd80f5c</span>

<!-- div class="toc-container" -->

<!-- div -->

## `Properties`
* <a href="#-doc">`#doc`</a>
* <a href="#-trash">`#trash`</a>
* <a href="#calledby">`calledBy`</a>
* <a href="#compiled">`compiled`</a>
* <a href="#cycle">`cycle`</a>
* <a href="#deviation">`deviation`</a>
* <a href="#elapsed">`elapsed`</a>
* <a href="#error">`error`</a>
* <a href="#events">`events`</a>
* <a href="#fn">`fn`</a>
* <a href="#hz">`hz`</a>
* <a href="#id">`id`</a>
* <a href="#initcount">`initCount`</a>
* <a href="#maxtime">`maxTime`</a>
* <a href="#mean">`mean`</a>
* <a href="#message">`message`</a>
* <a href="#minsamples">`minSamples`</a>
* <a href="#mintime">`minTime`</a>
* <a href="#moe">`moe`</a>
* <a href="#name">`name`</a>
* <a href="#period">`period`</a>
* <a href="#queue">`queue`</a>
* <a href="#result">`result`</a>
* <a href="#rme">`rme`</a>
* <a href="#running">`running`</a>
* <a href="#sample">`sample`</a>
* <a href="#sem">`sem`</a>
* <a href="#setup">`setup`</a>
* <a href="#static-ustimer">`static #usTimer`</a>
* <a href="#staticanchor">`static anchor`</a>
* <a href="#target">`target`</a>
* <a href="#teardown">`teardown`</a>
* <a href="#templatedata">`templateData`</a>
* <a href="#timestamp">`timeStamp`</a>
* <a href="#timers">`timers`</a>
* <a href="#variance">`variance`</a>

<!-- /div -->

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
* <a href="#constructormaybename-fn-options">`constructor`</a>
* <a href="#createcompiledbench-decompilable-deferred-body-timer">`createCompiled`</a>
* <a href="#emitevent-args">`emit`</a>
* <a href="#filtercallback">`filter`</a>
* <a href="#getnextevent">`getNext`</a>
* <a href="#getscorexa-sampleb">`getScore`</a>
* <a href="#getusamplea-sampleb">`getU`</a>
* <a href="#getzu">`getZ`</a>
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
* <a href="#staticdefaultvalues">`static defaultValues`</a>
* <a href="#staticformatnumbernumbernumber">`static formatNumber`</a>
* <a href="#staticgettimer">`static get timer`</a>
* <a href="#staticjoinobjectobject-separator1-separator2">`static join`</a>
* <a href="#tagged_-string">`tagged`</a>
* <a href="#tostring">`toString`</a>
* <a href="#updateevent">`update`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `Properties`

<!-- div -->

<h3 id="-doc"><code>#doc</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L132 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="-trash"><code>#trash</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L137 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="calledby"><code>calledBy</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L121 [&#x24C9;][1]

({abort?: true, abortSuite?: true, reset?: true, resetSuite?: true}): Used to avoid infinite recursion when methods call each other.

---

<!-- /div -->

<!-- div -->

<h3 id="compiled"><code>compiled</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2807 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="cycle"><code>cycle</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1311 [&#x24C9;][1]

(number): The time taken to complete the last cycle *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="deviation"><code>deviation</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1271 [&#x24C9;][1]

(number): The sample standard deviation.

---

<!-- /div -->

<!-- div -->

<h3 id="elapsed"><code>elapsed</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1318 [&#x24C9;][1]

(number): The time taken to complete the benchmark *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="error"><code>error</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1111 [&#x24C9;][1]

The error object if the test failed.

---

<!-- /div -->

<!-- div -->

<h3 id="events"><code>events</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L595 [&#x24C9;][1]

(Object<string, Function[]>): Registered events for the event target

---

<!-- /div -->

<!-- div -->

<h3 id="fn"><code>fn</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1118 [&#x24C9;][1]

(Function, string, undefined): The test to benchmark.

---

<!-- /div -->

<!-- div -->

<h3 id="hz"><code>hz</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1125 [&#x24C9;][1]

(number): The number of executions per second.

---

<!-- /div -->

<!-- div -->

<h3 id="id"><code>id</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1133 [&#x24C9;][1]

(string, number): Displayed by `Benchmark#toString` when a `name` is not available *(auto-generated if absent)*.

---

<!-- /div -->

<!-- div -->

<h3 id="initcount"><code>initCount</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1140 [&#x24C9;][1]

(number): The default number of times to execute a test on a benchmark's first cycle.

---

<!-- /div -->

<!-- div -->

<h3 id="maxtime"><code>maxTime</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1149 [&#x24C9;][1]

(number): The maximum time a benchmark is allowed to run before finishing *(secs)*. Note: Cycle delays aren't counted toward the maximum time.

---

<!-- /div -->

<!-- div -->

<h3 id="mean"><code>mean</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1278 [&#x24C9;][1]

(number): The sample arithmetic mean *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="message"><code>message</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2380 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="minsamples"><code>minSamples</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1156 [&#x24C9;][1]

(number): The minimum sample size required to perform statistical analysis.

---

<!-- /div -->

<!-- div -->

<h3 id="mintime"><code>minTime</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1163 [&#x24C9;][1]

(number): The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="moe"><code>moe</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1250 [&#x24C9;][1]

(number): The margin of error.

---

<!-- /div -->

<!-- div -->

<h3 id="name"><code>name</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1170 [&#x24C9;][1]

(string, undefined): The name of the benchmark.

---

<!-- /div -->

<!-- div -->

<h3 id="period"><code>period</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1325 [&#x24C9;][1]

(number): The time taken to execute the test once *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="queue"><code>queue</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L3001 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="result"><code>result</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1735 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="rme"><code>rme</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1257 [&#x24C9;][1]

(number): The relative margin of error *(expressed as a percentage of the mean)*.

---

<!-- /div -->

<!-- div -->

<h3 id="running"><code>running</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1177 [&#x24C9;][1]

(boolean): A flag to indicate if the benchmark is running.

---

<!-- /div -->

<!-- div -->

<h3 id="sample"><code>sample</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1285 [&#x24C9;][1]

(Array): The array of sampled periods.

---

<!-- /div -->

<!-- div -->

<h3 id="sem"><code>sem</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1264 [&#x24C9;][1]

(number): The standard error of the mean.

---

<!-- /div -->

<!-- div -->

<h3 id="setup"><code>setup</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1239 [&#x24C9;][1]

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

<h3 id="static-ustimer"><code>static #usTimer</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L428 [&#x24C9;][1]

({now(): number}, undefined): A high-precision timer such as the one provided by microtime

---

<!-- /div -->

<!-- div -->

<h3 id="staticanchor"><code>static anchor</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L991 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="target"><code>target</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2367 [&#x24C9;][1]

(EventTarget, undefined): The object to which the event was originally emitted.

---

<!-- /div -->

<!-- div -->

<h3 id="teardown"><code>teardown</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1300 [&#x24C9;][1]

(Function, string): Compiled into the test and executed immediately **after** the test loop.

---

<!-- /div -->

<!-- div -->

<h3 id="templatedata"><code>templateData</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2751 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="timestamp"><code>timeStamp</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1332 [&#x24C9;][1]

(number): A timestamp of when the benchmark started *(ms)*.

---

<!-- /div -->

<!-- div -->

<h3 id="timers"><code>timers</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L533 [&#x24C9;][1]



---

<!-- /div -->

<!-- div -->

<h3 id="variance"><code>variance</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1292 [&#x24C9;][1]

(number): The sample variance.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

<h3 id="-destroyelementelement"><code>#destroyElement(element)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L152 [&#x24C9;][1]

Destroys the given element.

#### Arguments
1. `element` *(Element)*: The element to destroy.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeconstructorclone-timer"><code>Benchmark.prototype.constructor(clone, timer)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2279 [&#x24C9;][1]

The Deferred constructor.

#### Arguments
1. `clone` *(T)*: The cloned benchmark instance.
2. `timer` *(Timer)*: The timer instance.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeconstructortype"><code>Benchmark.prototype.constructor(type)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2388 [&#x24C9;][1]

The Event constructor.

#### Arguments
1. `type` *(JsdocTypeObject|Type)*: The event type.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeconstructorname-options"><code>Benchmark.prototype.constructor(name, [options])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2482 [&#x24C9;][1]

The Suite constructor.

#### Arguments
1. `name` *(object|string)*: A name to identify the suite.
2. `[options]` *(SuiteOptions)*: Options object.

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1859 [&#x24C9;][1]

Aborts the benchmark without recording times.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="abort"><code>abort()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2560 [&#x24C9;][1]

Aborts all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="addname-fn-options"><code>add(name, fn, [options={}])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2619 [&#x24C9;][1]

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1390 [&#x24C9;][1]

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1895 [&#x24C9;][1]

Creates a new benchmark using the same test and options.

#### Arguments
1. `[options]` (): Options object to overwrite cloned options.

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2639 [&#x24C9;][1]

Creates a new suite with cloned benchmarks.

#### Arguments
1. `options` *(SuiteOptions)*: Options object to overwrite cloned options.

#### Returns
*(Suite)*: The new suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="compareother"><code>compare(other)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1938 [&#x24C9;][1]

Determines if a benchmark is faster than another.

#### Arguments
1. `other` *(Benchmark)*: The benchmark to compare.

#### Returns
*(number)*: Returns `-1` if slower, `1` if faster, and `0` if indeterminate.

---

<!-- /div -->

<!-- div -->

<h3 id="constructordoc"><code>constructor(doc)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L142 [&#x24C9;][1]



#### Arguments
1. `doc` *(Document)*:

---

<!-- /div -->

<!-- div -->

<h3 id="constructormaybename-fn-options"><code>constructor(maybeName, [fn], [options])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1827 [&#x24C9;][1]

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2894 [&#x24C9;][1]

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L609 [&#x24C9;][1]

Executes all registered listeners of the specified event type.

#### Arguments
1. `event` *(Event)*: The event type or object.
2. `[args]` *(...JsdocTypeAny)*: Arguments to invoke the listener with.

#### Returns
*(unknown)*: Returns the return value of the last listener executed.

---

<!-- /div -->

<!-- div -->

<h3 id="filtercallback"><code>filter(callback)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2663 [&#x24C9;][1]

An `Array#filter` like method.

#### Arguments
1. `callback` *(Function|string)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

---

<!-- /div -->

<!-- div -->

<h3 id="getnextevent"><code>getNext([event])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1584 [&#x24C9;][1]

Fetches the next bench or executes `onComplete` callback.

#### Arguments
1. `[event]` *(Event)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getscorexa-sampleb"><code>getScore(xA, sampleB)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1962 [&#x24C9;][1]



#### Arguments
1. `xA` *(number)*:
2. `sampleB` ():

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getusamplea-sampleb"><code>getU(sampleA, sampleB)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1973 [&#x24C9;][1]



#### Arguments
1. `sampleA` ():
2. `sampleB` ():

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getzu"><code>getZ(u)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1983 [&#x24C9;][1]



#### Arguments
1. `u` *(number)*:

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="indexofbench"><code>indexOf(bench)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2551 [&#x24C9;][1]



#### Arguments
1. `bench` *(Benchmark)*: <br>
<br>

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="interpolatestring"><code>interpolate(string)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2963 [&#x24C9;][1]

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L662 [&#x24C9;][1]

Returns an array of event listeners for a given type that can be manipulated to add or remove listeners.

#### Arguments
1. `type` *(string)*: The event type.

#### Returns
*(&#42;)*: The listeners array.

---

<!-- /div -->

<!-- div -->

<h3 id="offtype-listener"><code>off([type], [listener])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L698 [&#x24C9;][1]

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L749 [&#x24C9;][1]

Registers a listener for the specified event type(s).

#### Arguments
1. `type` *(string)*: The event type.
2. `listener` *(Function)*: The function to register.

#### Returns
*(EventTarget)*: The current instance.

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2031 [&#x24C9;][1]

Reset properties and abort if running.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="reset"><code>reset()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2679 [&#x24C9;][1]

Resets all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="reverse"><code>reverse()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2531 [&#x24C9;][1]

Reverse the benchmarks order

#### Returns
*(Suite)*:

---

<!-- /div -->

<!-- div -->

<h3 id="runoptions"><code>run([options={}])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2194 [&#x24C9;][1]

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2714 [&#x24C9;][1]

Runs the suite.

#### Arguments
1. `[options={}]` *(Object)*: Options object.

#### Returns
*(Suite)*: The suite instance.

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L162 [&#x24C9;][1]

Runs a snippet of JavaScript via script injection.

#### Arguments
1. `code` *(string)*: The code to run.

---

<!-- /div -->

<!-- div -->

<h3 id="setoptionsoptions"><code>setOptions([options={}])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L763 [&#x24C9;][1]

A helper function for setting options/event handlers.

#### Arguments
1. `[options={}]` *(Object)*: Options object.

---

<!-- /div -->

<!-- div -->

<h3 id="shift"><code>shift()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2542 [&#x24C9;][1]

Removes the first benchmark from the benchmarks array and returns it

#### Returns
*(Benchmark|undefined)*:

---

<!-- /div -->

<!-- div -->

<h3 id="staticdefaultvalues"><code>static defaultValues()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L998 [&#x24C9;][1]

The default values for Benchmark instance properties

#### Returns
*(Object)*:

---

<!-- /div -->

<!-- div -->

<h3 id="staticformatnumbernumbernumber"><code>static formatNumber(number(number)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1457 [&#x24C9;][1]

Converts a number to a more readable comma-separated string representation.

#### Arguments
1. `number` *(number)*: The number to convert.

#### Returns
*(string)*: The more readable string representation.

---

<!-- /div -->

<!-- div -->

<h3 id="staticgettimer"><code>static get timer()()</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L530 [&#x24C9;][1]

Timer object used by `clock()` and `Deferred#resolve`.

#### Returns
*(Timer)*:

---

<!-- /div -->

<!-- div -->

<h3 id="staticjoinobjectobject-separator1-separator2"><code>static join(object(object, [separator1], [separator2])</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L1733 [&#x24C9;][1]

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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2970 [&#x24C9;][1]



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
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L2152 [&#x24C9;][1]

Displays relevant benchmark information when coerced to a string.

#### Returns
*(string)*: A string representation of the benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="updateevent"><code>update(event)</code></h3>
https://github.com/satisfactory-dev/benchmark.js/blob/b1f0d8e9ea390424b92078d919ffce031dd80f5c/benchmark.ts#L3024 [&#x24C9;][1]

Updates the clone/original benchmarks to keep their data in sync.

#### Arguments
1. `event` *(Event)*:

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #properties "Jump back to the TOC."
