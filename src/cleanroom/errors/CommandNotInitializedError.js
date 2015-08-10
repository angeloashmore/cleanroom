import ExtendableError from 'es6-error';

export default class CommandNotInitializedError extends ExtendableError {
  constructor(message = 'Command not initialized. Call `Cleanroom.initCommand(<Your Command>)` before running the command.') {
    super(message);
  }
}
