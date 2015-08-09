import ExtendableError from 'es6-error';

export default class NotUsedError extends ExtendableError {
  constructor(message = 'Not used') {
    super(message);
  }
}
