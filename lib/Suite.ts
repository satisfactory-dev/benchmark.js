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
  BenchmarkOptions,
  RunOptions,
} from './Benchmark.ts';

import {
  Event,
  EventWithTarget,
} from './Events.ts';
import {
  EventTarget,
} from './Events.ts';
import Timer from './Timer.ts';
import { cloneDeep, has } from './utility.ts';

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

type SuiteRunOptions<
  T extends (Benchmark[]) | Suite = (Benchmark[]) | Suite,
> = (
  & SuiteInvokeOptions<'run', T>
  & {
    args: RunOptions,
    queued: boolean,
  }
);

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
        resetting = Suite.calledBy.resetSuite;

    if (suite.running) {
      const event = new Event<typeof this, 'abort'>('abort');
      suite.emit(event);
      if (!event.cancelled || resetting) {
        // Avoid infinite recursion.
        Suite.calledBy.abortSuite = true;
        suite.reset();
        delete Suite.calledBy.abortSuite;

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
        aborting = Suite.calledBy.abortSuite;

    if (suite.running && !aborting) {
      // No worries, `resetSuite()` is called within `abortSuite()`.
      Suite.calledBy.resetSuite = true;
      suite.abort();
      delete Suite.calledBy.resetSuite;
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

export type {
  SuiteInvokeOptions,
  SuiteRunOptions,
}

export {
  Suite,
};
