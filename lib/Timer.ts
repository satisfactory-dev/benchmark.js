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
} from './Benchmark.ts';

import {
  Deferred,
} from './Deferred.ts';

import {
  createFunction,
  getMean,
  interpolate,
  isHostType,
} from './utility.ts';

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

      /** Used to access Node.js's high resolution timer. */
      const processObject = isHostType(globalThis, 'process') && globalThis.process;

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

export default Timer;
