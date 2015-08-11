import { expect } from 'chai';
import Cleanroom from '../../src/Cleanroom';
import Command from '../../src/cleanroom/Command';
import { NotUsedError } from '../../src/cleanroom/errors';

describe('Cleanroom', () => {
  describe('::Command', () => {
    it('should return Command', () => {
      expect(Cleanroom.Command).to.equal(Command);
    });
  });

  describe('::initCommand()', () => {
    it('should add ::run, ::runExplicitly, and ::runPromise to a Command', () => {
      class TestCommand extends Cleanroom.Command {}
      Cleanroom.initCommand(TestCommand);

      expect(TestCommand.run).to.be.a('function');
      expect(TestCommand.runExplicitly).to.be.a('function');
      expect(TestCommand.runPromise).to.be.a('function');
    });
  });

  describe('#constructor()', () => {
    it('should throw a NotUsedError', () => {
      expect(() => new Cleanroom()).to.throw(NotUsedError);
    });
  });
});
