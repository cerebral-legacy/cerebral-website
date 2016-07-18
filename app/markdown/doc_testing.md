## Testing

### Introduction

Since cerebral apps are composed of mostly pure functions, cerebral apps can be easily tested. In most cases, simply examine the function signature and prove the inputs and outputs in your tests.

However some parts of cerebral may appear to be less testable, especially were pure functions are wrapped in cerebral functions, but cerebral has been designed with testing in mind, so where it may not seem obvious how to test, cerebral already has a solution for you.

In this section we will cover the testing of the basic building blocks of all cerebral applications: actions, signals and components.

The examples here are using [mocha](https://mochajs.org/), [chai](http://chaijs.com/) and [enzyme](http://airbnb.io/enzyme/), but should work in other test frameworks.

### Test Mode

Some features of cerebral have been designed with a "test mode". This "test mode" will help by directly exposing your pure functions and bypassing the parts of cerebral that would otherwise make testing more difficult.

To enable test mode simply ensure that your `NODE_ENV` is set to `'test'`. Without this some of the examples below may not work as described.

Be sure not to set `NODE_ENV` to `'test'` when making development or production builds of your app.

### React Component Testing

```js
import { connect } from 'cerebral-view-react'

export default connect({
  name: 'user.name'
}, ({ name = 'test user' }) => (
  <div>{name}</div>
))
```

When `NODE_ENV === 'test'` cerebral-view-react/connect will not be called, instead your pure component will be returned, making it easy to test.

Example mocha test using [enzyme](http://airbnb.io/enzyme/) and [chai-enzyme](https://github.com/producthunt/chai-enzyme)
```js
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Application from '../components/application'
import HomePage from '../components/homepage'

describe('<Application />', () => {
  it('renders the <HomePage />', () => {
    const wrapper = shallow(<Application page="home" />)
    expect(wrapper.find(HomePage)).to.have.length.of(1)
  })
})
```

### Computed Testing

```js
import { Computed } from 'cerebral'

export default Computed({
  name: 'user.name'
}, ({ name = 'test user' }) => {
  return user.toUpperCase()
})
```

When `NODE_ENV === 'test'` cerebral/Computed will not be called, instead your pure function will be returned, making it easy to test.

Example mocha test
```js
import { expect } from 'chai'
import upperUser from '../computed/upperUser'

describe('upperUser() Computed', () => {
  it('gets the user name in upper case', () => {
    expect(upperUser({ name: 'fred' })).to.equal('FRED')
  })
})
```

### Action Testing

Since actions are pure functions, they are easy to test.

```js
export default ({ input, output }) => {
  output({ value: input.value + 1 })
}
```

Example mocha test
```js
import { expect } from 'chai'

// module to test
import increment from '../actions/increment'

describe('increment action', () => {
  it('adds one to input.value', () => {
    increment({
      input: { value: 10 },
      output ({ value }) {
        expect(value).to.eql(11)
      }
    })
  })
})
```

Where your action may be using additional inputs or outputs (e.g. state or services), you may need to pass in those values. For async actions you will need to call done in the `output` function(s).

### Signal Testing

Cerebral provides a package to help with testing your apps modules.

```
npm install --save-dev cerebral-testable
```

This package exposes a testable controller which helps you to easily test your modules and signals in isolation.

Example mocha test
```js
import { expect } from 'chai'
import { Controller } from 'cerebral-testable'

// module to test
import application from '../modules/application'

describe('application module', () => {
  let controller, signals

  beforeEach(() => {
    [ controller, signals ] = Controller({
      /* Initial model state for the test */
    }, {
      application: application()
    });
    // if you need to mock services
    controller.mockServices('router', {
      redirect (url) { }
    })
  })

  it('redirects to "home" on unknown url', (done) => {
    controller.test((output) => {
      expect(controller.get('application.page')).to.equal('home')
    }, done)
    signals.application.unknownUrlReceived()
  })
})
```
