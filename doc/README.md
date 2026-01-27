# @satisfactory-dev/benchmark <span>0fb20e16fa5050167171191a2b0f19af69af083d</span>

<!-- div class="toc-container" -->

<!-- div -->

## `Methods`
* <a href="#-destroyelementelement">`#destroyElement`</a>
* <a href="#benchmarkprototypeconstructortype">`Benchmark.prototype.constructor`</a>
* <a href="#benchmarkprototypeconstructorclone-timer">`Benchmark.prototype.constructor`</a>
* <a href="#abort">`abort`</a>
* <a href="#abort">`abort`</a>
* <a href="#addname-fn-options">`add`</a>
* <a href="#callbackbench">`callback`</a>
* <a href="#cloneoptions">`clone`</a>
* <a href="#cloneoptions">`clone`</a>
* <a href="#compareother">`compare`</a>
* <a href="#constructordoc">`constructor`</a>
* <a href="#createcompiledbench-decompilable-deferred-body-timer">`createCompiled`</a>
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
* <a href="#staticchangecontexthighestdefaulttimeroptions">`static changeContext`</a>
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
* <a href="#benchmarkprototypesupport">`Benchmark.prototype.Support`</a>
* <a href="#compiled">`compiled`</a>
* <a href="#error">`error`</a>
* <a href="#events">`events`</a>
* <a href="#fn">`fn`</a>
* <a href="#hz">`hz`</a>
* <a href="#initcount">`initCount`</a>
* <a href="#maxtime">`maxTime`</a>
* <a href="#minsamples">`minSamples`</a>
* <a href="#mintime">`minTime`</a>
* <a href="#result">`result`</a>
* <a href="#running">`running`</a>
* <a href="#setup">`setup`</a>
* <a href="#staticanchor">`static anchor`</a>
* <a href="#staticcalledby">`static calledBy`</a>
* <a href="#target">`target`</a>
* <a href="#teardown">`teardown`</a>
* <a href="#templatedata">`templateData`</a>
* <a href="#timers">`timers`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `Methods`

<!-- div -->

<h3 id="-destroyelementelement"><code>#destroyElement(element)</code></h3>

Destroys the given element.

#### Arguments
1. `element` *(Element)*: The element to destroy.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeconstructortype"><code>Benchmark.prototype.constructor(type)</code></h3>

The Event constructor.

#### Arguments
1. `type` *(JsdocTypeObject|Type)*: The event type.

---

<!-- /div -->

<!-- div -->

<h3 id="benchmarkprototypeconstructorclone-timer"><code>Benchmark.prototype.constructor(clone, timer)</code></h3>

The Deferred constructor.

#### Arguments
1. `clone` *(T)*: The cloned benchmark instance.
2. `timer` *(Timer)*: The timer instance.

---

<!-- /div -->

<!-- div -->

<h3 id="abort"><code>abort()</code></h3>

Aborts all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="abort"><code>abort()</code></h3>

Aborts the benchmark without recording times.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="addname-fn-options"><code>add(name, fn, [options={}])</code></h3>

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

Callback to exclude those that are errored, unrun, or have hz of Infinity.

#### Arguments
1. `bench` *(Benchmark)*: <br>
<br>

#### Returns
*(boolean)*:

---

<!-- /div -->

<!-- div -->

<h3 id="cloneoptions"><code>clone(options)</code></h3>

Creates a new suite with cloned benchmarks.

#### Arguments
1. `options` *(SuiteOptions)*: Options object to overwrite cloned options.

#### Returns
*(Suite)*: The new suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="cloneoptions"><code>clone([options])</code></h3>

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

<h3 id="compareother"><code>compare(other)</code></h3>

Determines if a benchmark is faster than another.

#### Arguments
1. `other` *(Benchmark)*: The benchmark to compare.

#### Returns
*(number)*: Returns `-1` if slower, `1` if faster, and `0` if indeterminate.

---

<!-- /div -->

<!-- div -->

<h3 id="constructordoc"><code>constructor(doc)</code></h3>



#### Arguments
1. `doc` *(Document)*:

---

<!-- /div -->

<!-- div -->

<h3 id="createcompiledbench-decompilable-deferred-body-timer"><code>createCompiled(bench, decompilable, deferred, body, timer)</code></h3>

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

<h3 id="filtercallback"><code>filter(callback)</code></h3>

An `Array#filter` like method.

#### Arguments
1. `callback` *(Function|string)*: The function/alias called per iteration.

#### Returns
*(Object)*: A new suite of benchmarks that passed callback filter.

---

<!-- /div -->

<!-- div -->

<h3 id="getnextevent"><code>getNext([event])</code></h3>

Fetches the next bench or executes `onComplete` callback.

#### Arguments
1. `[event]` *(Event)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getscorexa-sampleb"><code>getScore(xA, sampleB)</code></h3>



#### Arguments
1. `xA` *(number)*:
2. `sampleB` ():

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getusamplea-sampleb"><code>getU(sampleA, sampleB)</code></h3>



#### Arguments
1. `sampleA` ():
2. `sampleB` ():

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="getzu"><code>getZ(u)</code></h3>



#### Arguments
1. `u` *(number)*:

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="indexofbench"><code>indexOf(bench)</code></h3>



#### Arguments
1. `bench` *(Benchmark)*: <br>
<br>

#### Returns
*(number)*:

---

<!-- /div -->

<!-- div -->

<h3 id="interpolatestring"><code>interpolate(string)</code></h3>

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

Returns an array of event listeners for a given type that can be manipulated to add or remove listeners.

#### Arguments
1. `type` *(string)*: The event type.

#### Returns
*(&#42;)*: The listeners array.

---

<!-- /div -->

<!-- div -->

<h3 id="offtype-listener"><code>off([type], [listener])</code></h3>

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

Resets all benchmarks in the suite.

#### Returns
*(Object)*: The suite instance.

---

<!-- /div -->

<!-- div -->

<h3 id="reset"><code>reset()</code></h3>

Reset properties and abort if running.

#### Returns
*(Object)*: The benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="reverse"><code>reverse()</code></h3>

Reverse the benchmarks order

#### Returns
*(Suite)*:

---

<!-- /div -->

<!-- div -->

<h3 id="runoptions"><code>run([options={}])</code></h3>

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

<h3 id="runoptions"><code>run([options={}])</code></h3>

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

<h3 id="runscriptcode"><code>runScript(code)</code></h3>

Runs a snippet of JavaScript via script injection.

#### Arguments
1. `code` *(string)*: The code to run.

---

<!-- /div -->

<!-- div -->

<h3 id="setoptionsoptions"><code>setOptions([options={}])</code></h3>

A helper function for setting options/event handlers.

#### Arguments
1. `[options={}]` *(Object)*: Options object.

---

<!-- /div -->

<!-- div -->

<h3 id="shift"><code>shift()</code></h3>

Removes the first benchmark from the benchmarks array and returns it

#### Returns
*(Benchmark|undefined)*:

---

<!-- /div -->

<!-- div -->

<h3 id="staticchangecontexthighestdefaulttimeroptions"><code>static changeContext({ highestDefaultTimer(options)</code></h3>



#### Arguments
1. `options` *(Object)*:
2. `[options.highestDefaultTimer]` ():
3. `[options.usTimer]` (): A high-precision timer such as the one provided by microtime
4. `[options.allowHrtime]` *(boolean)*: If process.hrtime is available, controls whether it is used.

---

<!-- /div -->

<!-- div -->

<h3 id="staticdefaultvalues"><code>static defaultValues()</code></h3>

The default values for Benchmark instance properties

#### Returns
*(Object)*:

---

<!-- /div -->

<!-- div -->

<h3 id="staticfilterarrayarray-callback"><code>static filter(array(array, callback)</code></h3>

A generic `Array#filter` like method.

#### Arguments
1. `array` *(Benchmark&#91;&#93;|Suite)*: The array to iterate over.
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

Invokes a method on all items in an array.

#### Arguments
1. `benches` *(Benchmark&#91;&#93;|Suite)*: Array of benchmarks to iterate over.
2. `maybeName` *(JsdocTypeObject|string)*: The name of the method to invoke OR options object.
3. `[args]` *(...JsdocTypeAny)*: Arguments to invoke the method with.

#### Returns
*(&#42;)*: A new array of values returned from each method invoked.

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

Displays relevant benchmark information when coerced to a string.

#### Returns
*(string)*: A string representation of the benchmark instance.

---

<!-- /div -->

<!-- div -->

<h3 id="updateevent"><code>update(event)</code></h3>

Updates the clone/original benchmarks to keep their data in sync.

#### Arguments
1. `event` *(Event)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

<h3 id="benchmarkprototypesupport"><code>Benchmark.prototype.Support</code></h3>

A class used to flag environments/features.

---

<!-- /div -->

<!-- div -->

<h3 id="compiled"><code>compiled</code></h3>



---

<!-- /div -->

<!-- div -->

<h3 id="error"><code>error</code></h3>

The error object if the test failed.

---

<!-- /div -->

<!-- div -->

<h3 id="events"><code>events</code></h3>

(Object<string, Function[]>): Registered events for the event target

---

<!-- /div -->

<!-- div -->

<h3 id="fn"><code>fn</code></h3>

(Function, string, undefined): The test to benchmark.

---

<!-- /div -->

<!-- div -->

<h3 id="hz"><code>hz</code></h3>

(number): The number of executions per second.

---

<!-- /div -->

<!-- div -->

<h3 id="initcount"><code>initCount</code></h3>

(number): The default number of times to execute a test on a benchmark's first cycle.

---

<!-- /div -->

<!-- div -->

<h3 id="maxtime"><code>maxTime</code></h3>

(number): The maximum time a benchmark is allowed to run before finishing *(secs)*. Note: Cycle delays aren't counted toward the maximum time.

---

<!-- /div -->

<!-- div -->

<h3 id="minsamples"><code>minSamples</code></h3>

(number): The minimum sample size required to perform statistical analysis.

---

<!-- /div -->

<!-- div -->

<h3 id="mintime"><code>minTime</code></h3>

(number): The time needed to reduce the percent uncertainty of measurement to `1`% *(secs)*.

---

<!-- /div -->

<!-- div -->

<h3 id="result"><code>result</code></h3>



---

<!-- /div -->

<!-- div -->

<h3 id="running"><code>running</code></h3>

(boolean): A flag to indicate if the benchmark is running.

---

<!-- /div -->

<!-- div -->

<h3 id="setup"><code>setup</code></h3>

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

<h3 id="staticanchor"><code>static anchor</code></h3>



---

<!-- /div -->

<!-- div -->

<h3 id="staticcalledby"><code>static calledBy</code></h3>

({abort?: true, abortSuite?: true, reset?: true, resetSuite?: true}): Used to avoid infinite recursion when methods call each other.

---

<!-- /div -->

<!-- div -->

<h3 id="target"><code>target</code></h3>

(EventTarget, undefined): The object to which the event was originally emitted.

---

<!-- /div -->

<!-- div -->

<h3 id="teardown"><code>teardown</code></h3>

(Function, string): Compiled into the test and executed immediately **after** the test loop.

---

<!-- /div -->

<!-- div -->

<h3 id="templatedata"><code>templateData</code></h3>



---

<!-- /div -->

<!-- div -->

<h3 id="timers"><code>timers</code></h3>



---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #methods "Jump back to the TOC."
