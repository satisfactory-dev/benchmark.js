/*!
 * Benchmark.js
 * Copyright 2026 SignpostMarv
 * Copyright 2010-2016 Mathias Bynens
 * Based on JSLitmus.js, copyright Robert Kieffer
 * Modified by John-David Dalton
 * Available under MIT license
 */

import type {
  Benchmark,
  ClonedBenchmark,
} from './Benchmark.ts';

import type {
  Suite,
} from './Suite.ts';

import {
  cloneDeep,
  has,
} from './utility.ts';

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

type EventWithTarget<
  T extends EventTarget | (Benchmark[]) = EventTarget | (Benchmark[]),
  Type extends string = string,
> = (
  & Omit<Event<T, Type>, 'target'>
  & {
    target: T,
  }
)

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
   * Used to avoid infinite recursion when methods call each other.
   *
   * @type {{abort?: true, abortSuite?: true, reset?: true, resetSuite?: true}}
   */
  static calledBy: { abort?: true; abortSuite?: true; reset?: true; resetSuite?: true; } = {};

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
          !has(this, key)
        ) {
          this[key as keyof this] = cloneDeep(value as (typeof this)[keyof this]);
        }
      }
    });
  }
}

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

export type {
  EventWithTarget,
  EventOptions,
}

export {
  EventTarget,
  Event,
}
