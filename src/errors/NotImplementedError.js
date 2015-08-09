import ExtendableError from 'es6-error';

export default class NotImplementedError extends ExtendableError {
  constructor(message = 'Not implemented') {
    super(message);
  }
}
