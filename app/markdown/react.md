### Install
`$ npm install cerebral-view-react`.

### Repo
[cerebral-view-react](https://github.com/cerebral/cerebral-view-react)

Read more about **decorators**, **hoc**, **mixins** and **stateless/stateful** components.

### Get started

It is encouraged that you put all the state of your application in the Cerebral state store. Also any initial/default state should also be defined in the state store. Keep your components as render/UI focused as possible.

#### Render application

```javascript

import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import React from 'react'
import {Container} from 'cerebral-view-react'

// Your main application component
import HomeComponent from './components/Home'
import Home from './modules/Home';

const controller = Controller(Model({}))

controller.modules({
  home: Home()
})

// Render the app
React.render(
  <Container controller={controller}>
    <HomeComponent/>
  </Container>, document.body.querySelector('#app'))
```

#### Get state in component
```javascript

import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'

@Cerebral({
  title: ['home', 'title']
})
class App extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>  
  }
}
```

#### Create hyperlinks
If you are using the `cerebral-module-router` you can use a component to create links.
```javascript

import React from 'react';
import {Decorator as Cerebral, Link} from 'cerebral-view-react'

@Cerebral()
class App extends React.Component {
  render() {
    return (
      <Link
        signal={this.props.signals.home.somethingHappened}
        params={{foo: 'bar'}}
        className="my-class"
      >Click me</Link>
    )
  }
}
```
