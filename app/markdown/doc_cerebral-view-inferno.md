## cerebral-view-inferno

Go to official [README](https://github.com/cerebral/cerebral-view-inferno/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
The Inferno view package lets you connect Cerebral to your components.

### Install
`npm install cerebral-view-inferno --save`

### Instantiate
```javascript
import controller from './controller.js'
import React from 'inferno'
import {render} from 'inferno-dom'
import {Container} from 'cerebral-view-inferno'

// Your main application component
import App from './components/App'

render(
  <Container controller={controller}>
    <App/>
  </Container>
, document.querySelector('#app'))
```

### Stateless components
You should prefer stateless components over classes, because they perform better. With inferno you can even get access to lifecycle hooks in stateless components. Look more into [hooks](https://github.com/trueadm/inferno#hooks) on the Inferno repo.

```javascript
import React from 'react';
import {connect} from 'cerebral-view-react';

export default connect({
  isLoading: 'app.isLoading',
},
  function App(props) {
    return (
      <div onCreated={() => console.log('I was created!')}>
        {props.isLoading ? 'loading...' : null}
      </div>
    )
  }
)
```

### Stateful components
When you need access to internal state.

```javascript
import Inferno from 'inferno';
import Component from 'inferno-component';
import {connect} from 'cerebral-view-inferno';

export default connect({
  isLoading: 'app.isLoading',
},
  class App extends Component {
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
import Inferno from 'inferno';
import {connect} from 'cerebral-view-inferno';

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
import Inferno from 'inferno';
import {connect} from 'cerebral-view-inferno';

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
import Inferno from 'inferno';
import {connect} from 'cerebral-view-inferno';

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
