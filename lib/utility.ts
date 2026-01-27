/*!
 * Benchmark.js
 * Copyright 2026 SignpostMarv
 * Copyright 2010-2016 Mathias Bynens
 * Based on JSLitmus.js, copyright Robert Kieffer
 * Modified by John-David Dalton
 * Available under MIT license
 */

import {
  Benchmark,
  ClonedBenchmark,
  RunOptions,
} from './Benchmark.ts';

import BrowserHelper from './BrowserHelper.ts';

import {
  Deferred,
  DeferredWithTeardown,
} from './Deferred.ts';

import {
  Event,
  EventWithTarget,
} from './Events.ts';
import { SuiteRunOptions } from './Suite.ts';

import Support from './Support.ts';
import Timer from './Timer.ts';


/** Used to avoid hz of Infinity. */
const divisors = Object.freeze({
  1: 4096,
  2: 512,
  3: 64,
  4: 8,
  5: 0,
});

/*--------------------------------------------------------------------------*/

/**
 * no need to reference noop()
 *
 * @private
 */
function noop() {
  /** empty */
}

function has<T extends unknown | {[key: string]: unknown} | Function>(maybe: T, prop: string | keyof T): prop is keyof T;
function has<T extends unknown | {[key: string]: unknown} | Function>(maybe: T, prop: string | keyof T): maybe is (
  & T
  & {[prop]: T[typeof prop & keyof T]}
) {
  const canHaveProps = maybe && (typeof maybe === 'object' || typeof maybe === 'function');

  return canHaveProps && maybe.hasOwnProperty(prop);
}

function getResult(regex: RegExp, str: string): string {
  const match = regex.exec(str);

  if (!match) {
    return '';
  }

  return match[1];
}

/*------------------------------------------------------------------------*/

/**
 * A specialized version of lodash's `cloneDeep` which only clones arrays and plain
 * objects assigning all other values by reference.
 *
 * @private
 * @param {unknown} value The value to clone.
 * @returns {unknown} The cloned value.
 */
function cloneDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return [...value] as T;
  } else if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, value]) => [key, cloneDeep(value)]),
    ) as T;
  }

  return value;
};

/**
 * Creates a function from the given arguments string and body.
 *
 * @private
 * @param {string} args The comma separated function arguments.
 * @param {string} body The function body.
 * @returns {Function} The new function.
 */
const createFunction = ((): Function => {
  const helper = Support.browser;
  if (helper) {
    return function (args: string, body: string) {
      var result,
          anchor = Benchmark.anchor,
          prop = BrowserHelper.uid + 'createFunction';

      helper.runScript('Benchmark.anchor.' + prop + '=function(' + args + '){' + body + '}');
      result = anchor[prop];
      delete anchor[prop];
      return result;
    };
  }

  return Function;
})();

/**
 * Gets the name of the first argument from a function's source.
 *
 * @private
 * @param {Function&{toString:() => string}} fn The function.
 * @returns {string} The argument name.
 */
function getFirstArgument(fn: Function & { toString: () => string; }): string {
  return (
    !has(fn, 'toString') &&
    (
      /^[\s(]*function[^(]*\(([^\s,)]+)/.exec(fn.toString()) ||
      []
    )[1]
  ) || '';
}

/**
 * Computes the arithmetic mean of a sample.
 *
 * @private
 * @param {number[]} sample The sample.
 * @returns {number} The mean.
 */
function getMean(sample: number[]): number {
  return sample.reduce((sum, x) => sum + x, 0) / sample.length;
}

/**
 * Gets the source code of a function.
 *
 * @private
 * @param {Function|string|{toString(): string}} fn The function.
 * @returns {string} The function's source code.
 */
function getSource(fn: Function | string | { toString(): string; }): string {
  var result = '';
  if (isStringable(fn)) {
    result = String(fn);
  } else {
    // Escape the `{` for Firefox 1.
    result = getResult(/^[^{]+\{([\s\S]*)\}\s*$/, fn.toString());
  }
  // Trim string.
  result = (result || '').replace(/^\s+|\s+$/g, '');

  // Detect strings containing only the "use strict" directive.
  return /^(?:\/\*+[\w\W]*?\*\/|\/\/.*?[\n\r\u2028\u2029]|\s)*(["'])use strict\1;?$/.test(result)
    ? ''
    : result;
}

/**
 * Host objects can return type values that are different from their actual
 * data type. The objects we are concerned with usually return non-primitive
 * types of "object", "function", or "unknown".
 *
 * @private
 * @param {*} object The owner of the property.
 * @param {string} property The property to check.
 * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
 */
function isHostType(object: any, property: string): boolean {
  if (object == null) {
    return false;
  }
  var type = typeof object[property];

  /** Used to detect primitive types. */
  const rePrimitive = /^(?:boolean|number|string|undefined)$/;

  return !rePrimitive.test(type) && (type != 'object' || !!object[property]);
}

/**
 * Checks if a value can be safely coerced to a string.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the value can be coerced, else `false`.
 */
function isStringable(value: any): boolean {
  if (null === value) {
    return false;
  }

  return (typeof value === 'string') || (has(value, 'toString') && (typeof value.toString === 'function'));
}

/*------------------------------------------------------------------------*/

/** @type {Object<string, string>} */
const templateData: { [s: string]: string; } = {};

/**
 * Clocks the time taken to execute a test per cycle (secs).
 *
 * @private
 * @param {Benchmark|Deferred} clone The benchmark instance.
 * @param {Timer} timer
 * @returns {number} The time taken.
 */
function clock(clone: ClonedBenchmark | Deferred, timer: Timer): number {
  var deferred: Deferred | undefined;

  if (clone instanceof Deferred) {
    deferred = clone;
    clone = deferred.benchmark;
  }
  var bench = clone._original,
      stringable = isStringable(bench.fn),
      count = bench.count = clone.count,
      decompilable = (
        stringable ||
        (
            clone.setup !== noop ||
            clone.teardown !== noop
        )
      ),
      id = bench.id,
      name = bench.name || (typeof id == 'number' ? '<Test #' + id + '>' : id),
      result = 0;

  // Init `minTime` if needed.
  clone.minTime = bench.minTime || (bench.minTime = bench.options.minTime = Benchmark.options.minTime);

  // Compile in setup/teardown functions and the test loop.
  // Create a new compiled test, instead of using the cached `bench.compiled`,
  // to avoid potential engine optimizations enabled over the life of the test.
  var funcBody = deferred
    ? 'var d#=this,${fnArg}=d#,m#=d#.benchmark._original,f#=m#.fn,su#=m#.setup,td#=m#.teardown;' +
      // When `deferred.cycles` is `0` then...
      'if(!d#.cycles){' +
      // set `deferred.fn`,
      'd#.fn=function(){var ${fnArg}=d#;if(typeof f#=="function"){try{${fn}\n}catch(e#){f#(d#)}}else{${fn}\n}};' +
      // set `deferred.teardown`,
      'd#.teardown=function(){d#.cycles=0;if(typeof td#=="function"){try{${teardown}\n}catch(e#){td#()}}else{${teardown}\n}};' +
      // execute the benchmark's `setup`,
      'if(typeof su#=="function"){try{${setup}\n}catch(e#){su#()}}else{${setup}\n};' +
      // start timer,
      't#.start(d#);' +
      // and then execute `deferred.fn` and return a dummy object.
      '}d#.fn();return{uid:"${uid}"}'

    : 'var r#,s#,m#=this,f#=m#.fn,i#=m#.count,n#=t#.ns;${setup}\n${begin};' +
      'while(i#--){${fn}\n}${end};${teardown}\nreturn{elapsed:r#,uid:"${uid}"}';

  /** @type {Function|null} */
  var compiled: Function | null | boolean = bench.compiled = clone.compiled = createCompiled(
      bench,
      decompilable,
      !!deferred,
      funcBody,
      timer
    ),
      isEmpty = !(templateData.fn || stringable);

  try {
    if (isEmpty) {
      // Firefox may remove dead code from `Function#toString` results.
      // For more information see https://bugzilla.mozilla.org/show_bug.cgi?id=536085.
      throw new Error('The test "' + name + '" is empty. This may be the result of dead code removal.');
    }
    else if (!deferred) {
      // Pretest to determine if compiled code exits early, usually by a
      // rogue `return` statement, by checking for a return object with the uid.
      bench.count = 1;
      compiled = decompilable && (compiled.call(bench, globalThis, timer) || {}).uid == templateData.uid && compiled;
      bench.count = count;
    }
  } catch(e) {
    compiled = null;
    clone.error = e || new Error(String(e));
    bench.count = count;
  }
  // Fallback when a test exits early or errors during pretest.
  if (!compiled && !deferred && !isEmpty) {
    funcBody = (
      stringable || (decompilable && !clone.error)
        ? 'function f#(){${fn}\n}var r#,s#,m#=this,i#=m#.count'
        : 'var r#,s#,m#=this,f#=m#.fn,i#=m#.count'
      ) +
      ',n#=t#.ns;${setup}\n${begin};m#.f#=f#;while(i#--){m#.f#()}${end};' +
      'delete m#.f#;${teardown}\nreturn{elapsed:r#}';

    compiled = createCompiled(
      bench,
      decompilable,
      !!deferred,
      funcBody,
      timer,
    );

    try {
      // Pretest one more time to check for errors.
      bench.count = 1;
      compiled.call(bench, globalThis, timer);
      bench.count = count;
      delete clone.error;
    }
    catch(e) {
      bench.count = count;
      if (!clone.error) {
        clone.error = e || new Error(String(e));
      }
    }
  }
  // If no errors run the full test loop.
  if (!clone.error) {
    compiled = bench.compiled = clone.compiled = createCompiled(
      bench,
      decompilable,
      !!deferred,
      funcBody,
      timer,
    );
    result = compiled.call(deferred || bench, globalThis, timer).elapsed;
  }

  return result;
}

/** Used to make every compiled test unique. */
var uidCounter = 0;

/*----------------------------------------------------------------------*/

/**
 * Creates a compiled function from the given function `body`.
 *
 * @param {Benchmark} bench
 * @param {boolean} decompilable
 * @param {boolean} deferred
 * @param {string} body
 * @param {Timer} timer
 *
 * @returns {Function}
 */
function createCompiled(
  bench: Benchmark,
  decompilable: boolean,
  deferred: boolean,
  body: string,
  timer: Timer,
): Function {
  var fn = bench.fn,
      fnArg = deferred ? getFirstArgument(fn as Function) || 'deferred' : '';

  templateData.uid = BrowserHelper.uid + uidCounter++;

  Object.assign(templateData, {
    'setup': decompilable ? getSource(bench.setup) : interpolate('m#.setup()'),
    'fn': decompilable ? getSource(fn as Function) : interpolate('m#.fn(' + fnArg + ')'),
    'fnArg': fnArg,
    'teardown': decompilable ? getSource(bench.teardown) : interpolate('m#.teardown()')
  });

  // Use API of chosen timer.
  if (timer.unit == 'ns') {
    Object.assign(templateData, {
      'begin': interpolate('s#=n#()'),
      'end': interpolate('r#=n#(s#);r#=r#[0]+(r#[1]/1e9)')
    });
  }
  else if (timer.unit == 'us') {
    if ('stop' in timer.ns) {
      Object.assign(templateData, {
        'begin': interpolate('s#=n#.start()'),
        'end': interpolate('r#=n#.microseconds()/1e6')
      });
    } else {
      Object.assign(templateData, {
        'begin': interpolate('s#=n#()'),
        'end': interpolate('r#=(n#()-s#)/1e6')
      });
    }
  }
  else if ('now' in timer.ns) {
    Object.assign(templateData, {
      'begin': interpolate('s#=(+n#.now())'),
      'end': interpolate('r#=((+n#.now())-s#)/1e3')
    });
  }
  else {
    Object.assign(templateData, {
      'begin': interpolate('s#=new n#().getTime()'),
      'end': interpolate('r#=(new n#().getTime()-s#)/1e3')
    });
  }

  // Create compiled test.
  return createFunction(
    interpolate('window,t#'),
    'var global = window, clearTimeout = global.clearTimeout, setTimeout = global.setTimeout;\n' +
    interpolate(body)
  );
}

/*----------------------------------------------------------------------*/

/**
 * Interpolates a given template string.
 *
 * @param {string} string
 *
 * @returns {string}
 */
function interpolate(string: string): string {
  /**
   * @param {TemplateStringsArray} _
   * @param {string} string
   *
   * @returns {string}
   */
  function tagged(_: TemplateStringsArray, string: string): string {
    let result = string;

    for (const [key, value] of Object.entries(templateData)) {
      result = result.replaceAll(`\${${key}}`, value);
    }

    return result;
  }

  // Replaces all occurrences of `#` with a unique number and template tokens with content.
  return tagged`${string.replace(/\#/g, (/\d+/.exec(templateData.uid) || '').toString())}`;
}

/*--------------------------------------------------------------------------*/

/**
 * Cycles a benchmark until a run `count` can be established.
 *
 * @private
 * @param {ClonedBenchmark|Deferred} obj The cloned benchmark instance.
 * @param {RunOptions} options The options object.
 */
function cycle(obj: ClonedBenchmark | Deferred | DeferredWithTeardown, options: (
  & Omit<RunOptions, 'timer'>
  & Required<Pick<RunOptions, 'timer'>>
)) {
  const {timer} = options;

  var deferred;

  let clone: ClonedBenchmark;

  if (Deferred.isA(obj)) {
    deferred = obj;
    clone = obj.benchmark;
  } else {
    clone = obj;
  }

  var clocked: number = 0,
      cycles: number,
      event: Event<typeof clone>,
      minTime: Benchmark['minTime'] = 0,
      period: number,
      async = !!options.async,
      bench = clone._original,
      count = clone.count,
      times = clone.times;

  // Continue, if not aborted between cycles.
  if (clone.running) {
    // `minTime` is set to `Benchmark.options.minTime` in `clock()`.
    cycles = ++clone.cycles;
    clocked = deferred ? deferred.elapsed : clock(clone, timer);
    minTime = clone.minTime;

    if (cycles > bench.cycles) {
      bench.cycles = cycles;
    }
    if (clone.error) {
      event = new Event('error');
      event.message = clone.error;
      clone.emit(event);
      if (!event.cancelled) {
        clone.abort();
      }
    }
  }
  // Continue, if not errored.
  if (clone.running) {
    // Compute the time taken to complete last test cycle.
    bench.times.cycle = times.cycle = clocked;
    // Compute the seconds per operation.
    period = bench.times.period = times.period = clocked / count;
    // Compute the ops per second.
    bench.hz = clone.hz = 1 / period;
    // Avoid working our way up to this next time.
    bench.initCount = clone.initCount = count;
    // Do we need to do another cycle?
    clone.running = clocked < minTime;

    if (clone.running) {
      function has_divisor(maybe: number): maybe is keyof typeof divisors {
        return maybe in divisors;
      }

      // Tests may clock at `0` when `initCount` is a small number,
      // to avoid that we set its count to something a bit higher.
      if (!clocked && has_divisor(clone.cycles)) {
        count = Math.floor(4e6 / divisors[clone.cycles]);
      }
      // Calculate how many more iterations it will take to achieve the `minTime`.
      if (count <= clone.count) {
        count += Math.ceil((minTime - clocked) / period);
      }
      clone.running = count != Infinity;
    }
  }
  // Should we exit early?
  event = new Event<typeof clone>('cycle');
  clone.emit(event);
  if (event.aborted) {
    clone.abort();
  }
  // Figure out what to do next.
  if (clone.running) {
    // Start a new cycle.
    clone.count = count;
    if (deferred) {
      clone.compiled?.call(deferred, globalThis, timer);
    } else if (async) {
      clone.delayFn(function() { cycle(clone, options); });
    } else {
      cycle(clone, {timer});
    }
  }
  else {
    // Fix TraceMonkey bug associated with clock fallbacks.
    // For more information see https://bugzilla.mozilla.org/show_bug.cgi?id=509069.
    if (Support.browser) {
      Support.browser.runScript(BrowserHelper.uid + '=1;delete ' + BrowserHelper.uid);
    }
    // We're done.
    clone.emit(new Event<ClonedBenchmark>('complete'));
  }
}

export {
  clock,
  cloneDeep,
  createFunction,
  cycle,
  getMean,
  has,
  interpolate,
  isHostType,
  noop,
}
