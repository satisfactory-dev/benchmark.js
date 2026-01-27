/*!
 * Benchmark.js
 * Copyright 2026 SignpostMarv
 * Copyright 2010-2016 Mathias Bynens
 * Based on JSLitmus.js, copyright Robert Kieffer
 * Modified by John-David Dalton
 * Available under MIT license
 */

import version from './version.json' with {type: 'json'};

import BrowserHelper from './lib/BrowserHelper.ts';

/** Used to assign each benchmark an incremented id. */
var counter = 0;

/** Used to detect primitive types. */
var rePrimitive = /^(?:boolean|number|string|undefined)$/;

/** Used to make every compiled test unique. */
var uidCounter = 0;

/** Used to avoid hz of Infinity. */
const divisors = Object.freeze({
  1: 4096,
  2: 512,
  3: 64,
  4: 8,
  5: 0,
});

/**
 * T-Distribution two-tailed critical values for 95% confidence.
 * For more info see http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm.
 */
const tTable = Object.freeze({
  '1':  12.706, '2':  4.303, '3':  3.182, '4':  2.776, '5':  2.571, '6':  2.447,
  '7':  2.365,  '8':  2.306, '9':  2.262, '10': 2.228, '11': 2.201, '12': 2.179,
  '13': 2.16,   '14': 2.145, '15': 2.131, '16': 2.12,  '17': 2.11,  '18': 2.101,
  '19': 2.093,  '20': 2.086, '21': 2.08,  '22': 2.074, '23': 2.069, '24': 2.064,
  '25': 2.06,   '26': 2.056, '27': 2.052, '28': 2.048, '29': 2.045, '30': 2.042,
  'infinity': 1.96
});

/**
 * Critical Mann-Whitney U-values for 95% confidence.
 * For more info see http://www.saburchill.com/IBbiology/stats/003.html.
 */
const uTable = Object.freeze({
  '5':  [0, 1, 2],
  '6':  [1, 2, 3, 5],
  '7':  [1, 3, 5, 6, 8],
  '8':  [2, 4, 6, 8, 10, 13],
  '9':  [2, 4, 7, 10, 12, 15, 17],
  '10': [3, 5, 8, 11, 14, 17, 20, 23],
  '11': [3, 6, 9, 13, 16, 19, 23, 26, 30],
  '12': [4, 7, 11, 14, 18, 22, 26, 29, 33, 37],
  '13': [4, 8, 12, 16, 20, 24, 28, 33, 37, 41, 45],
  '14': [5, 9, 13, 17, 22, 26, 31, 36, 40, 45, 50, 55],
  '15': [5, 10, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64],
  '16': [6, 11, 15, 21, 26, 31, 37, 42, 47, 53, 59, 64, 70, 75],
  '17': [6, 11, 17, 22, 28, 34, 39, 45, 51, 57, 63, 67, 75, 81, 87],
  '18': [7, 12, 18, 24, 30, 36, 42, 48, 55, 61, 67, 74, 80, 86, 93, 99],
  '19': [7, 13, 19, 25, 32, 38, 45, 52, 58, 65, 72, 78, 85, 92, 99, 106, 113],
  '20': [8, 14, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 98, 105, 112, 119, 127],
  '21': [8, 15, 22, 29, 36, 43, 50, 58, 65, 73, 80, 88, 96, 103, 111, 119, 126, 134, 142],
  '22': [9, 16, 23, 30, 38, 45, 53, 61, 69, 77, 85, 93, 101, 109, 117, 125, 133, 141, 150, 158],
  '23': [9, 17, 24, 32, 40, 48, 56, 64, 73, 81, 89, 98, 106, 115, 123, 132, 140, 149, 157, 166, 175],
  '24': [10, 17, 25, 33, 42, 50, 59, 67, 76, 85, 94, 102, 111, 120, 129, 138, 147, 156, 165, 174, 183, 192],
  '25': [10, 18, 27, 35, 44, 53, 62, 71, 80, 89, 98, 107, 117, 126, 135, 145, 154, 163, 173, 182, 192, 201, 211],
  '26': [11, 19, 28, 37, 46, 55, 64, 74, 83, 93, 102, 112, 122, 132, 141, 151, 161, 171, 181, 191, 200, 210, 220, 230],
  '27': [11, 20, 29, 38, 48, 57, 67, 77, 87, 97, 107, 118, 125, 138, 147, 158, 168, 178, 188, 199, 209, 219, 230, 240, 250],
  '28': [12, 21, 30, 40, 50, 60, 70, 80, 90, 101, 111, 122, 132, 143, 154, 164, 175, 186, 196, 207, 218, 228, 239, 250, 261, 272],
  '29': [13, 22, 32, 42, 52, 62, 73, 83, 94, 105, 116, 127, 138, 149, 160, 171, 182, 193, 204, 215, 226, 238, 249, 260, 271, 282, 294],
  '30': [13, 23, 33, 43, 54, 65, 76, 87, 98, 109, 120, 131, 143, 154, 166, 177, 189, 200, 212, 223, 235, 247, 258, 270, 282, 293, 305, 317]
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

/** Detect DOM document object. */
var doc = isHostType(globalThis, 'document') && globalThis.document;

/** Used to access Node.js's high resolution timer. */
var processObject = isHostType(globalThis, 'process') && globalThis.process;

/**
 * Used to avoid infinite recursion when methods call each other.
 *
 * @type {{abort?: true, abortSuite?: true, reset?: true, resetSuite?: true}}
 */
const calledBy: { abort?: true; abortSuite?: true; reset?: true; resetSuite?: true; } = {};

/**
 * A class used to flag environments/features.
 *
 * @memberOf Benchmark
 */
class Support {
  static #browser: BrowserHelper | false | undefined;

  /**
   * Detect if running in a browser environment.
   */
  static get browser(): BrowserHelper | false {
    if (this.#browser == undefined) {
      if(doc && isHostType(globalThis, 'navigator')) {
        this.#browser = new BrowserHelper(doc);
      } else {
        this.#browser = false;
      }
    }

    return this.#browser;
  }
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

type NsStartStop = {
  stop(): unknown,
  start(): unknown,
  microseconds(): number,
};
type NsNow = {
  now(): number,
};

class Timer<
  Unit extends 'ms' | 'us' | 'ns' = 'ms' | 'us' | 'ns',
> {
  /**
   * The timer namespace object or constructor.
   */
  readonly ns: {
    us: (
      | NsStartStop
      | (() => number)
    ),
    ns: (() => [number, number]),
    ms: (
      | NsNow
      | DateConstructor
    )
  }[Unit];

  #start: ((deferred: Deferred) => unknown) | null = null;

  /**
   * Starts the deferred timer.
   */
  get start(): ((deferred: Deferred) => unknown) {
    if (null === this.#start) {
      this.#start = createFunction(
        interpolate('o#'),
        interpolate('var n#=this.ns,${begin};o#.elapsed=0;o#.timeStamp=s#')
      );
    }

    return this.#start as ((deferred: Deferred) => unknown);
  }

  #stop: ((deferred: Deferred) => unknown) | null = null;

  /**
   * Stops the deferred timer.
   */
  get stop(): (deferred: Deferred) => unknown {
    if (null === this.#stop) {
      this.#stop = createFunction(
        interpolate('o#'),
        interpolate('var n#=this.ns,s#=o#.timeStamp,${end};o#.elapsed=r#')
      );
    }

    return this.#stop as (deferred: Deferred) => unknown;
  }

  readonly res: number;

  readonly unit: Unit;

  constructor (
    ns: Timer<Unit>['ns'],
    res: Timer['res'],
    unit: Unit,
  ) {
    this.ns = ns;
    this.res = res;
    this.unit = unit;
  }

  static #timer: Timer | undefined;

  static #highestDefaultTimer: { now(): number; } = performance;

  /**
   * A high-precision timer such as the one provided by microtime
   *
   * @type {{now(): number}|undefined}
   */
  static #usTimer: { now(): number; } | undefined;

  static #allowHrtime = true;

  /**
   * @param {Object} options
   * @param {{now(): number}} [options.highestDefaultTimer]
   * @param {{now(): number}} [options.usTimer] A high-precision timer such as the one provided by microtime
   * @param {boolean} [options.allowHrtime] If process.hrtime is available, controls whether it is used.
   */
  static changeContext({
    highestDefaultTimer = performance,
    usTimer = undefined,
    allowHrtime = true,
  }: { highestDefaultTimer?: { now(): number; }; usTimer?: { now(): number; }; allowHrtime?: boolean; } = {}) {
    this.#timer = undefined;
    this.#highestDefaultTimer = highestDefaultTimer;
    this.#usTimer = usTimer;
    this.#allowHrtime = allowHrtime;
  }

  static #isUs(
    unit: 'us' | 'ns' | 'ms',
    ns: Timer<typeof unit>['ns'],
  ): ns is Timer<'us'>['ns'];
  static #isUs(
    unit: 'us' | 'ns' | 'ms',
    ns: Timer<typeof unit>['ns'],
  ): unit is 'us' {
    return unit === 'us';
  }

  static #isNs(
    unit: 'us' | 'ns' | 'ms',
    ns: Timer<typeof unit>['ns'],
  ): ns is Timer<'ns'>['ns'];
  static #isNs(
    unit: 'us' | 'ns' | 'ms',
    ns: Timer<typeof unit>['ns'],
  ): unit is 'ns' {
    return unit === 'ns';
  }

  static #isNsDate(
    ns: Timer<'ms'>['ns']
  ): ns is DateConstructor {
    return !('now' in ns);
  }

  /**
   * Gets the current timer's minimum resolution (secs).
   */
  static #getRes<T extends Timer['unit']>(unit: T, ns: Timer<T>['ns']): number {
    var measured,
        begin,
        count = 30,
        divisor = 1e3,
        sample = [];

    // Get average smallest measurable time.
    while (count--) {
      if (this.#isUs(unit, ns)) {
        divisor = 1e6;
        if ('stop' in ns) {
          ns.start();
          while (!(measured = ns.microseconds())) {}
        } else {
          begin = ns();
          while (!(measured = ns() - begin)) {}
        }
      }
      else if (this.#isNs(unit, ns)) {
        divisor = 1e9;
        begin = (begin = ns())[0] + (begin[1] / divisor);
        while (!(measured = ((measured = ns())[0] + (measured[1] / divisor)) - begin)) {}
        divisor = 1;
      }
      else if (!this.#isNsDate(ns)) {
        begin = (+ns.now());
        while (!(measured = (+ns.now()) - begin)) {}
      }
      else {
        begin = new ns().getTime();
        while (!(measured = new ns().getTime() - begin)) {}
      }
      // Check for broken timers.
      if (measured > 0) {
        sample.push(measured);
      } else {
        sample.push(Infinity);
        break;
      }
    }
    // Convert to seconds.
    return getMean(sample) / divisor;
  }

  /**
   * Timer object used by `clock()` and `Deferred#resolve`.
   *
   * @returns {Timer}
   */
  static get timer(): Timer {
    if (undefined === this.#timer) {
      /** @type {[Timer, ...Timer[]]} */
      const timers: [Timer, ...Timer[]] = [
        new Timer(
          this.#highestDefaultTimer,
          Math.max(0.0015, this.#getRes('ms', this.#highestDefaultTimer)),
          'ms',
        ),
      ];

      // Detect Node.js's nanosecond resolution timer available in Node.js >= 0.8.
      if (
        this.#allowHrtime &&
        processObject &&
        typeof processObject.hrtime == 'function'
      ) {
        timers.push(new Timer(
          processObject.hrtime,
          this.#getRes('ns', processObject.hrtime),
          'ns',
        ));
      }
      // Detect a supplied us-scale timer
      if (this.#usTimer && typeof this.#usTimer == 'function') {
        timers.push(new Timer(
          this.#usTimer,
          this.#getRes('us', this.#usTimer),
          'us',
        ));
      }
      // Pick timer with highest resolution.
      const timer = timers.sort(({res: a}, {res: b}) => {
        return a - b;
      })[0];

      // Error if there are no working timers.
      if (timer.res == Infinity) {
        throw new Error('Benchmark.js was unable to find a working timer.');
      }

      this.#timer = timer;

      // Resolve time span required to achieve a percent uncertainty of at most 1%.
      // For more information see http://spiff.rit.edu/classes/phys273/uncert/uncert.html.
      Benchmark.options.minTime || (Benchmark.options.minTime = Math.max(timer.res / 2 / 0.01, 0.05));
    }

    return this.#timer;
  }
}

/*------------------------------------------------------------------------*/

/**
 * Abstract class handling events for both Benchmark and Suite
 */
abstract class EventTarget<
  Options extends object = object,
> {
  /**
   * Registered events for the event target
   *
   * @type {Object<string, Function[]>}
   */
  events: { [s: string]: Function[]; } = {};

  /**
   * Instance options
   */
  options: Partial<Options> = {};

  /**
   * Executes all registered listeners of the specified event type.
   *
   * @param {Event} event The event type or object.
   * @param {...*} [args] Arguments to invoke the listener with.
   * @returns {unknown} Returns the return value of the last listener executed.
   */
  emit(
    this: Benchmark,
    event: Event<this>,
  ): unknown;
  emit(
    this: ClonedBenchmark,
    event: Event<this>,
  ): unknown;
  emit(
    this: Suite,
    event: (
      | Event<this>
      | Event<Suite>
      | Event<Benchmark>
      | EventWithTarget<this | Suite | Benchmark>
    ),
  ): unknown;
  emit(
    this: Suite | Benchmark | ClonedBenchmark,
    event: (
      | Event<this | Suite | Benchmark>
      | EventWithTarget<this | Suite | Benchmark | ClonedBenchmark>
    ),
  ): unknown {
    var listeners,
        object = this,
        events = object.events,
        args = (arguments[0] = event, arguments);

    event.currentTarget || (event.currentTarget = object);
    event.target || (event.target = object);
    delete event.result;

    if (events && (listeners = has(events, event.type) && events[event.type])) {
      for (const listener of [...listeners]) {
        if ((event.result = listener.apply(object, args)) === false) {
          event.cancelled = true;
        }
        if (event.aborted) {
          break;
        }
      }
    }
    return event.result;
  }

  /**
   * Returns an array of event listeners for a given type that can be manipulated
   * to add or remove listeners.
   *
   * @param {string} type The event type.
   * @returns {Function[]} The listeners array.
   */
  listeners(type: string): Function[] {
    var object = this,
        events = object.events || (object.events = {});

    if (!events.hasOwnProperty(type)) {
      events[type] = [];
    }

    return events[type];
  }

  /**
   * Unregisters a listener for the specified event type(s),
   * or unregisters all listeners for the specified event type(s),
   * or unregisters all listeners for all event types.
   *
   * @param {string} [type] The event type.
   * @param {Function} [listener] The function to unregister.
   * @returns {Object} The current instance.
   * @example
   *
   * // unregister a listener for an event type
   * bench.off('cycle', listener);
   *
   * // unregister a listener for multiple event types
   * bench.off('start cycle', listener);
   *
   * // unregister all listeners for an event type
   * bench.off('cycle');
   *
   * // unregister all listeners for multiple event types
   * bench.off('start cycle complete');
   *
   * // unregister all listeners for all event types
   * bench.off();
   */
  off(type: string, listener: Function): object {
    var object = this,
        events = object.events;

    if (!events) {
      return object;
    }

    const loopOver = type ? (type.split(' ') as (keyof this['events'] & string)[]) : events;

    const entries = Array.isArray(loopOver)
      ? loopOver.map((value, key): [number, (keyof this['events'] & string)] => [key, value])
      : Object.entries(loopOver) as [
        (keyof this['events'] & string),
        Function[]
      ][];

    entries.forEach(function([type, listeners]) {
      var index;
      if (typeof listeners == 'string') {
        type = listeners;
        listeners = events.hasOwnProperty(type) ? events[type] : [];
      }
      if (listeners) {
        if (listener) {
          index = listeners.indexOf(listener);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        } else {
          listeners.length = 0;
        }
      }
    });
    return object;
  }

  /**
   * Registers a listener for the specified event type(s).
   *
   * @param {string} type The event type.
   * @param {Function} listener The function to register.
   * @returns {EventTarget} The current instance.
   * @example
   *
   * // register a listener for an event type
   * bench.on('cycle', listener);
   *
   * // register a listener for multiple event types
   * bench.on('start cycle', listener);
   */
  on(type: string, listener: Function): this {
    type.split(' ').forEach((type) => {
      this.listeners(type).push(listener);
    });

    return this;
  }

  /**
   * A helper function for setting options/event handlers.
   *
   * @protected
   * @param {Object} [options={}] Options object.
   */
  setOptions(options?: Partial<Options>) {
    const ctor = this.constructor as (typeof Benchmark | typeof Suite);
    options = this.options = Object.assign({}, cloneDeep(ctor.options), cloneDeep(options));

    Object.entries(options).forEach(([key, value]) => {
      if (value != null) {
        // Add event listeners.
        if (/^on[A-Z]/.test(key)) {
          key.split(' ').forEach((key) => {
            this.on(key.slice(2).toLowerCase(), value as Function);
          });
        } else if (
          !has(this, key) || (
            this instanceof Benchmark &&
            key in Benchmark.defaultValues
          )
        ) {
          this[key as keyof this] = cloneDeep(value as (typeof this)[keyof this]);
        }
      }
    });

    if (this instanceof Benchmark) {
      const _options = options as Partial<BenchmarkOptions>;
      ([
        'async',
        'defer',
        'delay',
        'id',
        'initCount',
        'maxTime',
        'minSamples',
        'minTime',
        'name',
        'events',
      ] as const).forEach((prop) => {
        if (prop in _options && undefined !== _options[prop as keyof typeof _options]) {
          this[prop as keyof typeof this]= _options[prop as keyof typeof _options] as (typeof this)[keyof typeof this];
        }
      })
    }
  }

  /**
   * Converts a Suite or Suite-like object/array to an array of values
   */
  static asArray<
    T extends (
      | Benchmark[]
      | Suite
      | (
        & {[key: number]: Benchmark}
        & {length: number}
      )
    )
  >(array: T):  Benchmark[] {
    if (Array.isArray(array)) {
      return [...array];
    } else if (array instanceof Suite) {
      return array.benchmarks;
    }

    return (Object.keys(array || Object.create(null)) as (number | 'length')[])
      .filter((maybe: number | 'length'): maybe is number => /^\d+$/.test(maybe.toString()))
      .map((key) => array[key]);
  }
}

/*------------------------------------------------------------------------*/

type InvokeOptions<
  T0 extends Suite | (Benchmark[]),
> = (
  | {
    name: string,
    onStart: (this: T0, event: Event<T0>) => unknown,
    onCycle: (
      | ((this: T0, event: EventWithTarget<Benchmark>) => unknown)
    ),
    onComplete: (
      | ((this: T0, event: EventWithTarget<Benchmark>) => unknown)
    ),
  }
);

type InvokeOptionsWithArgs<
  T0 extends Suite | (Benchmark[]),
  Args extends {[key: string]: unknown}
> = (
  & InvokeOptions<T0>
  & {
    args: Args,
    queued: boolean,
  }
);

type RunOptions = Partial<{
  timer: Timer,
  async: boolean,
  queued: boolean,
}>;

type SuiteInvokeOptions<
  Name extends string = string,
  T extends (Benchmark[]) | Suite = (Benchmark[]) | Suite,
> = (
  & {
    name: Name,
  }
  & Partial<Pick<
    SuiteOptions<T>,
    (
      | 'onAbort'
      | 'onAdd'
      | 'onReset'
      | 'onStart'
      | 'onCycle'
      | 'onError'
      | 'onComplete'
    )
  >>
);

type SuiteRunOptions<
  T extends (Benchmark[]) | Suite = (Benchmark[]) | Suite,
> = (
  & SuiteInvokeOptions<'run', T>
  & {
    args: RunOptions,
    queued: boolean,
  }
);

type BenchmarkOptions = {
  /**
   * A flag to indicate that benchmark cycles will execute asynchronously
   * by default.
   */
  async: boolean,

  /**
   * A flag to indicate that the benchmark clock is deferred.
   */
  defer: boolean,

  /**
   * The delay between test cycles (secs).
   */
  delay: 'idle' | number,

  /**
   * Displayed by `Benchmark#toString` when a `name` is not available
   * (auto-generated if absent).
   */
  id: string | undefined,

  /**
   * The default number of times to execute a test on a benchmark's first cycle.
   */
  initCount: number,

  /**
   * The maximum time a benchmark is allowed to run before finishing (secs).
   *
   * Note: Cycle delays aren't counted toward the maximum time.
   */
  maxTime: number,

  /**
   * The minimum sample size required to perform statistical analysis.
   */
  minSamples: number,

  /**
   * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
   */
  minTime: number,

  /**
   * The name of the benchmark.
   */
  name: string | undefined,

  /**
   * An event listener called when the benchmark is aborted.
   */
  onAbort: (this: Benchmark, event: Event<Benchmark, 'abort'>) => unknown,

  /**
   * An event listener called when the benchmark completes running.
   */
  onComplete: (this: Benchmark, event: Event<Benchmark, 'complete'>) => unknown,

  /**
   * An event listener called after each run cycle.
   */
  onCycle: (this: Benchmark, event: Event<Benchmark, 'cycle'>) => unknown,

  /**
   * An event listener called when a test errors.
   */
  onError: (this: Benchmark, event: Event<Benchmark, 'error'>) => unknown,

  /**
   * An event listener called when the benchmark is reset.
   */
  onReset: (this: Benchmark, event: Event<Benchmark, 'reset'>) => unknown,

  /**
   * An event listener called when the benchmark starts running.
   */
  onStart: (this: Benchmark, event: Event<Benchmark, 'start'>) => unknown,
};

type ClonedBenchmark = Benchmark & {
  _original: Benchmark;
}

type CompiledBenchmark = ClonedBenchmark & {
  compiled: Exclude<Benchmark['compiled'], undefined>,
};

class Benchmark extends EventTarget<
  BenchmarkOptions
> {
  /**
   * @type {Object<string, unknown>}
   */
  static anchor: { [s: string]: unknown; } = Object.create(null);

  /**
   * The default values for Benchmark instance properties
   *
   * @returns {Object}
   */
  static defaultValues = Object.seal({
    count: 0,
    cycles: 0,
    hz: 0,
    compiled: undefined,
    error: undefined,
    fn: undefined,
    aborted: false,
    running: false,
    setup: noop,
    teardown: noop,
    stats: {
      moe: 0,
      rme: 0,
      sem: 0,
      deviation: 0,
      mean: 0,
      sample: [] as number[],
      variance: 0,
    },
    times: {
      cycle: 0,
      elapsed: 0,
      period: 0,
      timeStamp: 0,
    },
  });

  /**
   * The default options copied by benchmark instances.
   */
  static options: (
    & Omit<
      BenchmarkOptions,
      (
        | 'name'
        | 'onAbort'
        | 'onComplete'
        | 'onCycle'
        | 'onError'
        | 'onReset'
        | 'onStart'
      )
    >
    & Partial<Pick<
      BenchmarkOptions,
      (
        | 'name'
        | 'onAbort'
        | 'onComplete'
        | 'onCycle'
        | 'onError'
        | 'onReset'
        | 'onStart'
      )
    >>
  ) = {
    async: false,
    defer: false,
    delay: 'cancelIdleCallback' in globalThis ? 'idle' as const : 0.005,
    id: undefined,
    initCount: 1,
    maxTime: 5,
    minSamples: 5,
    minTime: 0,
  };

  /**
   * Original copy of Benchmark created when cloned
   */
  _original: Benchmark | undefined;

  /**
   * A flag to indicate if the benchmark is aborted.
   */
  aborted: boolean = Benchmark.defaultValues.aborted;

  /**
   * A flag to indicate that benchmark cycles will execute asynchronously
   * by default.
   */
  async: boolean = !!Benchmark.options?.async;

  /**
   * The compiled test function.
   */
  compiled: Function | undefined = Benchmark.defaultValues.compiled;

  /**
   * The number of times a test was executed.
   */
  count: number = Benchmark.defaultValues.count;

  /**
   * The number of cycles performed while benchmarking.
   */
  cycles: number = Benchmark.defaultValues.cycles;

  /**
   * A flag to indicate that the benchmark clock is deferred.
   */
  defer: boolean = !!Benchmark.options?.defer;

  /**
   * The delay between test cycles (secs).
   */
  delay: number | 'idle' = Benchmark.options.delay || 0.005;

  /**
   * The error object if the test failed.
   *
   * @type {unknown}
   */
  error: unknown = Benchmark.defaultValues.error;

  /**
   * The test to benchmark.
   *
   * @type {Function|string|undefined}
   */
  fn: Function | string | undefined = Benchmark.defaultValues.fn;

  /**
   * The number of executions per second.
   *
   * @type {number}
   */
  hz: number = Benchmark.defaultValues.hz;

  /**
   * Displayed by `Benchmark#toString` when a `name` is not available
   * (auto-generated if absent).
   *
   * @type {string|number}
   */
  id: string | number;

  /**
   * The default number of times to execute a test on a benchmark's first cycle.
   *
   * @type {number}
   */
  initCount: number = Benchmark.options.initCount;

  /**
   * The maximum time a benchmark is allowed to run before finishing (secs).
   *
   * Note: Cycle delays aren't counted toward the maximum time.
   *
   * @type {number}
   */
  maxTime: number = Benchmark.options.maxTime;

  /**
   * The minimum sample size required to perform statistical analysis.
   *
   * @type {number}
   */
  minSamples: number = Benchmark.options.minSamples;

  /**
   * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
   *
   * @type {number}
   */
  minTime: number = Benchmark.options.minTime;

  /**
   * The name of the benchmark.
   *
   * @type {string|undefined}
   */
  name: string | undefined;

  /**
   * A flag to indicate if the benchmark is running.
   *
   * @type {boolean}
   */
  running: boolean = Benchmark.defaultValues.running;

  /**
   * Compiled into the test and executed immediately **before** the test loop.
   *
   * @type {Function|string}
   * @example
   *
   * // basic usage
   * var bench = Benchmark({
   *   'setup': function() {
   *     var c = this.count,
   *         element = document.getElementById('container');
   *     while (c--) {
   *       element.appendChild(document.createElement('div'));
   *     }
   *   },
   *   'fn': function() {
   *     element.removeChild(element.lastChild);
   *   }
   * });
   *
   * // compiles to something like:
   * var c = this.count,
   *     element = document.getElementById('container');
   * while (c--) {
   *   element.appendChild(document.createElement('div'));
   * }
   * var start = new Date;
   * while (count--) {
   *   element.removeChild(element.lastChild);
   * }
   * var end = new Date - start;
   *
   * // or using strings
   * var bench = Benchmark({
   *   'setup': '\
   *     var a = 0;\n\
   *     (function() {\n\
   *       (function() {\n\
   *         (function() {',
   *   'fn': 'a += 1;',
   *   'teardown': '\
   *          }())\n\
   *        }())\n\
   *      }())'
   * });
   *
   * // compiles to something like:
   * var a = 0;
   * (function() {
   *   (function() {
   *     (function() {
   *       var start = new Date;
   *       while (count--) {
   *         a += 1;
   *       }
   *       var end = new Date - start;
   *     }())
   *   }())
   * }())
   */
  setup: Function | string = Benchmark.defaultValues.setup;

  /**
   * An object of stats including mean, margin or error, and standard deviation.
   */
  stats = {
    /**
     * The margin of error.
     *
     * @type {number}
     */
    moe: Benchmark.defaultValues.stats.moe,

    /**
     * The relative margin of error (expressed as a percentage of the mean).
     *
     * @type {number}
     */
    rme: Benchmark.defaultValues.stats.rme,

    /**
     * The standard error of the mean.
     *
     * @type {number}
     */
    sem: Benchmark.defaultValues.stats.sem,

    /**
     * The sample standard deviation.
     *
     * @type {number}
     */
    deviation: Benchmark.defaultValues.stats.deviation,

    /**
     * The sample arithmetic mean (secs).
     *
     * @type number
     */
    mean: Benchmark.defaultValues.stats.mean,

    /**
     * The array of sampled periods.
     *
     * @type Array
     */
    sample: [...Benchmark.defaultValues.stats.sample],

    /**
     * The sample variance.
     *
     * @type number
     */
    variance: Benchmark.defaultValues.stats.variance,
  };

  /**
   * Compiled into the test and executed immediately **after** the test loop.
   *
   * @type {Function|string}
   */
  teardown: Function | string = Benchmark.defaultValues.teardown;

  /**
   * An object of timing data including cycle, elapsed, period, start, and stop.
   */
  times = {
    /**
     * The time taken to complete the last cycle (secs).
     *
     * @type number
     */
    cycle: Benchmark.defaultValues.times.cycle,

    /**
     * The time taken to complete the benchmark (secs).
     *
     * @type number
     */
    elapsed: Benchmark.defaultValues.times.elapsed,

    /**
     * The time taken to execute the test once (secs).
     *
     * @type number
     */
    period: Benchmark.defaultValues.times.period,

    /**
     * A timestamp of when the benchmark started (ms).
     *
     * @type number
     */
    timeStamp: Benchmark.defaultValues.times.timeStamp,
  };

  #timerId: number | undefined | NodeJS.Timeout;

  /**
   * The semantic version number.
   */
  static version: string = version.version;

  static get Event() {
    return Event;
  }

  static get Suite() {
    return Suite;
  }

  static get Timer() {
    return Timer;
  }

  /**
   * A generic `Array#filter` like method.
   *
   * @param {(Benchmark[])|Suite} array The array to iterate over.
   * @param {Function|string} callback The function/alias called per iteration.
   * @returns {Array} A new array of values that passed callback filter.
   * @example
   *
   * // get odd numbers
   * Benchmark.filter([1, 2, 3, 4, 5], function(n) {
   *   return n % 2;
   * }); // -> [1, 3, 5];
   *
   * // get fastest benchmarks
   * Benchmark.filter(benches, 'fastest');
   *
   * // get slowest benchmarks
   * Benchmark.filter(benches, 'slowest');
   *
   * // get benchmarks that completed without erroring
   * Benchmark.filter(benches, 'successful');
   */
  static filter(
    array: (Benchmark[]) | Suite,
    callback: ((maybe: Benchmark, index?: number | string, array?: (Benchmark[])|Suite) => boolean) | string,
  ): Array<any> {
    type callback_not_a_string = Exclude<typeof callback, string>;

    if (callback === 'successful') {
      /**
       * Callback to exclude those that are errored, unrun, or have hz of Infinity.
       *
       * @param {Benchmark} bench
       *
       * @returns {boolean}
       */
      callback = function(bench: Benchmark): boolean {
        return !!bench.cycles && Number.isFinite(bench.hz) && !bench.error;
      };
    }
    else if (callback === 'fastest' || callback === 'slowest') {
      // Get successful, sort by period + margin of error, and filter fastest/slowest.
      var result = Benchmark.filter(array, 'successful').sort(function(a, b) {
        a = a.stats; b = b.stats;
        return (a.mean + a.moe > b.mean + b.moe ? 1 : -1) * (callback === 'fastest' ? 1 : -1);
      });

      return result.filter((bench) => {
        return result[0].compare(bench) == 0;
      });
    }

    if (array instanceof Suite) {
      return array.benchmarks.filter((
        benchmark,
        index,
      ) => (callback as callback_not_a_string)(benchmark, index, array));
    }

    if (!Array.isArray(array)) {
      const {
        isArrayLike,
        result,
      } = (Object.entries(array) as [string, Benchmark][])
        .filter(([key, value]) => (callback as callback_not_a_string)(
          value,
          (typeof key === 'string' && /^\d+/.test(key))
            ? parseInt(key, 10)
            : key,
          array,
        ))
        .reduce(
          (was, [key, value]) => {
            if (typeof key === 'string' && /^\d+/.test(key)) {
              ++was.currentIndex;

              was.result[was.currentIndex] = value;
            } else {
              was.result[key] = value;
              was.isArrayLike = false;
            }

            return was;
          },
          {
            currentIndex: -1,
            result: Object.create(null),
            isArrayLike: true,
          },
        );

        return isArrayLike ? Object.values(result) : result;
    }

    return array.filter(callback as (maybe: Benchmark) => boolean);
  }

  /**
   * Converts a number to a more readable comma-separated string representation.
   *
   * @param {number} number The number to convert.
   * @returns {string} The more readable string representation.
   */
  static formatNumber(number: number|`${number}`): string {
    const parts = String(number).split('.') as [string] | [string, string];

    return parts[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') +
      (parts[1] ? '.' + parts[1] : '');
  }

  /**
   * Invokes a method on all items in an array.
   *
   * @param {(Benchmark[])|Suite} benches Array of benchmarks to iterate over.
   * @param {{name: string}|string} maybeName The name of the method to invoke OR options object.
   * @param {...*} [args] Arguments to invoke the method with.
   * @returns {Benchmark[]} A new array of values returned from each method invoked.
   * @example
   *
   * // invoke `reset` on all benchmarks
   * Benchmark.invoke(benches, 'reset');
   *
   * // invoke `emit` with arguments
   * Benchmark.invoke(benches, 'emit', 'complete', listener);
   *
   * // invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
   * Benchmark.invoke(benches, {
   *
   *   // invoke the `run` method
   *   'name': 'run',
   *
   *   // pass a single argument
   *   'args': true,
   *
   *   // treat as queue, removing benchmarks from front of `benches` until empty
   *   'queued': true,
   *
   *   // called before any benchmarks have been invoked.
   *   'onStart': onStart,
   *
   *   // called between invoking benchmarks
   *   'onCycle': onCycle,
   *
   *   // called after all benchmarks have been invoked.
   *   'onComplete': onComplete
   * });
   */
  static invoke<
    T extends (Benchmark[]) | Suite
  >(
    benches: T,
    maybeName: (
      | SuiteInvokeOptions<string, T>
      | string
    ),
  ): Benchmark[] {
    var args: unknown[],
        bench: Benchmark,
        queued: boolean,
        index: number = -1,
        eventProps: Partial<EventOptions> = { 'currentTarget': benches },
        defaultOptions: Pick<
          SuiteInvokeOptions,
          (
            | 'onStart'
            | 'onCycle'
            | 'onComplete'
          )
        > = { 'onStart': noop, 'onCycle': noop, 'onComplete': noop },
        result = this.asArray(benches);

    let name: string;

    let options: (
      & SuiteInvokeOptions<string, T>
      & Required<Pick<
        SuiteInvokeOptions<string, T>,
        (
            | 'onStart'
            | 'onCycle'
            | 'onComplete'
        )
      >>
    );

    // Juggle arguments.
    if ((typeof maybeName === 'string')) {
      // 2 arguments (array, name).
      args = Array.prototype.slice.call(arguments, 2);
      name = maybeName;
      options = {...defaultOptions, name} as typeof options;
    } else {
      // 2 arguments (array, options).
      options = Object.assign(
        {},
        defaultOptions,
        maybeName,
      ) as typeof options;
      name = options?.name || '';
      const maybeArgs = 'args' in options ? options.args : [];
      args = Array.isArray(maybeArgs) ? maybeArgs : [maybeArgs];
      queued = 'queued' in options ? !!options.queued : false;
    }

    /**
     * Invokes the method of the current object and if synchronous, fetches the next.
     */
    function execute() {
      var listeners: Function[],
          async = isAsync(bench);

      if (async) {
        // Use `getNext` as the first listener.
        bench.on('complete', getNext);
        listeners = bench.events.complete;
        listeners.splice(0, 0, listeners.pop() as Function);
      }
      // Execute method.
      result[index] = (typeof (bench ? bench[name as keyof typeof bench] : undefined) === 'function')
        ? (bench[name as keyof typeof bench] as Function).apply(bench, args)
        : undefined;
      // If synchronous return `true` until finished.
      return !async && getNext();
    }

    /**
     * Fetches the next bench or executes `onComplete` callback.
     *
     * @param {Event} [event]
     */
    function getNext(event?: Event) {
      var cycleEvent: EventWithTarget<typeof last, 'cycle'>,
          last = bench,
          async = isAsync(last);

      if (async) {
        last.off('complete', getNext);
        last.emit(new Event('complete'));
      }
      // Emit "cycle" event.
      eventProps.type = 'cycle';
      eventProps.target = last;
      cycleEvent = new Event<typeof last, 'cycle'>(
        eventProps as EventOptions<'cycle'>,
      ) as EventWithTarget<typeof last, 'cycle'>;
      options.onCycle.call((benches as Suite).benchmarks as T, cycleEvent);

      // Choose next benchmark if not exiting early.
      if (!cycleEvent.aborted && raiseIndex() !== false) {
        bench = queued
          ? (
            benches instanceof Suite
              ? benches.benchmarks
              : benches as Benchmark[]
          )[0]
          : result[index];
        if (isAsync(bench)) {
          bench.delayFn(execute);
        }
        else if (async) {
          // Resume execution if previously asynchronous but now synchronous.
          while (execute()) {}
        }
        else {
          // Continue synchronous execution.
          return true;
        }
      } else {
        // Emit "complete" event.
        eventProps.type = 'complete';
        options.onComplete.call(
          benches,
          new Event<typeof last, 'complete'>(
            eventProps as EventOptions<'complete'>
          ) as EventWithTarget<typeof last, 'complete'>,
        );
      }
      // When used as a listener `event.aborted = true` will cancel the rest of
      // the "complete" listeners because they were already called above and when
      // used as part of `getNext` the `return false` will exit the execution while-loop.
      if (event) {
        event.aborted = true;
      } else {
        return false;
      }
    }

    /**
     * Checks if invoking `Benchmark#run` with asynchronous cycles.
     */
    function isAsync(object?: Benchmark) {
      // Avoid using `instanceof` here because of IE memory leak issues with host objects.
      var async = args[0] && (args[0] as Benchmark).async;

      return (
        name == 'run' &&
        (object instanceof Benchmark) &&
        (
          (async == null ? object.options.async : async) ||
          object.defer
        )
      );
    }

    /**
     * Raises `index` to the next defined index or returns `false`.
     */
    function raiseIndex() {
      index++;

      // If queued remove the previous bench.
      if (queued && index > 0) {
        benches.shift();
      }
      // If we reached the last index then return `false`.
      const haveNotReachedLastIndex = (queued ? benches.length : index < result.length)
        ? index
        : false;

      if (false === haveNotReachedLastIndex) {
        index = 0;
      }

      return haveNotReachedLastIndex;
    }

    // Start iterating over the array.
    if (raiseIndex() !== false) {
      // Emit "start" event.

      bench = (result instanceof Suite ? result.benchmarks : result)[index];
      eventProps.type = 'start';
      eventProps.target = bench;
      options.onStart.call(
        benches,
        new Event(
          eventProps as EventOptions<'start'>
        )
      );

      // End early if the suite was aborted in an "onStart" listener.
      if (name == 'run' && (benches instanceof Suite) && benches.aborted) {
        // Emit "cycle" event.
        eventProps.type = 'cycle';
        options.onCycle.call(
          benches.benchmarks as T,
          new Event<typeof bench, 'cycle'>(
            eventProps as EventOptions<'cycle'>
          ) as EventWithTarget<typeof bench, 'cycle'>
        );
        // Emit "complete" event.
        eventProps.type = 'complete';
        options.onComplete.call(
          benches,
          new Event<typeof bench, 'complete'>(
            eventProps as EventOptions<'complete'>
          ) as EventWithTarget<typeof bench, 'complete'>,
        );
      }
      // Start method execution.
      else {
        if (isAsync(bench)) {
          bench.delayFn(execute);
        } else {
          while (execute()) {}
        }
      }
    }
    return result;
  }

  /**
   * Creates a string of joined array values or object key-value pairs.
   *
   * @param {Array|Object} object The object to operate on.
   * @param {string} [separator1] The separator used between key-value pairs.
   * @param {string} [separator2] The separator used between keys and values.
   * @returns {string} The joined result.
   */
  static join(object: Array<any> | object, separator1: string = ',', separator2: string = ': '): string {
    /** @type {string[]} */
    var result: string[] = [],
        length = (object = Object(object)).length,
        arrayLike = length === length >>> 0;

    separator2 || (separator2 = ': ');

    const entries = (
      Array.isArray(object)
        ? object.map((value, key) => [key, value])
        : Object.entries(object).filter(([key]) => has(object, key) && (!arrayLike || key !== 'length'))
    );

    entries.forEach(([key, value]) => {
      result.push(arrayLike ? value : key + separator2 + value);
    });

    return result.join(separator1 || ',');
  }

  /**
   * The Benchmark constructor.
   *
   * @param {string|object|Function} maybeName A name to identify the benchmark.
   * @param {Function|string} [fn] The test to benchmark.
   * @param {Object} [options] Options object.
   * @example
   *
   * // basic usage (the `new` operator is optional)
   * var bench = new Benchmark(fn);
   *
   * // or using a name first
   * var bench = new Benchmark('foo', fn);
   *
   * // or with options
   * var bench = new Benchmark('foo', fn, {
   *
   *   // displayed by `Benchmark#toString` if `name` is not available
   *   'id': 'xyz',
   *
   *   // called when the benchmark starts running
   *   'onStart': onStart,
   *
   *   // called after each run cycle
   *   'onCycle': onCycle,
   *
   *   // called when aborted
   *   'onAbort': onAbort,
   *
   *   // called when a test errors
   *   'onError': onError,
   *
   *   // called when reset
   *   'onReset': onReset,
   *
   *   // called when the benchmark completes running
   *   'onComplete': onComplete,
   *
   *   // compiled/called before the test loop
   *   'setup': setup,
   *
   *   // compiled/called after the test loop
   *   'teardown': teardown
   * });
   *
   * // or name and options
   * var bench = new Benchmark('foo', {
   *
   *   // a flag to indicate the benchmark is deferred
   *   'defer': true,
   *
   *   // benchmark test function
   *   'fn': function(deferred) {
   *     // call `Deferred#resolve` when the deferred test is finished
   *     deferred.resolve();
   *   }
   * });
   *
   * // or options only
   * var bench = new Benchmark({
   *
   *   // benchmark name
   *   'name': 'foo',
   *
   *   // benchmark test as a string
   *   'fn': '[1,2,3,4].sort()'
   * });
   *
   * // a test's `this` binding is set to the benchmark instance
   * var bench = new Benchmark('foo', function() {
   *   'My name is '.concat(this.name); // "My name is foo"
   * });
   */
  constructor(maybeName: Partial<BenchmarkOptions>);
  constructor(maybeName: string, fn: Function | string, options?: Partial<BenchmarkOptions>);
  constructor(maybeName: string | Partial<BenchmarkOptions> | Function, fn?: Function | string, options: Partial<BenchmarkOptions> = {}) {
    super();

    options = 'object' === typeof maybeName ? maybeName : (
      'object' === typeof fn
        ? fn
        : options
    );
    fn = 'function' === typeof maybeName ? maybeName : fn;
    const name = 'string' === typeof maybeName ? maybeName : undefined;

    this.setOptions(options);

    if (!('id' in options) || options.id === undefined) {
      this.id = ++counter;
    } else {
      this.id = options.id;
    }
    this.name = this.name || name;
    this.fn = this.fn === undefined ? fn : this.fn;

    this.stats = cloneDeep(this.stats);
    this.times = cloneDeep(this.times);
  }

  /**
   * Aborts the benchmark without recording times.
   *
   * @returns {Object} The benchmark instance.
   */
  abort(): object {
    var event: Event<typeof this, 'abort'>,
        bench = this,
        resetting = calledBy.reset;

    if (bench.running) {
      event = new Event<this, 'abort'>('abort');
      bench.emit(event);
      if (!event.cancelled || resetting) {
        // Avoid infinite recursion.
        calledBy.abort = true;
        bench.reset();
        delete calledBy.abort;

        this.#clearDelayFn();

        if (!resetting) {
          bench.aborted = true;
          bench.running = false;
        }
      }
    }
    return bench;
  }

  /**
   * Creates a new benchmark using the same test and options.
   *
   * @param {Partial<BenchmarkOptions>} [options] Options object to overwrite cloned options.
   * @returns {Benchmark} The new benchmark instance.
   * @example
   *
   * var bizarro = bench.clone({
   *   'name': 'doppelganger'
   * });
   */
  clone(options?: Partial<BenchmarkOptions>): Benchmark {
    var bench = this,
        result = new Benchmark(Object.assign({}, bench, options));

    // Correct the `options` object.
    result.options = Object.assign({}, cloneDeep(bench.options), cloneDeep(options));

    const properties = Object.keys(Benchmark.defaultValues) as (
      keyof typeof Benchmark['defaultValues'] & string
    )[];

    for (const property of properties) {
      if (undefined === result[property]) {
        const value = cloneDeep(bench[property]);
        (result[property] as Benchmark[typeof property]) = value;
      }
    }

    // Copy own custom properties.
    (Object.entries(bench)).forEach(([key, value]) => {
      if (!has(result, key)) {
        const prop = key as keyof Benchmark;
        (result[prop] as typeof result[typeof prop]) = cloneDeep(value as typeof result[typeof prop]);
      }
    });

    if (this.name !== undefined) {
      result.name = this.name;
    }

    if (Object.keys(this.events).length > 0) {
      result.events = cloneDeep(this.events);
    }

    return result;
  }

  /**
   * Determines if a benchmark is faster than another.
   *
   * @param {Benchmark} other The benchmark to compare.
   * @returns {number} Returns `-1` if slower, `1` if faster, and `0` if indeterminate.
   */
  compare(other: Benchmark): number {
    var bench = this;

    // Exit early if comparing the same benchmark.
    if (bench == other) {
      return 0;
    }
    var critical,
        zStat,
        sample1 = bench.stats.sample,
        sample2 = other.stats.sample,
        size1 = sample1.length,
        size2 = sample2.length,
        maxSize = Math.max(size1, size2),
        minSize = Math.min(size1, size2),
        u1 = getU(sample1, sample2),
        u2 = getU(sample2, sample1),
        u = Math.min(u1, u2);

    /**
     * @param {number} xA
     * @param {number[]} sampleB
     * @returns {number}
     */
    function getScore(xA: number, sampleB: number[]): number {
      return sampleB.reduce((total, xB) => {
        return total + (xB > xA ? 0 : xB < xA ? 1 : 0.5);
      }, 0);
    }

    /**
     * @param {number[]} sampleA
     * @param {number[]} sampleB
     * @returns {number}
     */
    function getU(sampleA: number[], sampleB: number[]): number {
      return sampleA.reduce((total, xA) => {
        return total + getScore(xA, sampleB);
      }, 0);
    }

    /**
     * @param {number} u
     * @returns {number}
     */
    function getZ(u: number): number {
      return (u - ((size1 * size2) / 2)) / Math.sqrt((size1 * size2 * (size1 + size2 + 1)) / 12);
    }
    // Reject the null hypothesis the two samples come from the
    // same population (i.e. have the same median) if...
    if (size1 + size2 > 30) {
      // ...the z-stat is greater than 1.96 or less than -1.96
      // http://www.statisticslectures.com/topics/mannwhitneyu/
      zStat = getZ(u);
      return Math.abs(zStat) > 1.96 ? (u == u1 ? 1 : -1) : 0;
    }
    // ...the U value is less than or equal the critical U value.
    critical = maxSize < 5 || minSize < 3 ? 0 : uTable[maxSize as unknown as keyof typeof uTable][minSize - 3];
    return u <= critical ? (u == u1 ? 1 : -1) : 0;
  }

  /**
   * Delay the execution of a function based on the benchmark's `delay` property.
   *
   * @private
   *
   * @param {Function} fn The function to execute.
   */
  delayFn(fn: Function) {
    if ('idle' === this.delay) {
      this.#timerId = requestIdleCallback(() => fn());
    } else {
      this.#timerId = setTimeout(() => fn(), this.delay * 1e3);
    }
  }

  /**
   * Clears the delayed function from being executed
   */
  #clearDelayFn() {
    if ('idle' === this.delay) {
      cancelIdleCallback(this.#timerId as number);
    } else {
      clearTimeout(this.#timerId);
    }
    this.#timerId = undefined;
  }

  /**
   * Reset properties and abort if running.
   *
   * @returns {Object} The benchmark instance.
   */
  reset(): object {
    var bench = this;
    if (bench.running && !calledBy.abort) {
      // No worries, `reset()` is called within `abort()`.
      calledBy.reset = true;
      bench.abort();
      delete calledBy.reset;
      return bench;
    }

    type QueueItem<T extends object|(unknown[]) = object|(unknown[])> = {
      destination: T,
      source: T,
    };

    type ChangeItem<
      T extends object | (unknown[]) = object | (unknown[])
    > = {
      destination: QueueItem<T>['destination'],
      key: (
        T extends unknown[]
          ? (`${number}` | number)
          : keyof T
      ),
      value: (
        T extends unknown[]
          ? QueueItem<T>['destination'][number]
          : QueueItem<T>['destination'][keyof T]
      ),
    };

    var event: Event,
        index = 0,
        changes: ChangeItem[] = [],
        queue: QueueItem[] = [];

    // A non-recursive solution to check if properties have changed.
    // For more information see http://www.jslab.dk/articles/non.recursive.preorder.traversal.part4.
    var data: QueueItem = {
      'destination': bench,
      'source': Object.assign(
        {},
        cloneDeep(bench.constructor.prototype),
        cloneDeep(Benchmark.defaultValues),
        cloneDeep(bench.options)
      )
    };

    do {
      (
        Object.entries(data.source) as (
          typeof data.source extends unknown[]
            ? [number, unknown]
            : [string, unknown]
        )[]
      ).forEach(([
        key,
        value,
      ]) => {
        var changed,
            destination = data.destination,
            currValue = destination[key as keyof typeof destination] as typeof value;

        // Skip pseudo private properties and event listeners.
        if (/^_|^events$|^on[A-Z]/.test(key)) {
          return;
        }
        if ((value && typeof value == 'object')) {
          if (Array.isArray(value)) {
            // Check if an array value has changed to a non-array value.
            if (!Array.isArray(currValue)) {
              changed = true;
              currValue = [];
            }

            // Check if an array has changed its length.
            if ((currValue as unknown[]).length != value.length) {
              changed = true;
              currValue = (currValue as unknown[]).slice(0, value.length);
              (currValue as unknown[]).length = value.length;
            }
          }
          // Check if an object has changed to a non-object value.
          else if (!(currValue && typeof currValue == 'object')) {
            changed = true;
            currValue = {};
          }
          // Register a changed object.
          if (changed) {
            changes.push({ 'destination': destination, 'key': key as ChangeItem['key'], 'value': currValue });
          }
          queue.push({ 'destination': currValue as QueueItem['destination'], 'source': value });
        }
        // Register a changed primitive.
        else if (
          !(currValue === value) &&
          value !== undefined
        ) {
          changes.push({ 'destination': destination, 'key': key as ChangeItem['key'], 'value': value });
        }
      });
    }
    while ((data = queue[index++]));

    // If changed emit the `reset` event and if it isn't cancelled reset the benchmark.
    if (changes.length &&
        (bench.emit(event = new Event<this, 'reset'>('reset')), !event.cancelled)) {
      changes.forEach((data) => {
        // this _could_ be done with a runtime conditional check,
        //  but at build time it would be a redundant condition
        (data.destination as {[key: string]: unknown})[data.key as string] = data.value;
      });
    }
    return bench;
  }

  /**
   * Displays relevant benchmark information when coerced to a string.
   *
   * @returns {string} A string representation of the benchmark instance.
   */
  toString(): string {
    var bench = this,
        error = bench.error,
        hz = bench.hz,
        id = bench.id,
        stats = bench.stats,
        size = stats.sample.length,
        pm = '\xb1',
        result = (bench.name || (Number.isNaN(id) ? id : '<Test #' + id + '>')).toString();

    if (error) {
      var errorStr;
      if (!(error && (typeof error === 'object' || typeof error === 'function'))) {
        errorStr = String(error);
      } else if (!(error instanceof Error)) {
        errorStr = Benchmark.join(error);
      } else {
        // Error#name and Error#message properties are non-enumerable.
        errorStr = Benchmark.join(Object.assign({ 'name': error.name, 'message': error.message }, error));
      }
      result += ': ' + errorStr;
    }
    else {
      result += ' x ' + Benchmark.formatNumber(hz.toFixed(hz < 100 ? 2 : 0) as `${number}`) + ' ops/sec ' + pm +
        stats.rme.toFixed(2) + '% (' + size + ' run' + (size == 1 ? '' : 's') + ' sampled)';
    }
    return result;
  }

  /**
   * Runs the benchmark.
   *
   * @param {Object} [options={}] Options object.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // basic usage
   * bench.run();
   *
   * // or with options
   * bench.run({ 'async': true });
   */
  run(options: RunOptions): object {
    var bench = this as ClonedBenchmark,
        event = new Event<typeof bench, 'start'>('start');

    const timer = options?.timer || Timer.timer;

    // Set `running` to `false` so `reset()` won't call `abort()`.
    bench.running = false;
    bench.reset();
    bench.running = true;

    bench.count = bench.initCount;
    bench.times.timeStamp = (+Date.now());
    bench.emit(event);

    if (!event.cancelled) {
      options = {
        'async': !!(
          undefined === options?.async
            ? bench.async
            : options.async
          )
      };

      options.timer = timer;

      // For clones created within `compute()`.
      if (bench._original) {
        if (bench.defer) {
          new Deferred(bench, timer);
        } else {
          cycle(bench, options as Parameters<typeof cycle>[1]);
        }
      }
      // For original benchmarks.
      else {
        compute(bench, options);
      }
    }
    return bench;
  }
}

type DeferredWithTeardown = (
  & Deferred<CompiledBenchmark>
  & {teardown: Exclude<Deferred['teardown'], undefined>}
);

class Deferred<
  T extends ClonedBenchmark = ClonedBenchmark
> {
  /**
   * The Timer instance.
   */
  #timer: Timer;

  /**
   * The deferred benchmark instance.
   */
  benchmark: T;

  /**
   * The number of deferred cycles performed while benchmarking.
   */
  cycles: number = 0;

  teardown: Function | undefined;

  /**
   * The time taken to complete the deferred benchmark (secs).
   */
  elapsed: number = 0;

  /**
   * A timestamp of when the deferred benchmark started (ms).
   */
  timeStamp: number = 0;

  /**
   * The Deferred constructor.
   *
   * @memberOf Benchmark
   * @param {T} clone The cloned benchmark instance.
   * @param {Timer} timer The timer instance.
   */
  constructor(clone: T, timer: Timer) {
    this.benchmark = clone;
    this.#timer = timer;
    clock(this, timer);
  }

  /**
   * Handles cycling/completing the deferred benchmark.
   */
  resolve(this: DeferredWithTeardown) {
    var deferred = this,
        clone = deferred.benchmark,
        bench = clone._original;

    if (bench.aborted) {
      // cycle() -> clone cycle/complete event -> compute()'s invoked bench.run() cycle/complete.
      deferred.teardown();
      clone.running = false;
      cycle(deferred, {timer: this.#timer});
    }
    else if (++deferred.cycles < clone.count) {
      clone.compiled.call(deferred, globalThis, this.#timer);
    }
    else {
      this.#timer.stop(deferred);
      deferred.teardown();
      clone.delayFn(() => { cycle(deferred, {timer: this.#timer}); });
    }
  }

  static isA(maybe: unknown): maybe is (Deferred | DeferredWithTeardown) {
    return maybe instanceof Deferred;
  }
}

type EventWithTarget<
  T extends EventTarget | (Benchmark[]) = EventTarget | (Benchmark[]),
  Type extends string = string,
> = (
  & Omit<Event<T, Type>, 'target'>
  & {
    target: T,
  }
)

type EventOptions<
  Type extends string = string
> = (
  | {
    type: Type,
    target: Benchmark,
    currentTarget: (Benchmark[]) | Suite,
  }
  | {
    type: Type,
    target: Suite | Benchmark,
  }
);

class Event<
  T extends (EventTarget | Benchmark[]) = (EventTarget | Benchmark[]),
  Type extends string = string,
> {
  /**
   * A flag to indicate if the emitters listener iteration is aborted.
   */
  aborted: boolean = false;

  /**
   * A flag to indicate if the default action is cancelled.
   */
  cancelled: boolean = false;

  /**
   * The object whose listeners are currently being processed.
   */
  currentTarget: T | undefined = undefined;

  /**
   * The return value of the last executed listener.
   */
  result: unknown = undefined;

  /**
   * The object to which the event was originally emitted.
   *
   * @type {EventTarget|undefined}
   */
  target: T | undefined = undefined;

  /**
   * A timestamp of when the event was created (ms).
   */
  timeStamp: number = 0;

  /**
   * The event type.
   */
  type: Type;

  /** @type {unknown} */
  message: unknown;

  /**
   * The Event constructor.
   *
   * @memberOf Benchmark
   * @param {{type: Type}|Type} type The event type.
   */
  constructor(type: EventOptions<Type> | Type) {
    if ('object' === typeof type) {
      this.type = type.type;
    } else {
      this.type = type;
    }
    Object.assign(this, {
        timeStamp: +Date.now(),
        ...(
          typeof type === 'string'
            ? {type}
            : type
        ),
    });
  }
}

type SuiteOptions<
  T extends (Benchmark[]) | Suite = (Benchmark[]) | Suite,
> = (
  & {
    name: string,
    onAbort: (this: T, e: Event<Suite, 'abort'>) => unknown,
    onAdd: (this: T, e: Event<Benchmark, 'add'>) => unknown,
    onReset: (this: T, e: Event<Suite, 'reset'>) => unknown,
    onStart: (this: T, e: Event<Suite, 'start'>) => unknown,
    onCycle: (this: T, e: EventWithTarget<Benchmark, 'cycle'>) => unknown,
    onError: (this: T, e: EventWithTarget<Benchmark, 'error'>) => unknown,
    onComplete: (this: T, e: EventWithTarget<Benchmark, 'complete'>) => unknown,
  }
);

class Suite extends EventTarget<SuiteOptions> {
  /**
   * The default options copied by suite instances.
   */
  static options: Partial<SuiteOptions> = {

    /**
     * The name of the suite.
     */
    'name': undefined
  }

  #benchmarks: Benchmark[];

  /**
   * A flag to indicate if the suite is aborted.
   */
  aborted: boolean = false;

  /**
   * A flag to indicate if the suite is running.
   */
  running: boolean = false;

  name: string | undefined;

  /**
   * The Suite constructor.
   *
   * @memberOf Benchmark
   * @param {string|object} name A name to identify the suite.
   * @param {SuiteOptions} [options] Options object.
   * @example
   *
   * // basic usage (the `new` operator is optional)
   * var suite = new Benchmark.Suite;
   *
   * // or using a name first
   * var suite = new Benchmark.Suite('foo');
   *
   * // or with options
   * var suite = new Benchmark.Suite('foo', {
   *
   *   // called when the suite starts running
   *   'onStart': onStart,
   *
   *   // called between running benchmarks
   *   'onCycle': onCycle,
   *
   *   // called when aborted
   *   'onAbort': onAbort,
   *
   *   // called when a test errors
   *   'onError': onError,
   *
   *   // called when reset
   *   'onReset': onReset,
   *
   *   // called when the suite completes running
   *   'onComplete': onComplete
   * });
   */
  constructor(name: Partial<SuiteOptions>);
  constructor(name: string, options?: Partial<SuiteOptions>);
  constructor(name: string | Partial<SuiteOptions>, options?: Partial<SuiteOptions>) {
    super();

    this.#benchmarks = [];
    // Juggle arguments.
    if (typeof name === 'object') {
      // 1 argument (options).
      options = name;
      this.name = options.name;
    } else {
      // 2 arguments (name [, options]).
      this.name = name;
    }
    this.setOptions(options);
  }

  get benchmarks() {
    return [...this.#benchmarks];
  }

  /**
   * The number of benchmarks in the suite.
   *
   * @type {number}
   */
  get length() {
    return this.#benchmarks.length;
  }

  /**
   * Sets the length of the benchmarks array for the Suite instance.
   *
   * Useful for truncating the array.
   */
  set length(value) {
    if (undefined === this.#benchmarks) {
      this.#benchmarks = [];
    }

    this.#benchmarks.length = value;
  }

  /**
   * Reverse the benchmarks order
   *
   * @returns {Suite}
   */
  reverse(): Suite {
    this.#benchmarks.reverse();

    return this;
  }

  /**
   * Removes the first benchmark from the benchmarks array and returns it
   *
   * @returns {Benchmark|undefined}
   */
  shift(): Benchmark | undefined {
    return this.#benchmarks.shift();
  }

  /**
   * @param {Benchmark} bench
   *
   * @returns {number}
   */
  indexOf(bench: Benchmark): number {
    return this.#benchmarks.indexOf(bench);
  }

  /**
   * Aborts all benchmarks in the suite.
   *
   * @returns {Object} The suite instance.
   */
  abort(): object {
    var
        suite = this,
        resetting = calledBy.resetSuite;

    if (suite.running) {
      const event = new Event<typeof this, 'abort'>('abort');
      suite.emit(event);
      if (!event.cancelled || resetting) {
        // Avoid infinite recursion.
        calledBy.abortSuite = true;
        suite.reset();
        delete calledBy.abortSuite;

        if (!resetting) {
          suite.aborted = true;
          Benchmark.invoke(suite, 'abort');
        }
      }
    }
    return suite;
  }

  /**
   * Adds a test to the benchmark suite.
   *
   * @param {string} name A name to identify the benchmark.
   * @param {Function|string} fn The test to benchmark.
   * @param {Object} [options={}] Options object.
   * @returns {Object} The suite instance.
   * @example
   *
   * // basic usage
   * suite.add(fn);
   *
   * // or using a name first
   * suite.add('foo', fn);
   *
   * // or with options
   * suite.add('foo', fn, {
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   *
   * // or name and options
   * suite.add('foo', {
   *   'fn': fn,
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   *
   * // or options only
   * suite.add({
   *   'name': 'foo',
   *   'fn': fn,
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   */
  add(name: string, fn: Function | string, options?: Partial<BenchmarkOptions>): object {
    var suite = this,
        bench = new Benchmark(name, fn, options),
        event = new Event<typeof bench, 'add'>({
          type: 'add',
          target: bench,
        }) as EventWithTarget<typeof bench, 'add'>;

    if (suite.emit(event), !event.cancelled) {
      this.#benchmarks.push(bench);
    }
    return suite;
  }

  /**
   * Creates a new suite with cloned benchmarks.
   *
   * @param {SuiteOptions} options Options object to overwrite cloned options.
   * @returns {Suite} The new suite instance.
   */
  clone(options?: SuiteOptions): Suite {
    var suite = this,
        result = new Suite(Object.assign({}, suite.options, options));

    // Copy own properties.
    (
      Object.entries(suite) as [
        (keyof Suite & string),
        Suite[keyof Suite & string]
      ][]
    ).forEach(([key, value]) => {
      if (!has(result, key)) {
        result[key] = cloneDeep(value as Suite[typeof key]);
      }
    });
    return result;
  }

  /**
   * An `Array#filter` like method.
   *
   * @param {Function|string} callback The function/alias called per iteration.
   * @returns {Object} A new suite of benchmarks that passed callback filter.
   */
  filter(callback: Parameters<typeof Benchmark['filter']>[1]): object {
    var suite = this,
        result = new Suite(suite.options);

    const cb = Benchmark.filter(this, callback);

    result.#benchmarks.push(...cb);

    return result;
  }

  /**
   * Resets all benchmarks in the suite.
   *
   * @returns {Object} The suite instance.
   */
  reset(): object {
    var event: Event<this>,
        suite = this,
        aborting = calledBy.abortSuite;

    if (suite.running && !aborting) {
      // No worries, `resetSuite()` is called within `abortSuite()`.
      calledBy.resetSuite = true;
      suite.abort();
      delete calledBy.resetSuite;
    }
    // Reset if the state has changed.
    else if ((suite.aborted || suite.running) &&
        (suite.emit(event = new Event<this, 'reset'>('reset')), !event.cancelled)) {
      suite.aborted = suite.running = false;
      if (!aborting) {
        Benchmark.invoke(suite, 'reset');
      }
    }
    return suite;
  }

  /**
   * Runs the suite.
   *
   * @param {Object} [options={}] Options object.
   * @returns {Suite} The suite instance.
   * @example
   *
   * // basic usage
   * suite.run();
   *
   * // or with options
   * suite.run({ 'async': true, 'queued': true });
   */
  run(options?: RunOptions): this {
    var suite = this;

    suite.reset();
    suite.running = true;
    options || (options = {});
    options.timer = options?.timer || Timer.timer;

    const invoke_options: SuiteRunOptions<Suite> = {
      'name': 'run',
      'args': options,
      'queued': !!options.queued,
      'onStart': function(this: Suite, event: Event<typeof this>) {
        suite.emit(event);
      },
      'onCycle': function(this: Suite, event: EventWithTarget<Benchmark>) {
        var bench = event.target;
        if (bench.error) {
          suite.emit(new Event<typeof bench>({ 'type': 'error', 'target': bench }));
        }
        suite.emit(event);
        event.aborted = suite.aborted;
      },
      'onComplete': function(this: Suite, event: EventWithTarget<Benchmark>) {
        suite.running = false;
        suite.emit(event);
      }
    };

    Benchmark.invoke(suite, invoke_options);
    return suite;
  }
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

/*------------------------------------------------------------------------*/

/**
 * Computes stats on benchmark results.
 *
 * @private
 * @param {Benchmark} bench The benchmark instance.
 * @param {RunOptions} options The options object.
 */
function compute(bench: Benchmark, options: RunOptions) {
  const {timer} = options;

  var async = options.async,
      elapsed = 0,
      initCount = bench.initCount,
      minSamples = bench.minSamples,
      /** @type {Benchmark[]} */
      queue: Benchmark[] = [],
      sample = bench.stats.sample;

  /**
   * Adds a clone to the queue.
   */
  function enqueue() {
    queue.push(Object.assign(bench.clone(), {
      '_original': bench,
      'events': {
        'abort': [update],
        'cycle': [update],
        'error': [update],
        'start': [update]
      }
    }));
  }

  /**
   * Updates the clone/original benchmarks to keep their data in sync.
   *
   * @param {Event} event
   */
  function update(this: Benchmark, event: Event<Benchmark>) {
    var clone = this,
        type = event.type;

    if (bench.running) {
      if (type == 'start') {
        // Note: `clone.minTime` prop is inited in `clock()`.
        clone.count = bench.initCount;
      }
      else {
        if (type == 'error') {
          bench.error = clone.error;
        }
        if (type == 'abort') {
          bench.abort();
          bench.emit(new Event<Benchmark, 'cycle'>('cycle'));
        } else {
          event.currentTarget = event.target = bench;
          bench.emit(event);
        }
      }
    } else if (bench.aborted) {
      // Clear abort listeners to avoid triggering bench's abort/cycle again.
      clone.events.abort.length = 0;
      clone.abort();
    }
  }

  /**
   * Determines if more clones should be queued or if cycling should stop.
   */
  function evaluate(event: EventWithTarget<Benchmark>) {
    var critical: number,
        df: number,
        mean: number,
        moe: number,
        rme: number,
        sd: number,
        sem: number,
        variance: number,
        clone = event.target,
        done = bench.aborted,
        now = (+Date.now()),
        size = sample.push(clone.times.period),
        maxedOut = size >= minSamples && (elapsed += now - clone.times.timeStamp) / 1e3 > bench.maxTime,
        times = bench.times,
        varOf = function(sum: number, x: number) { return sum + Math.pow(x - mean, 2); };

    // Exit early for aborted or unclockable tests.
    if (done || clone.hz == Infinity) {
      maxedOut = !(size = sample.length = queue.length = 0);
    }

    if (!done) {
      // Compute the sample mean (estimate of the population mean).
      mean = getMean(sample);
      // Compute the sample variance (estimate of the population variance).
      variance = sample.reduce(varOf, 0) / (size - 1) || 0;
      // Compute the sample standard deviation (estimate of the population standard deviation).
      sd = Math.sqrt(variance);
      // Compute the standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean).
      sem = sd / Math.sqrt(size);
      // Compute the degrees of freedom.
      df = size - 1;

      const maybe_tTable_key = (Math.round(df) || 1).toString() as keyof typeof tTable;
      // Compute the critical value.
      critical = tTable[maybe_tTable_key] || tTable.infinity;
      // Compute the margin of error.
      moe = sem * critical;
      // Compute the relative margin of error.
      rme = (moe / mean) * 100 || 0;

      Object.assign(bench.stats, {
        'deviation': sd,
        'mean': mean,
        'moe': moe,
        'rme': rme,
        'sem': sem,
        'variance': variance
      });

      // Abort the cycle loop when the minimum sample size has been collected
      // and the elapsed time exceeds the maximum time allowed per benchmark.
      // We don't count cycle delays toward the max time because delays may be
      // increased by browsers that clamp timeouts for inactive tabs. For more
      // information see https://developer.mozilla.org/en/window.setTimeout#Inactive_tabs.
      if (maxedOut) {
        // Reset the `initCount` in case the benchmark is rerun.
        bench.initCount = initCount;
        bench.running = false;
        done = true;
        times.elapsed = (now - times.timeStamp) / 1e3;
      }
      if (bench.hz != Infinity) {
        bench.hz = 1 / mean;
        times.cycle = mean * bench.count;
        times.period = mean;
      }
    }
    // If time permits, increase sample size to reduce the margin of error.
    if (queue.length < 2 && !maxedOut) {
      enqueue();
    }
    // Abort the `invoke` cycle when done.
    event.aborted = done;
  }

  // Init queue and begin.
  enqueue();

  const queueOptions: SuiteRunOptions<
    typeof queue
  > = {
    'name': 'run',
    'args': { async, timer },
    'queued': true,
    onStart: noop,
    'onCycle': evaluate,
    'onComplete': function() { bench.emit(new Event('complete')); }
  };

  Benchmark.invoke(queue, queueOptions);
}

/*------------------------------------------------------------------------*/

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

/*--------------------------------------------------------------------------*/

// Export Benchmark.
export default Benchmark;

export {
  Benchmark,
  Suite,
}
