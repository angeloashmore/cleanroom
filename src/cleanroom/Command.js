import ajv from './ajv';
import defaults from 'json-schema-defaults';
import merge from 'deepmerge';
import Outcome from './Outcome';
import {
  CommandNotInitializedError,
  NotImplementedError,
  NotUsedError,
  ValidationError,
} from './errors';

export default class Command {
  static schema = {}

  static execute() {
    throw new NotImplementedError();
  }

  static run() {
    throw new CommandNotInitializedError();
  }

  static runExplicitly() {
    throw new CommandNotInitializedError();
  }

  static runPromise() {
    throw new CommandNotInitializedError();
  }

  static _run(Class) {
    return function run(inputs) {
      inputs = merge(defaults(Class.schema), inputs);

      const validate = ajv.compile(Class.schema);
      const valid = validate(inputs);
      const result = valid ? Class.execute(inputs) : null;

      return new Outcome(valid, result, validate.errors, inputs);
    };
  }

  static _runExplicitly(Class) {
    return function runExplicitly(inputs) {
      const outcome = Class.run(inputs);

      if (!outcome.success) throw new ValidationError(outcome.errors);

      return outcome.result;
    };
  }

  static _runPromise(Class) {
    return function runPromise(inputs) {
      return new Promise(function promise(resolve, reject) {
        const outcome = Class.run(inputs);

        if (!outcome.success) reject(outcome.errors);

        resolve(outcome.result);
      });
    };
  }

  constructor() {
    throw new NotUsedError();
  }
}
