import { expect } from 'chai';
import Command from '../../src/cleanroom/Command';
import {
  CommandNotInitializedError,
  NotImplementedError,
  NotUsedError
} from '../../src/cleanroom/errors';

describe('Command', () => {
  describe('::schema', () => {
    it('should return an empty object', () => {
      expect(Command.schema).to.deep.equal({});
    });
  });

  describe('::run()', () => {
    it('should throw a CommandNotInitializedError', () => {
      expect(Command.run).to.throw(CommandNotInitializedError);
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
