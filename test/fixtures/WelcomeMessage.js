import Cleanroom from '../../src/Cleanroom';

export default class WelcomeMessage extends Cleanroom.Command {
  static schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      private: { type: 'boolean', default: true },
    },
    required: ['name', 'email', 'private'],
    additionalProperties: false,
  };

  static execute(inputs) {
    return `Welcome, ${inputs.name} (${inputs.email})`;
  }
}

Cleanroom.initCommand(WelcomeMessage);
