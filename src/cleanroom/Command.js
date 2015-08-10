import skeemas from 'skeemas';
import {
  CommandNotInitializedError,
  NotImplementedError,
  NotUsedError,
} from './errors';

export default class Command {
  static schema = {}

  static execute() {
    throw new NotImplementedError();
  }

  static run() {
    throw new CommandNotInitializedError();
  }

  static _run(Class) {
    return function run(inputs) {
      return new Promise(function promise(resolve, reject) {
        const validation = skeemas.validate(inputs, Class.schema);

        if (validation.valid) {
          const result = Class.execute(inputs);
          resolve(result);
        } else {
          reject(validation.errors);
        }
      });
    };
  }

  constructor() {
    throw new NotUsedError();
  }
}
