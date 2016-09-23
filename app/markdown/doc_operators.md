## Operators

Most state changes are quite simple. Usually you want to set some new state, toggle it or maybe copy a value from the input of the signal into the model. With the included operators you can do this directly in the chain definition, and more.

Note that operators are static, meaning that when the arguments you pass needs to be dynamic of some sorts you rather want to create an action instead.

```javascript
import {
  set,
  copy,
  toggle,
  unset,
  when,
  throttle,
  debounce,
  filter,
  delay
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

  // Go down "accepted" path the first time
  // or if 200ms has passed since last "accepted"
  // Go down "discarded" path when 200ms has not
  // passed since last "accepted"
  // Throttle is where there are too many events. 
  // Typically mousemove and resize of window. 
  // You do not want to act on every event/signal
  throttle(200), {
    accepted: [],
    discarded: []
  },
  // Short version, only accepted chain
  ...throttle(200, [])

  // This action holds until
  // A: 200ms has passed
  //  - "accepted" is run
  // B: the action is triggered again
  //  - "discarded" is run on the previous execution
  //  - the action on new execution is holding again
  debounce(200), {
    accepted: [],
    discarded: []
  },
  // Short version, only accepted chain
  ...debounce(200, [])
  // Debounce is where you want to act at a certain 
  // time after last event/signal triggered. 
  //
  // The throttle/debounce has really nothing to do with 
  // keeping the state of the input, it is what should 
  // happen related to keypresses. Typical for typeahead. 
  // So typically with Cerebral and React you would do:
  // [
  //   copy('input:value', 'state:inputValue'),
  //   debounce(200, ...doTheTypeaheadStuff)
  // ]

  // Go down "accepted" when value matches filter
  // or "discarded" when it does not match
  filter('input:foo', function minLength3(value/*, context*/) {
    return value.length >= 3
  }), {
    accepted: [],
    discarded: []
  },
  // Short version, only accepted chain
  ...filter('input:foo', function minLength3(value/*, context*/) {
    return value.length >= 3
  }, []),
  // or compare with a literal value
  ...filter('input:foo', 'bar', []),

  // Wait 200ms and run chain
  ...delay(200, [

  ])
]
```
