It is recommended to use Node from version **4.x.x**.

### Boilerplate
The basic boilerplate is located [here](https://github.com/cerebral/cerebral-boilerplate). It has React, Cerebral and CSS-Modules ready for you. Using a best practice file structure for scaling up your app.


### From scratch
`$ npm install cerebral cerebral-model-baobab cerebral-view-react`

*App.js*
```javascript

import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'

@Cerebral({
  title: ['home', 'title']
})
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <input
          type="text"
          value={this.props.title}
          onChange={(e) => this.props.signals.home.titleChanged({title: e.target.value})}
        />
      </div>
    )
  }
}

export default App
```

*modules/Home/index.js*
```javascript
function changeTitle ({input, state}) {
  state.set('title', input.title);
}

const titleChanged = [
  changeTitle
]

export default (options = {}) => {
  return (module) => {

    module.addState({
      title: 'Hello world!'
    });

    module.addSignals({
      titleChanged
    });  

  }
}
```

*main.js*
```javascript
import React from 'react'
import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import {Container} from 'cerebral-view-react'
import ReactDOM from 'react-dom'
import Home from './modules/Home'
import HomeComponent from './modules/Home/components/Home'

const controller = Controller(Model({}))

controller.modules({
  home: Home()
})

ReactDOM.render(
  <Container controller={controller}>
    <HomeComponent/>
  </Container>
, document.querySelector('#app'))
```
