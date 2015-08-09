export default class Outcome {
  constructor(success, result, errors, inputs) {
    this.success = success;
    this.result = result;
    this.errors = errors;
    this.inputs = inputs;

    Object.freeze(this);
  }
}
