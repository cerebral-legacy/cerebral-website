# Chains

It is common to express signals and groups of actions as chains. A chain is basically an array with actions and paths. In combination with the *spread operator* you get a powerful concept for composition.

```javascript

const myChain = [
  action1,
  action2,
  action3
];

const somethingHappened = [
  ...myChain
];

controller.signals({
  somethingHappened
});

// Will run as
controller.signals({
  somethingHappened: [action1, action2, action3]
});
```

The *spread operator* will spread the items of the array. This makes it easy to make changes to your signals. You can put actions between chains, use multiple chains and even create chain factories.

```javascript

const somethingHappened = [
  ...chain1,
  myAction1,
  ...chain2,
  myAction2
];

controller.signals({
  somethingHappened
});
```

### Chain factories

An action factory is a function that returns a function, but you can also return a chain from a factory. An example of this would be a chain for ajax requests.

```javascript

function get (url, outputs) {

  // We override any default outputs with outputs passed to the
  // factory
  const chainOutputs = Object.keys(outputs).reduce(function (chainOutputs, key) {
    chainOutputs[key] = outputs[key];
    return chainOutputs;
  }, {
    success: [],
    notFound: [displayNotFoundError],
    notAuthenticated: [displayAuthenticationError]
    error: [setError]
  });

  // We return a chain where we use an action factory to
  // request the url. That is the first action. The second item
  // in the array are the outputs
  return [
    request(url),
    chainOutputs
  ];

}
```

This factory can now be used as:

```javascript

import get from './chains/get.js';
import setItems from './actions/setItems.js';

const somethingHappened = [
  [
    ...get('/items', {
      success: [setItems]
    })
  ]
];

controller.signals({
  somethingHappened
});
```

You have now created a generic action chain that expresses your intent. It does hide implementation details, but that is something you have to balance. Sometimes it is good to be very specific, other times it just becomes very tedious. When you decide to hide implementation details the debugger will still indicate possible outputs etc. So you never completely hide what is happening.
