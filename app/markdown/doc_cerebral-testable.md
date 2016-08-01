## cerebral-testable

### Concept
A package to help testing signals, modules, computed etc.

### Install
`npm install cerebral-testable --save-dev`

### Instantiate
When **NODE_ENV** is set to **test** cerebral will return your pure react components and computed functions, the Cerebral controller will be bypassed.

This means that you can easily test your components and computed functions just as if they were simple stateless/pure functions.

### Components
All the view packages supports this feature.

```js
export default connect({
  foo: 'app.foo'
}, (props) => (
  ...
))
```

**connect** will just return the component, no wrapping. This makes it easy for you to test it.

#### Example mocha test with React
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

### Computed

```js
import { Computed } from 'cerebral-view-react'

export default Computed({
  name: 'user.name'
}, ({ name = 'test user' }) => {
  return user.toUpperCase()
})
```

**Computed** will just return the computed function, no wrapping. This makes it easy for you to test it.

#### Example mocha test
```js
import { expect } from 'chai'
import upperUser from '../computed/upperUser'

describe('upperUser() Computed', () => {
  it('gets the user name in upper case', () => {
    expect(upperUser({ name: 'fred' })).to.equal('FRED')
  })
})
```

### Module / Signal Testing

The testable controller lets you test your modules and signals in isolation.

#### Example mocha test
```js
import { expect } from 'chai'
import { Controller } from 'cerebral-testable'

// module to test
import application from '../modules/application'

describe('application module', () => {
  let controller, signals

  beforeEach(() => {
    [ controller, signals ] = Controller({
      // Any initial state
    }, {
      // The module(s) to test
      application: application()
    });

    // if you need to mock services
    controller.mockServices('router', {
      redirect (url) { }
    })
  })

  it('redirects to "home" on unknown url (callback)', (done) => {
    controller.test((output) => {
      expect(controller.get('application.page')).to.equal('home')
    }, done)
    signals.application.unknownUrlReceived()
  })

  // same test as before but using a promise
  it('redirects to "home" on unknown url (promise)', () => {
    return controller.test(() => signals.application.unknownUrlReceived()).then((output) => {
      expect(controller.get('application.page')).to.equal('home')
    })
  })
})
```
