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
} from './lib/Benchmark.ts';

import type {
  cycleFormatter,
} from './lib/Suite.ts';
import {
  Suite,
} from './lib/Suite.ts';

// Export Benchmark.
export default Benchmark;

export type {
  cycleFormatter,
}

export {
  Benchmark,
  Suite,
}
