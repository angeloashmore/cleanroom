import Command from './Command';
import { NotUsedError } from './errors';

export default class Cleanroom {
  static Command = Command;

  static initCommand(Class) {
    Class.run = Class._run(Class);
    Class.runExplicit = Class._runExplicit(Class);
  }

  constructor() {
    throw new NotUsedError();
  }
}
