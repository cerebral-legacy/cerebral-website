## Operators

Most state changes are quite simple. Usually you want to set some new state, toggle it or maybe copy a value from the input of the signal into the model. With the included operators you can do this directly in the signal definition, and more.

```javascript
import {
  set,
  copy,
  toggle,
  unset,
  when,
  throttle,
  debounce,
  filter
} from 'cerebral/operators'

export default [
  // Set some value to the model
  set('state:foo.bar', 'someValue'),
  // Set some value to the output
  set('output:foo.bar', 'someValue'),

  // Copy value from input to model
  copy('input:foo', 'state:bar'),
  // Copy value from model to output
  copy('state:foo', 'output:bar'),

  // Toggle a boolean value in your model
  toggle('state:foo'),

  // Unset a value from the model
  unset('state:foo.bar'),

  // Conditional truthy check
  when('state:foo.isAwesome'), {
    true: [],
    false: []
  },
  // Conditional value check
  when('state:user.role', {
    admin: 'admin',
    user: 'user'
  }), {
    admin: [],
    user: [],
    otherwise: []
  },

  // Only handle signals triggered
  // every x milliseconds
  throttle(200), {
    accepted: [],
    rejected: []
  },

  // Ignore signals until x milliseconds
  // has passed, then run last signal
  debounce(200), {
    accepted: [],
    rejected: []
  },
]
```
