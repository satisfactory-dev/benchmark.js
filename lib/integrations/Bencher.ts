/*!
 * Benchmark.js
 * Copyright 2026 SignpostMarv
 */

import type{
  Benchmark,
} from '../Benchmark.ts';

import type {
  cycleFormatter,
  Suite,
} from '../Suite.ts';

// awaiting clarification re: https://github.com/bencherdev/bencher/discussions/650
type BMF = {
  [key: string]: {
    [key: string]: (
      | {
        value: number,
        lower_value: number,
      }
      | {
        value: number,
        upper_value: number,
      }
      | {
        value: number,
        lower_value: number,
        upper_value: number,
      }
    ),
  }
};

function extractStats (
  suite: Suite,
  benchmark: Benchmark,
) {
  const {
    sample,
    ...stats
  } = benchmark.stats

  return {
    suite: `${suite.name}`,
    benchmark: `${benchmark.name}`,
    stats: {...stats},
    sample,
    hz: benchmark.hz,
  }
}

function bencherReduction<T>(
  reducer: (was: BMF, is: T) => BMF,
  ...results: T[]
): BMF {
  return results.reduce(reducer, {});
}

type bencherFormatter<T> = (
  cycleFormatter: cycleFormatter<T>,
  reducer: (was: BMF, is: T) => BMF,
  suiteSets: [Suite, ...Suite[]][],
) => AsyncGenerator<BMF>;

async function bencherLogger<T>(
  cycleFormatter: cycleFormatter<T>,
  reducer: (was: BMF, is: T) => BMF,
  bencherFormatter: bencherFormatter<T>,
  suiteSets: [Suite, ...Suite[]][],
  stream: NodeJS.WritableStream | WritableStreamDefaultWriter,
): Promise<void> {
  for await (const result of bencherFormatter(cycleFormatter, reducer, suiteSets)) {
    stream.write(JSON.stringify(result));
    stream.write('\n');
  }
}

export type {
  BMF,
}
export {
  bencherReduction,
  bencherFormatter,
  bencherLogger,
  extractStats,
};
