import Cleanroom from '../../src/Cleanroom';

export default class WelcomeMessage extends Cleanroom.Command {
  static schema = {
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
    required: ['name', 'email'],
  };

  static execute(inputs) {
    return `Welcome, ${inputs.name} (${inputs.email})`;
  }
}

Cleanroom.initCommand(WelcomeMessage);
