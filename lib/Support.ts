/*!
 * Benchmark.js
 * Copyright 2026 SignpostMarv
 * Copyright 2010-2016 Mathias Bynens
 * Based on JSLitmus.js, copyright Robert Kieffer
 * Modified by John-David Dalton
 * Available under MIT license
 */

import BrowserHelper from './BrowserHelper.ts';

import {
  isHostType,
} from './utility.ts';

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
      const doc = isHostType(globalThis, 'document') && globalThis.document;
      if(doc && isHostType(globalThis, 'navigator')) {
        this.#browser = new BrowserHelper(doc);
      } else {
        this.#browser = false;
      }
    }

    return this.#browser;
  }
}

export default Support;
