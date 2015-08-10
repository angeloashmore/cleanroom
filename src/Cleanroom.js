import Command from './cleanroom/Command';
import { NotUsedError } from './cleanroom/errors';

export default class Cleanroom {
  static Command = Command;

  static initCommand(Class) {
    Class.run = Class._run(Class);
  }

  constructor() {
    throw new NotUsedError();
  }
}
