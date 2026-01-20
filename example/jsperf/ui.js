/*!
 * ui.js
 * Copyright Mathias Bynens
 * Modified by John-David Dalton
 * Available under MIT license
 */
(function(window, document) {

  /** Cache of error messages */
  var errors = [];

  /** Google Analytics account id */
  var gaId = '';

  /** Cache of event handlers */
  var handlers = {};

  /** A flag to indicate that the page has loaded */
  var pageLoaded = false;

  /** Benchmark results element id prefix (e.g. `results-1`) */
  var prefix = 'results-';

  /** The element responsible for scrolling the page (assumes ui.js is just before </body>) */
  var scrollEl = document.body;

  /** Used to resolve a value's internal [[Class]] */
  var toString = {}.toString;

  /** Namespace */
  var ui = new Benchmark.Suite;

  /** Object containing various CSS class names */
  var classNames = {
    // used for error styles
    'error': 'error',
    // used to make content visible
    'show': 'show',
    // used to reset result styles
    'results': 'results'
  };

  /** Used to flag environments/features */
  var has = {
    // used for pre-populating form fields
    'localStorage': !!function() {
      try {
        return !localStorage.getItem(+new Date);
      } catch(e) {}
    }(),
    // used to distinguish between a regular test page and an embedded chart
    'runner': !!$('runner')
  };

  /** Object containing various text messages */
  var texts = {
    // inner text for the various run button states
    'run': {
      'again': 'Run again',
      'ready': 'Run tests',
      'running': 'Stop running'
    },
    // common status values
    'status': {
      'again': 'Done. Ready to run again.',
      'ready': 'Ready to run.'
    }
  };

  /** The options object for Benchmark.Suite#run */
  var runOptions = {
    'async': true,
    'queued': true
  };

  /** API shortcuts */
  var filter = Benchmark.filter,
      formatNumber = Benchmark.formatNumber,
      join = Benchmark.join;

  /*--------------------------------------------------------------------------*/

  handlers.benchmark = {

    /**
     * The onCycle callback, used for onStart as well, assigned to new benchmarks.
     *
     * @private
     */
    'cycle': function() {
      var bench = this,
          size = bench.stats.sample.length;

      if (!bench.aborted) {
        setStatus(bench.name + ' &times; ' + formatNumber(bench.count) + ' (' +
          size + ' sample' + (size == 1 ? '' : 's') + ')');
      }
    },

    /**
     * The onStart callback assigned to new benchmarks.
     *
     * @private
     */
    'start': function() {
        // call user provided init() function
        if (isFunction(window.init)) {
          init();
        }
    }
  };

  handlers.button = {

    /**
     * The "run" button click event handler used to run or abort the benchmarks.
     *
     * @private
     */
    'run': function() {
      var stopped = !ui.running;
      ui.abort();
      ui.length = 0;

      if (stopped) {
        logError({ 'clear': true });
        ui.push.apply(ui, ui.benchmarks.filter((bench) => {
          return !bench.error && bench.reset();
        }));
        ui.run(runOptions);
      }
    }
  };

  handlers.title = {

    /**
     * The title table cell click event handler used to run the corresponding benchmark.
     *
     * @private
     * @param {Object} event The event object.
     */
    'click': function(event) {
      event || (event = window.event);

      var id,
          index,
          target = event.target || event.srcElement;

      while (target && !(id = target.id)) {
        target = target.parentNode;
      }
      index = id && --id.split('-')[1] || 0;
      ui.push(ui.benchmarks[index].reset());
      ui.running ? ui.render(index) : ui.run(runOptions);
    },

    /**
     * The title cell keyup event handler used to simulate a mouse click when hitting the ENTER key.
     *
     * @private
     * @param {Object} event The event object.
     */
    'keyup': function(event) {
      if (13 == (event || window.event).keyCode) {
        handlers.title.click(event);
      }
    }
  };

  handlers.window = {
    /**
     * The window load event handler used to initialize the UI.
     *
     * @private
     */
    'load': function() {
      // only for pages with a comment form
      if (has.runner) {
        // init the ui
        addClass('controls', classNames.show);
        addListener('run', 'click', handlers.button.run);

        setHTML('run', texts.run.ready);
        setStatus(texts.status.ready);
      }
      // clear length so tests can be manually queued
      ui.length = 0;

      // evaluate hash values after all other "load" events have fired
      requestIdleCallback(function() {
        pageLoaded = true;
      });
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Shortcut for document.getElementById().
   *
   * @private
   * @param {Element|string} id The id of the element to retrieve.
   * @returns {Element} The element, if found, or null.
   */
  function $(id) {
    return typeof id == 'string' ? document.getElementById(id) : id;
  }

  /**
   * Adds a CSS class name to an element's className property.
   *
   * @private
   * @param {Element|string} element The element or id of the element.
   * @param {string} className The class name.
   * @returns {Element} The element.
   */
  function addClass(element, className) {
    if ((element = $(element)) && !hasClass(element, className)) {
      element.className += (element.className ? ' ' : '') + className;
    }
    return element;
  }

  /**
   * Registers an event listener on an element.
   *
   * @private
   * @param {Element|string} element The element or id of the element.
   * @param {string} eventName The name of the event.
   * @param {Function} handler The event handler.
   * @returns {Element} The element.
   */
  function addListener(element, eventName, handler) {
    if ((element = $(element))) {
      if (typeof element.addEventListener != 'undefined') {
        element.addEventListener(eventName, handler, false);
      } else if (typeof element.attachEvent != 'undefined') {
        element.attachEvent('on' + eventName, handler);
      }
    }
    return element;
  }

  /**
   * Appends to an element's innerHTML property.
   *
   * @private
   * @param {Element|string} element The element or id of the element.
   * @param {string} html The HTML to append.
   * @returns {Element} The element.
   */
  function appendHTML(element, html) {
    if ((element = $(element)) && html != null) {
      element.innerHTML += html;
    }
    return element;
  }

  /**
   * Shortcut for document.createElement().
   *
   * @private
   * @param {string} tag The tag name of the element to create.
   * @returns {Element} A new element of the given tag name.
   */
  function createElement(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Checks if an element is assigned the given class name.
   *
   * @private
   * @param {Element|string} element The element or id of the element.
   * @param {string} className The class name.
   * @returns {boolean} If assigned the class name return true, else false.
   */
  function hasClass(element, className) {
    return !!(element = $(element)) &&
      (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }

  /**
   * Set an element's innerHTML property.
   *
   * @private
   * @param {Element|string} element The element or id of the element.
   * @param {string} html The HTML to set.
   * @returns {Element} The element.
   */
  function setHTML(element, html) {
    if ((element = $(element))) {
      element.innerHTML = html == null ? '' : html;
    }
    return element;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Gets the Hz, i.e. operations per second, of `bench` adjusted for the
   * margin of error.
   *
   * @private
   * @param {Object} bench The benchmark object.
   * @returns {number} Returns the adjusted Hz.
   */
  function getHz(bench) {
    return 1 / (bench.stats.mean + bench.stats.moe);
  }

  /**
   * Checks if a value has an internal [[Class]] of Function.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {boolean} Returns `true` if the value is a function, else `false`.
   */
  function isFunction(value) {
    return toString.call(value) == '[object Function]';
  }

  /**
   * Appends to or clears the error log.
   *
   * @private
   * @param {string|Object} text The text to append or options object.
   */
  function logError(text) {
    var table,
        div = $('error-info'),
        options = {};

    // juggle arguments
    if (typeof text == 'object' && text) {
      options = text;
      text = options.text;
    }
    else if (arguments.length) {
      options.text = text;
    }
    if (!div) {
      table = $('test-table');
      div = createElement('div');
      div.id = 'error-info';
      table.parentNode.insertBefore(div, table.nextSibling);
    }
    if (options.clear) {
      div.className = div.innerHTML = '';
      errors.length = 0;
    }
    if ('text' in options && errors.indexOf(text) < 0) {
      errors.push(text);
      addClass(div, classNames.show);
      appendHTML(div, text);
    }
  }

  /**
   * Sets the status text.
   *
   * @private
   * @param {string} text The text to write to the status.
   */
  function setStatus(text) {
    setHTML('status', text);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Renders the results table cell of the corresponding benchmark(s).
   *
   * @static
   * @memberOf ui
   * @param {number} [index] The index of the benchmark to render.
   * @returns {Object} The suite instance.
   */
  function render(index) {
    (index == null ? (index = 0, ui.benchmarks) : [ui.benchmarks[index]]).forEach((bench) => {
      var parsed,
          cell = $(prefix + (++index)),
          error = bench.error,
          hz = bench.hz;

      // reset title and class
      cell.title = '';
      cell.className = classNames.results;

      // status: error
      if (error) {
        setHTML(cell, 'Error');
        addClass(cell, classNames.error);
        parsed = join(error, '</li><li>');
        logError('<p>' + error + '.</p>' + (parsed ? '<ul><li>' + parsed + '</li></ul>' : ''));
      }
      else {
        // status: running
        if (bench.running) {
          setHTML(cell, 'running&hellip;');
        }
        // status: completed
        else if (bench.cycles) {
          // obscure details until the suite has completed
          if (ui.running) {
            setHTML(cell, 'completed');
          }
          else {
            cell.title = 'Ran ' + formatNumber(bench.count) + ' times in ' +
              bench.times.cycle.toFixed(3) + ' seconds.';
            setHTML(cell, formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) +
              ' <small>&plusmn;' + bench.stats.rme.toFixed(2) + '%</small>');
          }
        }
        else {
          // status: pending
          if (ui.running) {
            setHTML(cell, 'pending&hellip;');
          }
          // status: ready
          else {
            setHTML(cell, 'ready');
          }
        }
      }
    });
    return ui;
  }

  /*--------------------------------------------------------------------------*/

  ui.on('add', function(event) {
    var bench = event.target,
        index = ui.benchmarks.length,
        id = index + 1,
        title = $('title-' + id);

    ui.benchmarks.push(bench);

    if (has.runner) {
      title.tabIndex = 0;
      title.title = 'Click to run this test again.';

      addListener(title, 'click', handlers.title.click);
      addListener(title, 'keyup', handlers.title.keyup);

      bench.on('start', handlers.benchmark.start);
      bench.on('start cycle', handlers.benchmark.cycle);
      ui.render(index);
    }
  })
  .on('start cycle', function() {
    ui.render();
    setHTML('run', texts.run.running);
  })
  .on('complete', function() {
    var benches = filter(ui.benchmarks, 'successful'),
        fastest = filter(benches, 'fastest'),
        slowest = filter(benches, 'slowest');

    ui.render();
    setHTML('run', texts.run.again);
    setStatus(texts.status.again);

    // highlight result cells
    benches.forEach((bench) => {
      var cell = $(prefix + (ui.benchmarks.indexOf(bench) + 1)),
          fastestHz = getHz(fastest[0]),
          hz = getHz(bench),
          percent = (1 - (hz / fastestHz)) * 100,
          span = cell.getElementsByTagName('span')[0],
          text = 'fastest';

      if (fastest.indexOf(bench) > -1) {
        // mark fastest
        addClass(cell, text);
      }
      else {
        text = isFinite(hz)
          ? formatNumber(percent < 1 ? percent.toFixed(2) : Math.round(percent)) + '% slower'
          : '';

        // mark slowest
        if (slowest.indexOf(bench) > -1) {
          addClass(cell, 'slowest');
        }
      }
      // write ranking
      if (span) {
        setHTML(span, text);
      } else {
        appendHTML(cell, '<span>' + text + '</span>');
      }
    });
  });

  /*--------------------------------------------------------------------------*/

  /**
   * An array of benchmarks created from test cases.
   *
   * @memberOf ui
   * @type Array
   */
  ui.benchmarks = [];

  /**
   * The parsed query parameters of the pages url hash.
   *
   * @memberOf ui
   * @type Object
   */
  ui.params = {};

  // (re)render the results of one or more benchmarks
  ui.render = render;

  /*--------------------------------------------------------------------------*/

  // expose
  window.ui = ui;

  // don't let users alert, confirm, prompt, or open new windows
  window.alert = window.confirm = window.prompt = window.open = function() {};

  // parse hash query params when it changes
  addListener(window, 'hashchange', handlers.window.hashchange);

  // bootstrap onload
  addListener(window, 'load', handlers.window.load);

  /*--------------------------------------------------------------------------*/

  // fork for runner or embedded chart
  if (has.runner) {
    // detect the scroll element
    (function() {
      var scrollTop,
          div = document.createElement('div'),
          body = document.body,
          bodyStyle = body.style,
          bodyHeight = bodyStyle.height,
          html = document.documentElement,
          htmlStyle = html.style,
          htmlHeight = htmlStyle.height;

      bodyStyle.height  = htmlStyle.height = 'auto';
      div.style.cssText = 'display:block;height:9001px;';
      body.insertBefore(div, body.firstChild);
      scrollTop = html.scrollTop;

      // set `scrollEl` that's used in `handlers.window.hashchange()`
      if (html.clientWidth !== 0 && ++html.scrollTop && html.scrollTop == scrollTop + 1) {
        scrollEl = html;
      }
      body.removeChild(div);
      bodyStyle.height = bodyHeight;
      htmlStyle.height = htmlHeight;
      html.scrollTop = scrollTop;
    }());

    // catch and display errors from the "preparation code"
    window.onerror = function(message, fileName, lineNumber) {
      logError('<p>' + message + '.</p><ul><li>' + join({
        'message': message,
        'fileName': fileName,
        'lineNumber': lineNumber
      }, '</li><li>') + '</li></ul>');
      scrollEl.scrollTop = $('error-info').offsetTop;
    };
  }
  else {
    // short circuit unusable methods
    ui.render = function() {};
    ui.off('start cycle complete');
    setTimeout(function() {
      ui.off();
      Object.values(ui.benchmarks).forEach((benchmark) => {
        benchmark.off();
      })
    }, 1);
  }

  /*--------------------------------------------------------------------------*/

  // optimized asynchronous Google Analytics snippet based on
  // https://mathiasbynens.be/notes/async-analytics-snippet
  if (gaId) {
    (function() {
      var script = createElement('script'),
          sibling = document.getElementsByTagName('script')[0];

      window._gaq = [['_setAccount', gaId], ['_trackPageview']];
      script.src = 'https://www.google-analytics.com/ga.js';
      sibling.parentNode.insertBefore(script, sibling);
    }());
  }
}(this, document));
