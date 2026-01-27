/*!
 * Benchmark.js
 * Copyright 2026 SignpostMarv
 * Copyright 2010-2016 Mathias Bynens
 * Based on JSLitmus.js, copyright Robert Kieffer
 * Modified by John-David Dalton
 * Available under MIT license
 */

import type {
  ClonedBenchmark,
  CompiledBenchmark,
} from './Benchmark.ts';

import type Timer from './Timer.ts';
import { clock, cycle } from './utility.ts';

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

export type {
  DeferredWithTeardown,
};

export {
  Deferred,
}
