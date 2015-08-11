import { expect } from 'chai';
import WelcomeMessage from '../fixtures/WelcomeMessage';
import Outcome from '../../src/cleanroom/Outcome';
import { ValidationError } from '../../src/cleanroom/errors';

describe('WelcomeMessage', () => {
  let validInputs;
  let validInputsWithoutExtras;
  let invalidInputs;

  beforeEach(() => {
    validInputs = {
      name: 'Angelo Ashmore',
      email: 'name@example.com',
      extraInput: 'extraInput',
    };

    validInputsWithoutExtras = Object.assign({}, validInputs);
    delete validInputsWithoutExtras.extraInput;

    invalidInputs = {
      name: 0,
      email: 'invalid_email',
    };
  });

  describe('::run()', () => {
    describe('with valid inputs', () => {
      it('should return an instance of Outcome with the correct properties', () => {
        const outcome = WelcomeMessage.run(validInputs);

        expect(outcome).to.be.an.instanceOf(Outcome);
        expect(outcome.success).to.be.true;
        expect(outcome.result).to.equal('Welcome, Angelo Ashmore (name@example.com)');
        expect(outcome.errors).to.be.null;
        expect(outcome.inputs).to.deep.equal(validInputsWithoutExtras);
      });
    });

    describe('with invalid inputs', () => {
      it('should return an instance of Outcome with the correct properties', () => {
        const outcome = WelcomeMessage.run(invalidInputs);

        expect(outcome).to.be.an.instanceOf(Outcome);
        expect(outcome.success).to.be.false;
        expect(outcome.result).to.be.null;
        expect(outcome.errors.length).to.equal(2);
      });
    });
  });

  describe('::runExplicitly()', () => {
    describe('with valid inputs', () => {
      it('should return the correct message', () => {
        const outcome = WelcomeMessage.runExplicitly(validInputs);

        expect(outcome).to.equal('Welcome, Angelo Ashmore (name@example.com)');
      });
    });

    describe('with invalid inputs', () => {
      it('should throw a ValidationError', () => {
        const outcome = () => WelcomeMessage.runExplicitly(invalidInputs);

        expect(outcome).to.throw(ValidationError);
      });
    });
  });

  describe('::runPromise()', () => {
    describe('with valid inputs', () => {
      it('should return a Promise with the correct resolved value', done => {
        let resolved;
        let rejected;

        const outcome = WelcomeMessage.runPromise(validInputs)
          .then(value => resolved = value)
          .catch(errors => rejected = errors)
          .then(() => {
            expect(outcome).to.be.an.instanceOf(Promise);
            expect(resolved).to.equal('Welcome, Angelo Ashmore (name@example.com)');
            expect(rejected).to.be.undefined;
          })
          .then(done).catch(done);
      });
    });

    describe('with invalid inputs', () => {
      it('should return a Promise with the correct rejected value', done => {
        let resolved;
        let rejected;

        const outcome = WelcomeMessage.runPromise(invalidInputs)
          .then(value => resolved = value)
          .catch(errors => rejected = errors)
          .then(() => {
            expect(outcome).to.be.an.instanceOf(Promise);
            expect(resolved).to.be.undefined;
            expect(rejected.length).to.equal(2);
          })
          .then(done).catch(done);
      });
    });
  });
});
