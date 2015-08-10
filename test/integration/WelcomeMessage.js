import { expect } from 'chai';
import WelcomeMessage from '../fixtures/WelcomeMessage';

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
      it('should return a Promise with the correct resolved value', done => {
        let resolved;
        let rejected;

        const outcome = WelcomeMessage.run(validInputs)
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
      it('should return an instance of Outcome with the correct properties', done => {
        let resolved;
        let rejected;

        const outcome = WelcomeMessage.run(invalidInputs)
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
