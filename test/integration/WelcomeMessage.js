import { expect } from 'chai';
import WelcomeMessage from '../fixtures/WelcomeMessage';
import Outcome from '../../src/cleanroom/Outcome';
import { ValidationError } from '../../src/cleanroom/errors';

const validInputs = {
  name: 'Angelo Ashmore',
  email: 'name@example.com',
};

const invalidInputs = {
  name: 0,
  email: 'invalid_email',
};

describe('WelcomeMessage', () => {
  describe('::run()', () => {
    describe('with valid inputs', () => {
      it('should return an instance of Outcome with the correct properties', () => {
        const outcome = WelcomeMessage.run(validInputs);

        expect(outcome).to.be.an.instanceOf(Outcome);
        expect(outcome.success).to.be.true;
        expect(outcome.result).to.equal('Welcome, Angelo Ashmore (name@example.com)');
        expect(outcome.errors).to.deep.equal([]);
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

  describe('::runExplicit()', () => {
    describe('with valid inputs', () => {
      it('should return the correct message', () => {
        const outcome = WelcomeMessage.runExplicit(validInputs);

        expect(outcome).to.equal('Welcome, Angelo Ashmore (name@example.com)');
      });
    });

    describe('with invalid inputs', () => {
      it('should throw a ValidationError', () => {
        const outcome = () => WelcomeMessage.runExplicit(invalidInputs);

        expect(outcome).to.throw(ValidationError);
      });
    });
  });
});
