## cerebral-view-react

Go to official [README](https://github.com/cerebral/cerebral-view-react/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
The React view package lets you connect Cerebral to your components. It is encouraged that you connect your state as close as possible to the component that needs it. That will make your components more flexible to move around and it is easier to reason about where your components properties are coming from.

Cerebral does **not** use "shallow checking" to figure out what components needs to render. Since all state changes are made to paths and all state dependencies are defined as paths it is possible for Cerebral to match changed paths to "subscribed" paths. This process keeps the components completely out of the picture when a new render is due, only changed paths to registered paths are checked.

### Install
`npm install cerebral-view-react --save`

### Instantiate
```javascript
import controller from './controller.js'
import React from 'react'
import {render} from 'react-dom'
import {Container} from 'cerebral-view-react'

// Your main application component
import App from './components/App'

render(
  <Container controller={controller}>
    <App/>
  </Container>
, document.querySelector('#app'))
```

### Stateless components
You should prefer stateless components over classes, because they perform better. If you need access to lifecycle hooks or for some reason need internal state you can choose  class instead.

```javascript
import React from 'react';
import {connect} from 'cerebral-view-react';

export default connect({
  isLoading: 'app.isLoading',
},
  function App(props) {
    return (
      <div>
        {props.isLoading ? 'loading...' : null}
      </div>
    )
  }
)
```

### Stateful components
When you need access to lifecycle hooks and/or internal state.

```javascript
import React from 'react';
import {connect} from 'cerebral-view-react';

export default connect({
  isLoading: 'app.isLoading',
},
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {foo: 'bar'}
    }
    render() {
      return (
        <div>
          {props.isLoading ? 'loading...' : null}
        </div>
      )
    }
  }
)
```

### Expose signals
By default all signals are available on **props.signals**, but you can expose specific signals to the component.

```javascript
import React from 'react';
import {connect} from 'cerebral-view-react';

export default connect({
  isLoading: 'app.isLoading',
}, {
  buttonClicked: 'app.buttonClicked'
},
  function App({isLoading, buttonClicked}) {
    return (
      <div>
        {props.isLoading ? 'loading...' : null}
        <button onClick={() => buttonClicked()}>click me</button>
      </div>
    )
  }
)
```

### Dynamically grabbing paths
It is also possible to use a function to define the state dependencies. The function will receive the passed props to the component, allowing you to dynamically grab the state you need.

```javascript
import React from 'react';
import {connect} from 'cerebral-view-react';

export default connect(props => {
  user: `app.users.${props.userId}`,
},
  function App({user}) {
    return (
      <div>
        Hello {user.name}!
      </div>
    )
  }
)
```

### Dynamically grabbing signals

```javascript
import React from 'react';
import {connect} from 'cerebral-view-react';

export default connect({
  currentModule: 'app.currentModule',
}, props => ({
  buttonClicked: `${props.currentModule}.buttonClicked`
}),
  function App({buttonClicked}) {
    return (
      <div>
        <button onClick={() => buttonClicked()}>click me</button>
      </div>
    )
  }
)
```

### Strict render mode
It is possible to optimize rendering by going into strict mode.

```javascript
render(
  <Container controller={controller} strict>
    <App/>
  </Container>
, document.querySelector('#app'))
```

The strict mode will be more strict on matching changes to paths with what components depend on. That means typically a change to: **app.users.123** will render all components depending on either **app**, **app.users** and **app.users.123**. With strict mode only the component depending specifically on **app.users.123** will rerender.

With strict mode you can define interest in nested paths though, so for example an **Items** component interested in the adding and removal of keys on **app.items** could do:

```javascript
connect({
  items: 'app.items.*'
})
```

If it was also interested in changes on the actual values of they keys, and any other nested values:

```javascript
connect({
  items: 'app.items.**'
})
```

Now you are in even more control of when your components should render.

### Testing

If **process.env.NODE_ENV** set to "test" **connect** will not wrap your component and will return it as is, making it easy to test.
Be sure to use **webpack** (or similar) configured to eliminate unreachable code when making your production build.

Example mocha test

```js
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Application from '../components/application';
import HomePage from '../components/homepage';

describe('<Application />', () => {
  it('renders the <HomePage />', () => {
    const wrapper = shallow(<Application page="home" />);
    expect(wrapper.find(HomePage)).to.have.length.of(1);
  });
});
```
