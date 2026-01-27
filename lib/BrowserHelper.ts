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
} from '../benchmark.ts';

/**
 * Helper class for running scripts in-browser
 *
 * @private
 */
class BrowserHelper {
  static #uid: `uid${number}`|undefined;

  /**
   * Used to integrity check compiled tests.
   */
  static get uid() {
    if (undefined === this.#uid) {
      this.#uid = `uid${+Date.now()}`;
    }

    return this.#uid;
  }

  /**
   * @type {Document}
   */
  #doc: Document;

  /**
   * @type {HTMLDivElement}
   */
  #trash: HTMLDivElement;

  /**
   * @param {Document} doc
   */
  constructor(doc: Document) {
    this.#doc = doc;
    this.#trash = doc.createElement('div');
  }

  /**
   * Destroys the given element.
   *
   * @param {Element} element The element to destroy.
   */
  #destroyElement(element: Element) {
    this.#trash.appendChild(element);
    this.#trash.innerHTML = '';
  }

  /**
   * Runs a snippet of JavaScript via script injection.
   *
   * @param {string} code The code to run.
   */
  runScript(code: string) {
    var anchor = Benchmark.anchor,
          script = this.#doc.createElement('script'),
          sibling: HTMLScriptElement | null = this.#doc.getElementsByTagName('script')[0],
        parent: Node | null | undefined = sibling.parentNode,
        prop = BrowserHelper.uid + 'runScript',
        prefix = '(' + 'Benchmark.anchor.' + prop + '||function(){})();';

    // Firefox 2.0.0.2 cannot use script injection as intended because it executes
    // asynchronously, but that's OK because script injection is only used to avoid
    // the previously commented JaegerMonkey bug.
    try {
      // Remove the inserted script *before* running the code to avoid differences
      // in the expected script element count/order of the document.
        script.appendChild(this.#doc.createTextNode(prefix + code));
        anchor[prop] = () => { this.#destroyElement(script); };
    } catch(e) {
      parent = parent?.cloneNode(false);
      sibling = null;
      script.text = code;
    }
    parent?.insertBefore(script, sibling);
    delete anchor[prop];
  }
}

export default BrowserHelper;
