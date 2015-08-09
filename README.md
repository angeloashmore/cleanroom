# Cleanroom
Compose your business logic into commands that validate input.

## Installation

~~~ shell
npm install cleanroom --save
~~~

## Example

~~~ js
import Cleanroom from 'cleanroom';

class UserSignUp extends Cleanroom.Command {
  static schema = {
    properties: {
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      newsletter_subscribe: { type: 'boolean' }
    },
    required: ['email', 'name']
  }

  static execute(inputs) {
    const user = new User(inputs);

    // Do something with the user like save to a database.
    // ...

    return user;
  }
}

// Sometime later in a file far, far away....
function signUpAction(inputs) {
  const outcome = UserSignUp.run(inputs)

  // Then check to see if it worked:
  if (outcome.success) {
    return { message: `Great success, ${outcome.result.name}!` };
  } else {
    return { errors: outcome.errors };
  }
}
~~~

Some things to note about the example:

* Inputs are validated using a JSON Schema
* We can guarentee inputs pass the schema before reaching the business logic
* This code is completely re-usable in other contexts

## How do I call commands?

You have two choices. Given a command UserSignUp, you can do this:

~~~ js
const outcome = UserSignUp.run(inputs);
if (outcome.success) {
  return outcome.result;
} else {
  return outcome.errors;
}
~~~

Or, you can do this:

~~~ js
// returns the result of ::execute(), or throws ValidationError
const user = UserSignUp.runExplicit(inputs);
~~~

## How do I define commands?

1. Extend Cleanroom.Command:
  ~~~ js
  class YourCommand extends Cleanroom.Command {
  }
  ~~~

2. Define your input schema:

  Schemas are defined using the [JSON Schema][0] specification. See [Understanding JSON Schema][1] for basics on JSON Schema.

  ~~~ js
  class YourCommand extends Cleanroom.Command {
    static schema = {
      properties: {
        name: { type: 'string', maxLength: 10 },
        state: { type: 'string', enum: ['AL', 'AK', 'AR', ...] },
        age: { type: 'integer' },
        isSpecial: { type: 'boolean', default: true },
        account: { type: 'object' },
        tags: { type: 'array', items: { type: 'string' } },
        prefs: {
          type: 'object',
          properties: {
            smoking: { type: 'boolean' },
            view: { type: 'boolean' },
            additionalProperties: false
          }
        }
      },
      required: ['name', 'state', 'age', 'isSpecial', 'account'],
      additionalProperties: false
    }
  }
  ~~~

3. Define your execute function. It can return a value:

  ~~~ js
  class YourCommand extends Cleanroom.Command {
    static schema = {
      // ...
    }

    static execute(inputs) {
      const record = doThing(inputs);
      // ...
      return record;
    }
  }
  ~~~

## What about validation errors?

Validations are handled by the [skeemas][2] library by [Prestaul][3].

Please see the skeemas source code until an overview of validation errors is written.

## Acknowledgements

Highly inspired by [cypriss/mutations][4] from the Ruby world.

[0]: http://json-schema.org
[1]: http://spacetelescope.github.io/understanding-json-schema
[2]: https://github.com/Prestaul/skeemas
[3]: https://github.com/Prestaul
[4]: https://github.com/cypriss/mutations
