/*!
 * Benchmark.js
 * Copyright 2026 SignpostMarv
 * Copyright 2010-2016 Mathias Bynens
 * Based on JSLitmus.js, copyright Robert Kieffer
 * Modified by John-David Dalton
 * Available under MIT license
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type Object. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `define`. */
  var freeDefine = typeof define == 'function' && typeof define.amd == 'object' && define.amd && define;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /** Used to assign each benchmark an incremented id. */
  var counter = 0;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /** Used to detect primitive types. */
  var rePrimitive = /^(?:boolean|number|string|undefined)$/;

  /** Used to make every compiled test unique. */
  var uidCounter = 0;

  /** Used to avoid hz of Infinity. */
  var divisors = {
    '1': 4096,
    '2': 512,
    '3': 64,
    '4': 8,
    '5': 0
  };

  /**
   * T-Distribution two-tailed critical values for 95% confidence.
   * For more info see http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm.
   */
  var tTable = {
    '1':  12.706, '2':  4.303, '3':  3.182, '4':  2.776, '5':  2.571, '6':  2.447,
    '7':  2.365,  '8':  2.306, '9':  2.262, '10': 2.228, '11': 2.201, '12': 2.179,
    '13': 2.16,   '14': 2.145, '15': 2.131, '16': 2.12,  '17': 2.11,  '18': 2.101,
    '19': 2.093,  '20': 2.086, '21': 2.08,  '22': 2.074, '23': 2.069, '24': 2.064,
    '25': 2.06,   '26': 2.056, '27': 2.052, '28': 2.048, '29': 2.045, '30': 2.042,
    'infinity': 1.96
  };

  /**
   * Critical Mann-Whitney U-values for 95% confidence.
   * For more info see http://www.saburchill.com/IBbiology/stats/003.html.
   */
  var uTable = {
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
  };

  /*--------------------------------------------------------------------------*/

  /**
   * no need to reference noop()
   *
   * @private
   */
  function noop() {
    /** empty */
  }

  /**
   * @param {*} maybe
   * @param {string} prop
   *
   * @returns {boolean}
   */
  function has(maybe, prop) {
    const canHaveProps = maybe && (typeof maybe === 'object' || typeof maybe === 'function');

    return canHaveProps && maybe.hasOwnProperty(prop);
  }

  /**
   * @param {RegExp} regex
   * @param {string} str
   *
   * @returns {string|null}
   */
  function getResult(regex, str) {
    const match = regex.exec(str);

    if (!match) {
      return null;
    }

    return match[1];
  }

  /** Detect DOM document object. */
  var doc = isHostType(root, 'document') && root.document;

  /** Used to access Node.js's high resolution timer. */
  var processObject = isHostType(root, 'process') && root.process;

  /** Used to prevent a `removeChild` memory leak in IE < 9. */
  var trash = doc && doc.createElement('div');

  /** Used to integrity check compiled tests. */
  var uid = 'uid' + (+root.Date.now());

  /** Used to avoid infinite recursion when methods call each other. */
  var calledBy = {};

  /**
   * A class used to flag environments/features.
   *
   * @memberOf Benchmark
   */
  class Support {
    /**
     * @type {boolean|undefined}
     */
    static #browser;

    /**
     * @type {boolean|undefined}
     */
    static #decompilation;

    /**
     * Detect if running in a browser environment.
     *
     * @returns {boolean}
     */
    static get browser() {
      if (this.#browser == undefined) {
        this.#browser = doc && isHostType(root, 'navigator');
      }

      return this.#browser;
    }

    /**
     * Detect if the Timers API exists.
     *
     * @returns {boolean}
     */
    static get timeout() {
      return true;
    }

    /**
     * Detect if function decompilation is supported.
     *
     * @returns {boolean}
     */
    static get decompilation() {
      if (this.#decompilation == undefined) {
        try {
          // Safari 2.x removes commas in object literals from `Function#toString` results.
          // See http://webk.it/11609 for more details.
          // Firefox 3.6 and Opera 9.25 strip grouping parentheses from `Function#toString` results.
          // See http://bugzil.la/559438 for more details.
          this.#decompilation = root.Function(
            ('return (' + (function(x) { return { 'x': '' + (1 + x) + '', 'y': 0 }; }) + ')')
            // Avoid issues with code added by Istanbul.
            .replace(/__cov__[^;]+;/g, '')
          )()(0).x === '1';
        } catch {
          this.#decompilation = false;
        }
      }

      return this.#decompilation;
    }
  }

  /*------------------------------------------------------------------------*/

  /**
   * A specialized version of lodash's `cloneDeep` which only clones arrays and plain
   * objects assigning all other values by reference.
   *
   * @private
   * @param {*} value The value to clone.
   * @returns {*} The cloned value.
   */
  var cloneDeep = (value) => {
    if (root.Array.isArray(value)) {
      return [...value];
    } else if (value && typeof value === 'object') {
      return root.Object.fromEntries(
        root.Object.entries(value)
          .map(([key, value]) => [key, cloneDeep(value)]),
      );
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
  function createFunction() {
    // Lazy define.
    createFunction = function(args, body) {
      var result,
          anchor = freeDefine ? freeDefine.amd : Benchmark,
          prop = uid + 'createFunction';

      runScript((freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '=function(' + args + '){' + body + '}');
      result = anchor[prop];
      delete anchor[prop];
      return result;
    };
    // Fix JaegerMonkey bug.
    // For more information see http://bugzil.la/639720.
    createFunction = Support.browser && (createFunction('', 'return"' + uid + '"') || noop)() == uid ? createFunction : root.Function;
    return createFunction.apply(null, arguments);
  }

  /**
   * Delay the execution of a function based on the benchmark's `delay` property.
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @param {Object} fn The function to execute.
   */
  function delay(bench, fn) {
    bench._timerId = root.setTimeout(() => fn(), bench.delay * 1e3);
  }

  /**
   * Destroys the given element.
   *
   * @private
   * @param {Element} element The element to destroy.
   */
  function destroyElement(element) {
    trash.appendChild(element);
    trash.innerHTML = '';
  }

  /**
   * Gets the name of the first argument from a function's source.
   *
   * @private
   * @param {Function} fn The function.
   * @returns {string} The argument name.
   */
  function getFirstArgument(fn) {
    return (
      !has(fn, 'toString') &&
      (
        /^[\s(]*function[^(]*\(([^\s,)]+)/.exec(fn) ||
        0
      )[1]
    ) || '';
  }

  /**
   * Computes the arithmetic mean of a sample.
   *
   * @private
   * @param {[number, ...number[]]} sample The sample.
   * @returns {number} The mean.
   */
  function getMean(sample) {
    return sample.reduce((sum, x) => sum + x, 0) / sample.length;
  }

  /**
   * Gets the source code of a function.
   *
   * @private
   * @param {Function} fn The function.
   * @returns {string} The function's source code.
   */
  function getSource(fn) {
    var result = '';
    if (isStringable(fn)) {
      result = root.String(fn);
    } else if (Support.decompilation) {
      // Escape the `{` for Firefox 1.
      result = getResult(/^[^{]+\{([\s\S]*)\}\s*$/, fn);
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
  function isHostType(object, property) {
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
  function isStringable(value) {
    if (null === value) {
      return false;
    }

    return (typeof value === 'string') || (has(value, 'toString') && (typeof value.toString === 'function'));
  }

  /**
   * Runs a snippet of JavaScript via script injection.
   *
   * @private
   * @param {string} code The code to run.
   */
  function runScript(code) {
    var anchor = freeDefine ? define.amd : Benchmark,
        script = doc.createElement('script'),
        sibling = doc.getElementsByTagName('script')[0],
        parent = sibling.parentNode,
        prop = uid + 'runScript',
        prefix = '(' + (freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '||function(){})();';

    // Firefox 2.0.0.2 cannot use script injection as intended because it executes
    // asynchronously, but that's OK because script injection is only used to avoid
    // the previously commented JaegerMonkey bug.
    try {
      // Remove the inserted script *before* running the code to avoid differences
      // in the expected script element count/order of the document.
      script.appendChild(doc.createTextNode(prefix + code));
      anchor[prop] = function() { destroyElement(script); };
    } catch(e) {
      parent = parent.cloneNode(false);
      sibling = null;
      script.text = code;
    }
    parent.insertBefore(script, sibling);
    delete anchor[prop];
  }

  class Timer {
    /**
     * The timer namespace object or constructor.
     *
     * @readonly
     *
     * @type {Function|Object}
     */
    ns;

    /**
     * Starts the deferred timer.
     *
     * @param {Object} deferred The deferred instance.
     */
    start = null;

    /**
     * Stops the deferred timer.
     *
     * @param {Object} deferred The deferred instance.
     */
    stop = null; // Lazy defined in `clock()`.

    /**
     * @readonly
     *
     * @type {number}
     */
    res;

    /**
     * @readonly
     *
     * @type {'ms'|'us'|'ns'}
     */
    unit;

    /**
     *
     * @param {Timer['ns']} ns
     * @param {Timer['res']} res
     * @param {Timer['unit']} unit
     */
    constructor (
      ns,
      res,
      unit,
    ) {
      this.ns = ns;
      this.res = res;
      this.unit = unit;
    }

    /**
     * @type {Timer|undefined}
     */
    static #timer;

    /**
     * @type {Object<now, () => number>}
     */
    static #highestDefaultTimer = performance;

    /**
     * A high-precision timer such as the one provided by microtime
     *
     * @type {Object<now, () => number>|undefined}
     */
    static #usTimer;

    /**
     * @param {Object} options
     * @param {Object<now, () => number>} [options.highestDefaultTimer]
     * @param {Object<now, () => number>} [options.usTimer] A high-precision timer such as the one provided by microtime
     */
    static changeTimerContext({
      highestDefaultTimer = performance,
      usTimer = undefined,
    } = {}) {
      this.#timer = undefined;
      this.#highestDefaultTimer = highestDefaultTimer;
      this.#usTimer = usTimer;
    }

    /**
     * Gets the current timer's minimum resolution (secs).
     *
     * @param {Timer['unit']} unit
     * @param {Timer['ns']} ns
     */
    static #getRes(unit, ns) {
      var measured,
          begin,
          count = 30,
          divisor = 1e3,
          sample = [];

      // Get average smallest measurable time.
      while (count--) {
        if (unit == 'us') {
          divisor = 1e6;
          if (ns.stop) {
            ns.start();
            while (!(measured = ns.microseconds())) {}
          } else {
            begin = ns();
            while (!(measured = ns() - begin)) {}
          }
        }
        else if (unit == 'ns') {
          divisor = 1e9;
          begin = (begin = ns())[0] + (begin[1] / divisor);
          while (!(measured = ((measured = ns())[0] + (measured[1] / divisor)) - begin)) {}
          divisor = 1;
        }
        else if (ns.now) {
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
    static get timer() {
      if (undefined === this.#timer) {
        /** @type {[Timer, ...Timer[]]} */
        const timers = [
          new Timer(
            this.#highestDefaultTimer,
            root.Math.max(0.0015, this.#getRes('ms', this.#highestDefaultTimer)),
            'ms',
          ),
        ];

        // Detect Chrome's microsecond timer:
        // enable benchmarking via the --enable-benchmarking command
        // line switch in at least Chrome 7 to use chrome.Interval
        try {
          const instance = new (root.chrome || root.chromium).Interval;
          if (instance) {
            timers.push(new Timer(
              instance,
              this.#getRes('us', instance),
              'us',
            ));
          }
        } catch(e) {}

        // Detect Node.js's nanosecond resolution timer available in Node.js >= 0.8.
        if (processObject && typeof processObject.hrtime == 'function') {
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
      }

      return this.#timer;
    }
  }

  /*------------------------------------------------------------------------*/

  /**
   * Abstract class handling events for both Benchmark and Suite
   *
   * @abstract
   */
  class EventTarget {
    /**
     * Executes all registered listeners of the specified event type.
     *
     * @param {Event} event The event type or object.
     * @param {...*} [args] Arguments to invoke the listener with.
     * @returns {*} Returns the return value of the last listener executed.
     */
    emit(event) {
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
     * @returns {Array} The listeners array.
     */
    listeners(type) {
      var object = this,
          events = object.events || (object.events = {});

      return has(events, type) ? events[type] : (events[type] = []);
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
    off(type, listener) {
      var object = this,
          events = object.events;

      if (!events) {
        return object;
      }

      const loopOver = type ? type.split(' ') : events;

      const entries = Array.isArray(loopOver)
        ? loopOver.map((value, key) => [key, value])
        : root.Object.entries(loopOver);

      entries.forEach(function([type, listeners]) {
        var index;
        if (typeof listeners == 'string') {
          type = listeners;
          listeners = has(events, type) && events[type];
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
     * @returns {Object} The current instance.
     * @example
     *
     * // register a listener for an event type
     * bench.on('cycle', listener);
     *
     * // register a listener for multiple event types
     * bench.on('start cycle', listener);
     */
    on(type, listener) {
      var object = this,
          events = object.events || (object.events = {});

      type.split(' ').forEach((type) => {
        (has(events, type)
          ? events[type]
          : (events[type] = [])
        ).push(listener);
      });
      return object;
    }

    /**
     * A helper function for setting options/event handlers.
     *
     * @protected
     * @param {Object} object The benchmark or suite instance.
     * @param {Object} [options={}] Options object.
     */
    setOptions(object, options) {
      options = object.options = root.Object.assign({}, cloneDeep(object.constructor.options), cloneDeep(options));

      root.Object.entries(options).forEach(([key, value]) => {
        if (value != null) {
          // Add event listeners.
          if (/^on[A-Z]/.test(key)) {
            key.split(' ').forEach((key) => {
              object.on(key.slice(2).toLowerCase(), value);
            });
          } else if (
            !has(object, key) || (
              object instanceof Benchmark &&
              key in Benchmark.defaultValues
            )
          ) {
            object[key] = cloneDeep(value);
          }
        }
      });
    }

    /**
     * Converts a Suite or Suite-like object/array to an array of values
     *
     * @param {(unknown[])|Suite|Object<number|'length', unknown>} array
     *
     * @returns {(unknown[])|(Benchmark[])}
     */
    static asArray(array) {
      if (root.Array.isArray(array)) {
        return [...array];
      } else if (array instanceof Suite) {
        return array.benchmarks;
      }

      return root.Object.keys(array || root.Object.create(null))
        .filter((maybe) => /^\d+$/.test(maybe))
        .map((key) => array[key]);
    }
  }

  /*------------------------------------------------------------------------*/

  class Benchmark extends EventTarget {
    /**
     * The number of times a test was executed.
     *
     * @type {number}
     */
    count = Benchmark.defaultValues.count;

    /**
     * The number of cycles performed while benchmarking.
     *
     * @type {number}
     */
    cycles = Benchmark.defaultValues.cycles;

    /**
     * The number of executions per second.
     *
     * @type {number}
     */
    hz = Benchmark.defaultValues.hz;

    /**
     * The compiled test function.
     *
     * @type {Function|string}
     */
    compiled = Benchmark.defaultValues.compiled;

    /**
     * The error object if the test failed.
     *
     * @type {Object|undefined}
     */
    error = Benchmark.defaultValues.error;

    /**
     * The test to benchmark.
     *
     * @type {Function|string}
     */
    fn = Benchmark.defaultValues.fn;

    /**
     * A flag to indicate if the benchmark is aborted.
     *
     * @type {boolean}
     */
    aborted = Benchmark.defaultValues.aborted;

    /**
     * A flag to indicate if the benchmark is running.
     *
     * @type {boolean}
     */
    running = Benchmark.defaultValues.running;

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
    setup = Benchmark.defaultValues.setup;

    /**
     * Compiled into the test and executed immediately **after** the test loop.
     *
     * @type {Function|string}
     */
    teardown = Benchmark.defaultValues.teardown;

    /**
     * An object of stats including mean, margin or error, and standard deviation.
     *
     * @type Object
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
     * An object of timing data including cycle, elapsed, period, start, and stop.
     *
     * @type Object
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

    /**
     * The default options copied by benchmark instances.
     *
     * @type {Object}
     */
    static options = {
      /**
       * A flag to indicate that benchmark cycles will execute asynchronously
       * by default.
       *
       * @type boolean
       */
      'async': false,

      /**
       * A flag to indicate that the benchmark clock is deferred.
       *
       * @type boolean
       */
      'defer': false,

      /**
       * The delay between test cycles (secs).
       * @type number
       */
      'delay': 0.005,

      /**
       * Displayed by `Benchmark#toString` when a `name` is not available
       * (auto-generated if absent).
       *
       * @type string
       */
      'id': undefined,

      /**
       * The default number of times to execute a test on a benchmark's first cycle.
       *
       * @type number
       */
      'initCount': 1,

      /**
       * The maximum time a benchmark is allowed to run before finishing (secs).
       *
       * Note: Cycle delays aren't counted toward the maximum time.
       *
       * @type number
       */
      'maxTime': 5,

      /**
       * The minimum sample size required to perform statistical analysis.
       *
       * @type number
       */
      'minSamples': 5,

      /**
       * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
       *
       * @type number
       */
      'minTime': 0,

      /**
       * The name of the benchmark.
       *
       * @type string
       */
      'name': undefined,

      /**
       * An event listener called when the benchmark is aborted.
       *
       * @type Function
       */
      'onAbort': undefined,

      /**
       * An event listener called when the benchmark completes running.
       *
       * @type Function
       */
      'onComplete': undefined,

      /**
       * An event listener called after each run cycle.
       *
       * @type Function
       */
      'onCycle': undefined,

      /**
       * An event listener called when a test errors.
       *
       * @type Function
       */
      'onError': undefined,

      /**
       * An event listener called when the benchmark is reset.
       *
       * @type Function
       */
      'onReset': undefined,

      /**
       * An event listener called when the benchmark starts running.
       *
       * @type Function
       */
      'onStart': undefined
    };

    /**
     * The semantic version number.
     *
     * @type string
     *
     * @todo replace with json-derived version built from npm version/git hash
     */
    static version = '2.1.4';

    /**
     * @param {Object<now, () => number>} highestDefaultTimer
     * @param {Object<now, () => number>} [usTimer] A high-precision timer such as the one provided by microtime
     * @returns {Benchmark} Returns the existing Benchmark class
     */
    static reconfigureTimer(options) {
      Timer.changeTimerContext(options);
    }

    static get Event() {
      return Event;
    }

    static get Suite() {
      return Suite;
    }

    /**
     * The default values for Benchmark instance properties
     *
     * @returns {Object}
     */
    static defaultValues = Object.freeze({
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
        sample: [],
        variance: 0,
      },
      times: {
        cycle: 0,
        elapsed: 0,
        period: 0,
        timeStamp: 0,
      },
    })

    /**
     * A generic `Array#filter` like method.
     *
     * @param {Array} array The array to iterate over.
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
    static filter(array, callback) {
      if (callback === 'successful') {
        // Callback to exclude those that are errored, unrun, or have hz of Infinity.
        callback = function(bench) {
          return bench.cycles && root.isFinite(bench.hz) && !bench.error;
        };
      }
      else if (callback === 'fastest' || callback === 'slowest') {
        // Get successful, sort by period + margin of error, and filter fastest/slowest.
        var result = this.filter(array, 'successful').sort(function(a, b) {
          a = a.stats; b = b.stats;
          return (a.mean + a.moe > b.mean + b.moe ? 1 : -1) * (callback === 'fastest' ? 1 : -1);
        });

        return result.filter((bench) => {
          return result[0].compare(bench) == 0;
        });
      }

      if (array instanceof Suite) {
        return array.benchmarks.filter((benchmark, index) => callback(benchmark, index, array));
      }

      if (!root.Array.isArray(array)) {
        const {
          isArrayLike,
          result,
        } = root.Object.entries(array)
          .filter(([key, value]) => callback(
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
              result: root.Object.create(null),
              isArrayLike: true,
            },
          );

          return isArrayLike ? root.Object.values(result) : result;
      }

      return array.filter(callback);
    }

    /**
     * Converts a number to a more readable comma-separated string representation.
     *
     * @param {number} number The number to convert.
     * @returns {string} The more readable string representation.
     */
    static formatNumber(number) {
      number = root.String(number).split('.');
      return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') +
        (number[1] ? '.' + number[1] : '');
    }

    /**
     * Invokes a method on all items in an array.
     *
     * @param {Array} benches Array of benchmarks to iterate over.
     * @param {Object|string} name The name of the method to invoke OR options object.
     * @param {...*} [args] Arguments to invoke the method with.
     * @returns {Array} A new array of values returned from each method invoked.
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
    static invoke(benches, name) {
      var args,
          bench,
          queued,
          index = -1,
          eventProps = { 'currentTarget': benches },
          options = { 'onStart': noop, 'onCycle': noop, 'onComplete': noop },
          result = this.asArray(benches);

      /**
       * Invokes the method of the current object and if synchronous, fetches the next.
       */
      function execute() {
        var listeners,
            async = isAsync(bench);

        if (async) {
          // Use `getNext` as the first listener.
          bench.on('complete', getNext);
          listeners = bench.events.complete;
          listeners.splice(0, 0, listeners.pop());
        }
        // Execute method.
        result[index] = (typeof (bench ? bench[name] : undefined) === 'function')
          ? bench[name].apply(bench, args)
          : undefined;
        // If synchronous return `true` until finished.
        return !async && getNext();
      }

      /**
       * Fetches the next bench or executes `onComplete` callback.
       */
      function getNext(event) {
        var cycleEvent,
            last = bench,
            async = isAsync(last);

        if (async) {
          last.off('complete', getNext);
          last.emit(new Event('complete'));
        }
        // Emit "cycle" event.
        eventProps.type = 'cycle';
        eventProps.target = last;
        cycleEvent = new Event(eventProps);
        options.onCycle.call(benches._benchmarks, cycleEvent);

        // Choose next benchmark if not exiting early.
        if (!cycleEvent.aborted && raiseIndex() !== false) {
          bench = queued ? benches[0] : result[index];
          if (isAsync(bench)) {
            delay(bench, execute);
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
          options.onComplete.call(benches, new Event(eventProps));
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
      function isAsync(object) {
        // Avoid using `instanceof` here because of IE memory leak issues with host objects.
        var async = args[0] && args[0].async;
        return name == 'run' && (object instanceof Benchmark) &&
          ((async == null ? object.options.async : async) && Support.timeout || object.defer);
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
        return (queued ? benches.length : index < result.length)
          ? index
          : (index = false);
      }
      // Juggle arguments.
      if ((typeof name === 'string')) {
        // 2 arguments (array, name).
        args = root.Array.prototype.slice.call(arguments, 2);
      } else {
        // 2 arguments (array, options).
        options = root.Object.assign(options, name);
        name = options.name;
        args = root.Array.isArray(args = 'args' in options ? options.args : []) ? args : [args];
        queued = options.queued;
      }
      // Start iterating over the array.
      if (raiseIndex() !== false) {
        // Emit "start" event.

        bench = (result instanceof Suite ? result.benchmarks : result)[index];
        eventProps.type = 'start';
        eventProps.target = bench;
        options.onStart.call(benches, new Event(eventProps));

        // End early if the suite was aborted in an "onStart" listener.
        if (name == 'run' && (benches instanceof Suite) && benches.aborted) {
          // Emit "cycle" event.
          eventProps.type = 'cycle';
          options.onCycle.call(benches.benchmarks, new Event(eventProps));
          // Emit "complete" event.
          eventProps.type = 'complete';
          options.onComplete.call(benches, new Event(eventProps));
        }
        // Start method execution.
        else {
          if (isAsync(bench)) {
            delay(bench, execute);
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
     * @param {string} [separator1=','] The separator used between key-value pairs.
     * @param {string} [separator2=': '] The separator used between keys and values.
     * @returns {string} The joined result.
     */
    static join(object, separator1, separator2) {
      var result = [],
          length = (object = root.Object(object)).length,
          arrayLike = length === length >>> 0;

      separator2 || (separator2 = ': ');

      const entries = (
        root.Array.isArray(object)
          ? object.map((value, key) => [key, value])
          : root.Object.entries(object).filter(([key]) => has(object, key) && (!arrayLike || key !== 'length'))
      );

      entries.forEach(([key, value]) => {
        result.push(arrayLike ? value : key + separator2 + value);
      });

      return result.join(separator1 || ',');
    }

    /**
     * The Benchmark constructor.
     *
     * @param {string} name A name to identify the benchmark.
     * @param {Function|string} fn The test to benchmark.
     * @param {Object} [options={}] Options object.
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
    constructor(name, fn, options) {
      super();
      var bench = this;

      // Juggle arguments.
      if (typeof name === 'object') {
        // 1 argument (options).
        options = name;
      }
      else if (typeof name === 'function') {
        // 2 arguments (fn, options).
        options = fn;
        fn = name;
      }
      else if (typeof fn === 'object') {
        // 2 arguments (name, options).
        options = fn;
        fn = null;
        bench.name = name;
      }
      else {
        // 3 arguments (name, fn [, options]).
        bench.name = name;
      }
      this.setOptions(bench, options);

      bench.id || (bench.id = ++counter);
      bench.fn == null && (bench.fn = fn);

      bench.stats = cloneDeep(bench.stats);
      bench.times = cloneDeep(bench.times);
    }

    /**
     * Aborts the benchmark without recording times.
     *
     * @returns {Object} The benchmark instance.
     */
    abort() {
      var event,
          bench = this,
          resetting = calledBy.reset;

      if (bench.running) {
        event = new Event('abort');
        bench.emit(event);
        if (!event.cancelled || resetting) {
          // Avoid infinite recursion.
          calledBy.abort = true;
          bench.reset();
          delete calledBy.abort;

          if (Support.timeout) {
            root.clearTimeout(bench._timerId);
            delete bench._timerId;
          }
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
     * @param {Object} options Options object to overwrite cloned options.
     * @returns {Object} The new benchmark instance.
     * @example
     *
     * var bizarro = bench.clone({
     *   'name': 'doppelganger'
     * });
     */
    clone(options) {
      var bench = this,
          result = new bench.constructor(root.Object.assign({}, bench, options));

      // Correct the `options` object.
      result.options = root.Object.assign({}, cloneDeep(bench.options), cloneDeep(options));

      for (const property of Object.keys(Benchmark.defaultValues)) {
        if (undefined === result[property]) {
          result[property] = cloneDeep(bench[property]);
        }
      }

      // Copy own custom properties.
      root.Object.entries(bench).forEach(([key, value]) => {
        if (!has(result, key)) {
          result[key] = cloneDeep(value);
        }
      });

      return result;
    }

    /**
     * Determines if a benchmark is faster than another.
     *
     * @param {Object} other The benchmark to compare.
     * @returns {number} Returns `-1` if slower, `1` if faster, and `0` if indeterminate.
     */
    compare(other) {
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
          maxSize = root.Math.max(size1, size2),
          minSize = root.Math.min(size1, size2),
          u1 = getU(sample1, sample2),
          u2 = getU(sample2, sample1),
          u = root.Math.min(u1, u2);

      function getScore(xA, sampleB) {
        return sampleB.reduce((total, xB) => {
          return total + (xB > xA ? 0 : xB < xA ? 1 : 0.5);
        }, 0);
      }

      function getU(sampleA, sampleB) {
        return sampleA.reduce((total, xA) => {
          return total + getScore(xA, sampleB);
        }, 0);
      }

      function getZ(u) {
        return (u - ((size1 * size2) / 2)) / root.Math.sqrt((size1 * size2 * (size1 + size2 + 1)) / 12);
      }
      // Reject the null hypothesis the two samples come from the
      // same population (i.e. have the same median) if...
      if (size1 + size2 > 30) {
        // ...the z-stat is greater than 1.96 or less than -1.96
        // http://www.statisticslectures.com/topics/mannwhitneyu/
        zStat = getZ(u);
        return root.Math.abs(zStat) > 1.96 ? (u == u1 ? 1 : -1) : 0;
      }
      // ...the U value is less than or equal the critical U value.
      critical = maxSize < 5 || minSize < 3 ? 0 : uTable[maxSize][minSize - 3];
      return u <= critical ? (u == u1 ? 1 : -1) : 0;
    }

    /**
     * Reset properties and abort if running.
     *
     * @returns {Object} The benchmark instance.
     */
    reset() {
      var bench = this;
      if (bench.running && !calledBy.abort) {
        // No worries, `reset()` is called within `abort()`.
        calledBy.reset = true;
        bench.abort();
        delete calledBy.reset;
        return bench;
      }
      var event,
          index = 0,
          changes = [],
          queue = [];

      const blank = new Benchmark();

      // A non-recursive solution to check if properties have changed.
      // For more information see http://www.jslab.dk/articles/non.recursive.preorder.traversal.part4.
      var data = {
        'destination': bench,
        'source': root.Object.assign(
          {},
          cloneDeep(bench.constructor.prototype),
          cloneDeep(Benchmark.defaultValues),
          cloneDeep(bench.options)
        )
      };

      do {
        root.Object.entries(data.source).forEach(([key, value]) => {
          var changed,
              destination = data.destination,
              currValue = destination[key];

          // Skip pseudo private properties and event listeners.
          if (/^_|^events$|^on[A-Z]/.test(key)) {
            return;
          }
          if ((value && typeof value == 'object')) {
            if (root.Array.isArray(value)) {
              // Check if an array value has changed to a non-array value.
              if (!root.Array.isArray(currValue)) {
                changed = true;
                currValue = [];
              }
              // Check if an array has changed its length.
              if (currValue.length != value.length) {
                changed = true;
                currValue = currValue.slice(0, value.length);
                currValue.length = value.length;
              }
            }
            // Check if an object has changed to a non-object value.
            else if (!(currValue && typeof currValue == 'object')) {
              changed = true;
              currValue = {};
            }
            // Register a changed object.
            if (changed) {
              changes.push({ 'destination': destination, 'key': key, 'value': currValue });
            }
            queue.push({ 'destination': currValue, 'source': value });
          }
          // Register a changed primitive.
          else if (
            !(currValue === value) &&
            value !== undefined
          ) {
            changes.push({ 'destination': destination, 'key': key, 'value': value });
          }
        });
      }
      while ((data = queue[index++]));

      // If changed emit the `reset` event and if it isn't cancelled reset the benchmark.
      if (changes.length &&
          (bench.emit(event = new Event('reset')), !event.cancelled)) {
        changes.forEach((data) => {
          data.destination[data.key] = data.value;
        });
      }
      return bench;
    }

    /**
     * Displays relevant benchmark information when coerced to a string.
     *
     * @returns {string} A string representation of the benchmark instance.
     */
    toString() {
      var bench = this,
          error = bench.error,
          hz = bench.hz,
          id = bench.id,
          stats = bench.stats,
          size = stats.sample.length,
          pm = '\xb1',
          result = bench.name || (root.isNaN(id) ? id : '<Test #' + id + '>');

      if (error) {
        var errorStr;
        if (!(error && (typeof error === 'object' || typeof error === 'function'))) {
          errorStr = root.String(error);
        } else if (!(error instanceof Error)) {
          errorStr = Benchmark.join(error);
        } else {
          // Error#name and Error#message properties are non-enumerable.
          errorStr = Benchmark.join(root.Object.assign({ 'name': error.name, 'message': error.message }, error));
        }
        result += ': ' + errorStr;
      }
      else {
        result += ' x ' + Benchmark.formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
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
    run(options) {
      var bench = this,
          event = new Event('start');

      // Set `running` to `false` so `reset()` won't call `abort()`.
      bench.running = false;
      bench.reset();
      bench.running = true;

      bench.count = bench.initCount;
      bench.times.timeStamp = (+root.Date.now());
      bench.emit(event);

      if (!event.cancelled) {
        options = { 'async': ((options = options && options.async) == null ? bench.async : options) && Support.timeout };

        // For clones created within `compute()`.
        if (bench._original) {
          if (bench.defer) {
            new Deferred(bench);
          } else {
            cycle(bench, options);
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

  class Deferred {
    /**
     * The deferred benchmark instance.
     *
     * @type {Object}
     */
    benchmark = null;

    /**
     * The number of deferred cycles performed while benchmarking.
     *
     * @type {number}
     */
    cycles = 0;

    /**
     * The time taken to complete the deferred benchmark (secs).
     *
     * @type {number}
     */
    elapsed = 0;

    /**
     * A timestamp of when the deferred benchmark started (ms).
     *
     * @type {number}
     */
    timeStamp = 0;

    /**
     * The Deferred constructor.
     *
     * @memberOf Benchmark
     * @param {Benchmark} clone The cloned benchmark instance.
     */
    constructor(clone) {
      this.benchmark = clone;
      clock(this);
    }

    /**
     * Handles cycling/completing the deferred benchmark.
     */
    resolve() {
      var deferred = this,
          clone = deferred.benchmark,
          bench = clone._original;

      if (bench.aborted) {
        // cycle() -> clone cycle/complete event -> compute()'s invoked bench.run() cycle/complete.
        deferred.teardown();
        clone.running = false;
        cycle(deferred);
      }
      else if (++deferred.cycles < clone.count) {
        clone.compiled.call(deferred, root, Timer.timer);
      }
      else {
        Timer.timer.stop(deferred);
        deferred.teardown();
        delay(clone, function() { cycle(deferred); });
      }
    }
  }

  class Event {
    /**
     * A flag to indicate if the emitters listener iteration is aborted.
     *
     * @type boolean
     */
    aborted = false;

    /**
     * A flag to indicate if the default action is cancelled.
     *
     * @type boolean
     */
    cancelled = false;

    /**
     * The object whose listeners are currently being processed.
     *
     * @type Object
     */
    currentTarget = undefined;

    /**
     * The return value of the last executed listener.
     *
     * @type Mixed
     */
    result = undefined;

    /**
     * The object to which the event was originally emitted.
     *
     * @type Object
     */
    target = undefined;

    /**
     * A timestamp of when the event was created (ms).
     *
     * @type number
     */
    timeStamp = 0;

    /**
     * The event type.
     *
     * @type string
     */
    type;

    /**
     * The Event constructor.
     *
     * @memberOf Benchmark
     * @param {Object|string} type The event type.
     */
    constructor(type) {
      root.Object.assign(this, {
          timeStamp: +root.Date.now(),
          ...(
            typeof type === 'string'
              ? {type}
              : type
          ),
      });
    }
  }

  class Suite extends EventTarget {
    /**
     * The default options copied by suite instances.
     *
     * @type {Object}
     */
    static options = {

      /**
       * The name of the suite.
       *
       * @type {string|string}
       */
      'name': undefined
    }

    /**
     * A flag to indicate if the suite is aborted.
     *
     * @type {boolean}
     */
    aborted = false;

    /**
     * A flag to indicate if the suite is running.
     *
     * @type {boolean}
     */
    running = false;

    /**
     * The Suite constructor.
     *
     * @memberOf Benchmark
     * @param {string} name A name to identify the suite.
     * @param {Object} [options={}] Options object.
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
    constructor(name, options) {
      super();
      var suite = this;

      this._benchmarks = [];
      // Juggle arguments.
      if (typeof name === 'object') {
        // 1 argument (options).
        options = name;
      } else {
        // 2 arguments (name [, options]).
        suite.name = name;
      }
      this.setOptions(suite, options);

      this.reverse = () => {
        this._benchmarks.reverse();

        return this;
      }

      this.shift = () => {
        return this._benchmarks.shift();
      }
    }

    get benchmarks() {
      return [...this._benchmarks];
    }

    /**
     * The number of benchmarks in the suite.
     *
     * @type {number}
     */
    get length() {
      return this._benchmarks.length;
    }

    /**
     * Sets the length of the benchmarks array for the Suite instance.
     *
     * Useful for truncating the array.
     */
    set length(value) {
      if (undefined === this._benchmarks) {
        this._benchmarks = [];
      }

      this._benchmarks.length = value;
    }

    /**
     * Aborts all benchmarks in the suite.
     *
     * @returns {Object} The suite instance.
     */
    abort() {
      var event,
          suite = this,
          resetting = calledBy.resetSuite;

      if (suite.running) {
        event = new Event('abort');
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
    add(name, fn, options) {
      var suite = this,
          bench = new Benchmark(name, fn, options),
          event = new Event({ 'type': 'add', 'target': bench });

      if (suite.emit(event), !event.cancelled) {
        this._benchmarks.push(bench);
      }
      return suite;
    }

    /**
     * Creates a new suite with cloned benchmarks.
     *
     * @param {Object} options Options object to overwrite cloned options.
     * @returns {Object} The new suite instance.
     */
    clone(options) {
      var suite = this,
          result = new suite.constructor(root.Object.assign({}, suite.options, options));

      // Copy own properties.
      root.Object.entries(suite).forEach(([key, value]) => {
        if (!has(result, key)) {
          result[key] = (typeof value?.clone === 'function')
            ? value.clone()
            : cloneDeep(value);
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
    filter(callback) {
      var suite = this,
          result = new suite.constructor(suite.options);

      const cb = Benchmark.filter(this, callback);

      result._benchmarks.push(...cb);

      return result;
    }

    /**
     * Resets all benchmarks in the suite.
     *
     * @returns {Object} The suite instance.
     */
    reset() {
      var event,
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
          (suite.emit(event = new Event('reset')), !event.cancelled)) {
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
     * @returns {Object} The suite instance.
     * @example
     *
     * // basic usage
     * suite.run();
     *
     * // or with options
     * suite.run({ 'async': true, 'queued': true });
     */
    run(options) {
      var suite = this;

      suite.reset();
      suite.running = true;
      options || (options = {});

      Benchmark.invoke(suite, {
        'name': 'run',
        'args': options,
        'queued': options.queued,
        'onStart': function(event) {
          suite.emit(event);
        },
        'onCycle': function(event) {
          var bench = event.target;
          if (bench.error) {
            suite.emit(new Event({ 'type': 'error', 'target': bench }));
          }
          suite.emit(event);
          event.aborted = suite.aborted;
        },
        'onComplete': function(event) {
          suite.running = false;
          suite.emit(event);
        }
      });
      return suite;
    }
  }

  /*------------------------------------------------------------------------*/

  /**
   * Clocks the time taken to execute a test per cycle (secs).
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @returns {number} The time taken.
   */
  function clock() {
    var
        templateData = {};

    // Lazy define for hi-res timers.
    clock = function(clone) {
      var deferred;

      if (clone instanceof Deferred) {
        deferred = clone;
        clone = deferred.benchmark;
      }
      var bench = clone._original,
          stringable = isStringable(bench.fn),
          count = bench.count = clone.count,
          decompilable = stringable || (Support.decompilation && (clone.setup !== noop || clone.teardown !== noop)),
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

      var compiled = bench.compiled = clone.compiled = createCompiled(bench, decompilable, deferred, funcBody),
          isEmpty = !(templateData.fn || stringable);

      try {
        if (isEmpty) {
          // Firefox may remove dead code from `Function#toString` results.
          // For more information see http://bugzil.la/536085.
          throw new Error('The test "' + name + '" is empty. This may be the result of dead code removal.');
        }
        else if (!deferred) {
          // Pretest to determine if compiled code exits early, usually by a
          // rogue `return` statement, by checking for a return object with the uid.
          bench.count = 1;
          compiled = decompilable && (compiled.call(bench, root, Timer.timer) || {}).uid == templateData.uid && compiled;
          bench.count = count;
        }
      } catch(e) {
        compiled = null;
        clone.error = e || new Error(root.String(e));
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

        compiled = createCompiled(bench, decompilable, deferred, funcBody);

        try {
          // Pretest one more time to check for errors.
          bench.count = 1;
          compiled.call(bench, root, Timer.timer);
          bench.count = count;
          delete clone.error;
        }
        catch(e) {
          bench.count = count;
          if (!clone.error) {
            clone.error = e || new Error(root.String(e));
          }
        }
      }
      // If no errors run the full test loop.
      if (!clone.error) {
        compiled = bench.compiled = clone.compiled = createCompiled(bench, decompilable, deferred, funcBody);
        result = compiled.call(deferred || bench, root, Timer.timer).elapsed;
      }
      return result;
    };

    /*----------------------------------------------------------------------*/

    /**
     * Creates a compiled function from the given function `body`.
     */
    function createCompiled(bench, decompilable, deferred, body) {
      var fn = bench.fn,
          fnArg = deferred ? getFirstArgument(fn) || 'deferred' : '';

      templateData.uid = uid + uidCounter++;

      root.Object.assign(templateData, {
        'setup': decompilable ? getSource(bench.setup) : interpolate('m#.setup()'),
        'fn': decompilable ? getSource(fn) : interpolate('m#.fn(' + fnArg + ')'),
        'fnArg': fnArg,
        'teardown': decompilable ? getSource(bench.teardown) : interpolate('m#.teardown()')
      });

      // Use API of chosen timer.
      if (Timer.timer.unit == 'ns') {
        root.Object.assign(templateData, {
          'begin': interpolate('s#=n#()'),
          'end': interpolate('r#=n#(s#);r#=r#[0]+(r#[1]/1e9)')
        });
      }
      else if (Timer.timer.unit == 'us') {
        if (Timer.timer.ns.stop) {
          root.Object.assign(templateData, {
            'begin': interpolate('s#=n#.start()'),
            'end': interpolate('r#=n#.microseconds()/1e6')
          });
        } else {
          root.Object.assign(templateData, {
            'begin': interpolate('s#=n#()'),
            'end': interpolate('r#=(n#()-s#)/1e6')
          });
        }
      }
      else if (Timer.timer.ns.now) {
        root.Object.assign(templateData, {
          'begin': interpolate('s#=(+n#.now())'),
          'end': interpolate('r#=((+n#.now())-s#)/1e3')
        });
      }
      else {
        root.Object.assign(templateData, {
          'begin': interpolate('s#=new n#().getTime()'),
          'end': interpolate('r#=(new n#().getTime()-s#)/1e3')
        });
      }
      // Define `timer` methods.
      Timer.timer.start = createFunction(
        interpolate('o#'),
        interpolate('var n#=this.ns,${begin};o#.elapsed=0;o#.timeStamp=s#')
      );

      Timer.timer.stop = createFunction(
        interpolate('o#'),
        interpolate('var n#=this.ns,s#=o#.timeStamp,${end};o#.elapsed=r#')
      );

      // Create compiled test.
      return createFunction(
        interpolate('window,t#'),
        'var global = window, clearTimeout = global.clearTimeout, setTimeout = global.setTimeout;\n' +
        interpolate(body)
      );
    }

    /**
     * Interpolates a given template string.
     */
    function interpolate(string) {
      function tagged(_, string) {
        let result = string;

        for (const [key, value] of root.Object.entries(templateData)) {
          result = result.replaceAll(`\${${key}}`, value);
        }

        return result;
      }

      // Replaces all occurrences of `#` with a unique number and template tokens with content.
      return tagged`${string.replace(/\#/g, /\d+/.exec(templateData.uid))}`;
    }

    /*----------------------------------------------------------------------*/

    // Resolve time span required to achieve a percent uncertainty of at most 1%.
    // For more information see http://spiff.rit.edu/classes/phys273/uncert/uncert.html.
    Benchmark.options.minTime || (Benchmark.options.minTime = root.Math.max(Timer.timer.res / 2 / 0.01, 0.05));
    return clock.apply(null, arguments);
  }

  /*------------------------------------------------------------------------*/

  /**
   * Computes stats on benchmark results.
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @param {Object} options The options object.
   */
  function compute(bench, options) {
    options || (options = {});

    var async = options.async,
        elapsed = 0,
        initCount = bench.initCount,
        minSamples = bench.minSamples,
        queue = [],
        sample = bench.stats.sample;

    /**
     * Adds a clone to the queue.
     */
    function enqueue() {
      queue.push(root.Object.assign(bench.clone(), {
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
     */
    function update(event) {
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
            bench.emit(new Event('cycle'));
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
    function evaluate(event) {
      var critical,
          df,
          mean,
          moe,
          rme,
          sd,
          sem,
          variance,
          clone = event.target,
          done = bench.aborted,
          now = (+root.Date.now()),
          size = sample.push(clone.times.period),
          maxedOut = size >= minSamples && (elapsed += now - clone.times.timeStamp) / 1e3 > bench.maxTime,
          times = bench.times,
          varOf = function(sum, x) { return sum + root.Math.pow(x - mean, 2); };

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
        sd = root.Math.sqrt(variance);
        // Compute the standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean).
        sem = sd / root.Math.sqrt(size);
        // Compute the degrees of freedom.
        df = size - 1;
        // Compute the critical value.
        critical = tTable[root.Math.round(df) || 1] || tTable.infinity;
        // Compute the margin of error.
        moe = sem * critical;
        // Compute the relative margin of error.
        rme = (moe / mean) * 100 || 0;

        root.Object.assign(bench.stats, {
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
    Benchmark.invoke(queue, {
      'name': 'run',
      'args': { 'async': async },
      'queued': true,
      'onCycle': evaluate,
      'onComplete': function() { bench.emit(new Event('complete')); }
    });
  }

  /*------------------------------------------------------------------------*/

  /**
   * Cycles a benchmark until a run `count` can be established.
   *
   * @private
   * @param {Object} clone The cloned benchmark instance.
   * @param {Object} options The options object.
   */
  function cycle(clone, options) {
    options || (options = {});

    var deferred;
    if (clone instanceof Deferred) {
      deferred = clone;
      clone = clone.benchmark;
    }
    var clocked,
        cycles,
        divisor,
        event,
        minTime,
        period,
        async = options.async,
        bench = clone._original,
        count = clone.count,
        times = clone.times;

    // Continue, if not aborted between cycles.
    if (clone.running) {
      // `minTime` is set to `Benchmark.options.minTime` in `clock()`.
      cycles = ++clone.cycles;
      clocked = deferred ? deferred.elapsed : clock(clone);
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
        // Tests may clock at `0` when `initCount` is a small number,
        // to avoid that we set its count to something a bit higher.
        if (!clocked && (divisor = divisors[clone.cycles]) != null) {
          count = root.Math.floor(4e6 / divisor);
        }
        // Calculate how many more iterations it will take to achieve the `minTime`.
        if (count <= clone.count) {
          count += root.Math.ceil((minTime - clocked) / period);
        }
        clone.running = count != Infinity;
      }
    }
    // Should we exit early?
    event = new Event('cycle');
    clone.emit(event);
    if (event.aborted) {
      clone.abort();
    }
    // Figure out what to do next.
    if (clone.running) {
      // Start a new cycle.
      clone.count = count;
      if (deferred) {
        clone.compiled.call(deferred, root, Timer.timer);
      } else if (async) {
        delay(clone, function() { cycle(clone, options); });
      } else {
        cycle(clone);
      }
    }
    else {
      // Fix TraceMonkey bug associated with clock fallbacks.
      // For more information see http://bugzil.la/509069.
      if (Support.browser) {
        runScript(uid + '=1;delete ' + uid);
      }
      // We're done.
      clone.emit(new Event('complete'));
    }
  }

  /*--------------------------------------------------------------------------*/

  // Export Benchmark.
  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Define as an anonymous module so, through path mapping, it can be aliased.
    define(function() {
      return Benchmark;
    });
  }
  else {
    // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
    if (freeExports && freeModule) {
      // Export for Node.js.
      if (moduleExports) {
        (freeModule.exports = Benchmark).Benchmark = Benchmark;
      }
      // Export for CommonJS support.
      freeExports.Benchmark = Benchmark;
    }
    else {
      // Export to the global object.
      root.Benchmark = Benchmark;
    }
  }
}.call(this));
