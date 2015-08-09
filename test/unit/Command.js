import { expect } from 'chai';
import Command from '../../src/Command';
import { NotImplementedError, NotUsedError } from '../../src/errors';

describe('Command', () => {
  describe('::schema', () => {
    it('should return an empty object', () => {
      expect(Command.schema).to.deep.equal({});
    });
  });

  describe('::execute()', () => {
    it('should return a function', () => {
      expect(Command.execute).to.be.a('function');
    });

    it('should throw a NotImplementedError when called', () => {
      expect(Command.execute).to.throw(NotImplementedError);
    });
  });

  describe('#constructor()', () => {
    it('should throw a NotUsedError', () => {
      expect(() => new Command()).to.throw(NotUsedError);
    });
  });
});
