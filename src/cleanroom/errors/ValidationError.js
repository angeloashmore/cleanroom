import ExtendableError from 'es6-error';

export default class ValidationError extends ExtendableError {
  constructor(message = 'Invalid inputs') {
    super(message);
  }
}
