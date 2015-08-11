import skeemas from 'skeemas';
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

  static runExplicit() {
    throw new CommandNotInitializedError();
  }

  static _run(Class) {
    return function run(inputs) {
      const validation = skeemas.validate(inputs, Class.schema);
      const result = validation.valid ? Class.execute(inputs) : null;
      return new Outcome(validation.valid, result, validation.errors, inputs);
    };
  }

  static _runExplicit(Class) {
    return function runExplicit(inputs) {
      const outcome = Class.run(inputs);

      if (!outcome.success) throw new ValidationError(outcome.errors);

      return outcome.result;
    };
  }

  constructor() {
    throw new NotUsedError();
  }
}
