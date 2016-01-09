# Testing Cerebral Apps

Tests specific to cerebral apps fall into two categories, _Action Tests_ and _Signal Tests_. Other test categories (e.g. System Level) can be done in the same way as any other web application and are not covered here.

The example code shown here is using Mocha and Chai, but should be easy to modify for your preferred testing framework.

## Action Tests

Both synchronous and asynchronous actions in cerebral should be pure functions, all data and services used by the action are passed as parameters to the function. The only difference with asynchronous actions is that the output methods may not be called immediately, but most test JavaScript frameworks can deal with this case.

All cerebral actions have the following signature:

```javascript

function actionName (input, state, output, services) {

}
```

Cerebral encourages you to put your actions into individual files. Exporting actions from modules allows them to be reused by many signals and also allows actions to be easily tested.

### Synchronous Action Tests

Lets create an action called `toggleIsLoading` and then we can test it.

```javascript

export default function toggleIsLoading(input, state) {
  state.set('isLoading', input.value);
}
```

In this case we don't need to use `output` or `services` so these parameters not declared. We expect that the `input` will have a `value` property set to either `true` or `false` which will then be set on the cerebral controller state via the given `state` object. So to test this we simply need to mock the `state` object and pass in the `input` data to the action. Because our `state` object is mocked there is no central state to test, so we're going to put our asserts inside the mock `set` method instead.

```javascript

// Ideally your assertion library should support counting the number of assertions made,
// if it does not then you can create a simple wrapper like the one used here.
// See this gist for details: https://gist.github.com/garth/7367f25e2dee19f9098a
import counter, { expect, expectCount } from './helpers/chaiCounter';
import toggleIsLoading from './path/to/action';

beforeEach(counter.reset);
afterEach(counter.check);

describe('toggleIsLoading()', function () {

  it('should set the isLoading flag on the state', function () {
    // we expect two asserts to be called, if no asserts are made then the test should fail
    expectCount(2);

    // mock the state object
    const state = {
      set(path, value) {
        expect(path).to.equal('isLoading');
        expect(value).to.be.true;
      }
    };

    // prepare the input data to pass to the action
    const input = {
      value: true
    };

    // call the action
    toggleIsLoading(input, state);
  });

});
```

### Asynchronous Action Tests

Asynchronous cerebral actions need to call a method on `output` when complete, so to test these methods we also need to mock the `output` parameter. We also need to let our test runner know that the test is async so that it will wait until the `output` methods are called, how you do this depends on your testing framework of choice.

```javascript

import counter, { expect, expectCount } from './helpers/chaiCounter';
import someAsyncAction from './path/to/action';

beforeEach(counter.reset);
afterEach(counter.check);

describe('someAsyncAction()', function () {

  it('should call an output method when done', function (done) {
    expectCount(1);

    const input = {};
    const state = {};

    // mock the output object
    const output = {
      success(data) {
        // since success may be called asynchronously we need to wrap our asserts in a try catch.
        try {
          expect(data).to.eql({ actionOutput: 'data' });
          done();
        } catch (e) {
          done(e);
        }
      }
    };

    // call the async action
    someAsyncAction(input, state, output);
  });

});
```

## Signal Tests

Signal tests are higher level test than action tests and require a little setup before they can be run. The goal is to be able to setup some initial state within the cerebral controller, call a signal and then finally check the cerebral state after signal has completed.

### Patch the controller

By default cerebral does not expose the controller state for direct manipulation which is correct (state changes are managed by cerebral). But for testing we need to bypass this. In your cerebral controller you can add the following:

```javascript

import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';

// your initial state
const state = {};

// your services (passed to each action)
const services = {};

// create the central model and controller
let model = Model(state);
let controller = Controller(model, services);

// only when testing - expose the model on the controller
// (webpack will make process.env.NODE_ENV available).
if (process.env.NODE_ENV === 'test') {
  // DON'T DO THIS IN PRODUCTION
  controller.model = model;

  // optional test helper to rest cerebral state, you may want to put this
  // somewhere else if don't like test methods being deployed to production.
  controller.reset = function () {
    model.tree.set(state);
    model.tree.commit();
  };
}

export default controller;
```

Ensure that when you run your tests you also set the NODE_ENV:

```javascript

NODE_ENV=test mocha --compilers js:babel-core/register
```

### Signal Promise Wrapper

Since we are going to be calling signals directly and our tests need to know when the signal has finished, it can be useful to wrap a signal in a `Promise`. Here is a sample helper that wraps a signal in a promise and also executes a test function when the signal is done.

```javascript

// helper function to wrap a signal in a promise and optionally run a test when the signal is done
function testSignal(controller, signal, data, test) {
  return new Promise(function (resolve, reject) {
    controller.once('signalEnd', function () {
      if (typeof test === 'function') {
        try {
          test();
        } catch (e) {
          return reject(e);
        }
      }
      resolve();
    });
    signal(data);
  });
}

export default testSignal
```

Note that the helper is not aware of concurrent signals, so be sure to only use this helper to test signals in series.

### A Signal Test

Now that the controller has been patched and we have a wrapper for executing signals we are ready to make a signal test. Lets test a signal called `nameChanged` which should accept a name and apply it to the central cerebral state.

```javascript

import { expect } from 'chai';
import testSignal from './helpers/testSignal';
import controller from './path/to/controller';

// depending your setup the signal may initialise itself or you may need to call a function here to do so.
import './path/to/signal';

describe('nameChanged', function () {
  beforeEach(function () {
    controller.reset();
    this.tree = controller.model.tree;

    // optionally setup any initial test state here
    this.tree.set(['user', 'name'], 'unknown person');
    this.tree.commit();
  });

  it('should set the user name', function () {
    // prepare some signal input test data
    const signalInput = {
      name: 'Christian'
    };

    // return the promise and mocha will wait for it to resolve
    return testSignal(controller, controller.signals.nameChanged, signalInput, () => {
      expect(this.tree.get(['user', 'name'])).to.equal('Christian');
    });
  });
});

```
