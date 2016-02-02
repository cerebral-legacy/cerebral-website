This module provides first-class component support to [Inferno](https://github.com/trueadm/inferno). With Cerebral and Inferno, you can easily create great UI components with minimal boilerplate, which is great for those who hate wiring up several levels of components to other libraries. Furthermore, Inferno is an extremely performant UI library, providing much faster DOM performance compared to many of the other libraries out there (such as React, Mihtril and Snabbdom).

### Install
`npm install cerebral-view-inferno`

To use JSX syntax you also need Babel with the `babel-plugin-inferno` package. This [JSX Babel Plugin](https://github.com/trueadm/babel-plugin-inferno) allows for easy consumption of JSX code within Inferno applications (completely optional though).

`npm install babel-plugin-inferno`

```javascript
{
  "presets": ["es2015"],
  "plugins": ["babel-plugin-inferno"]
}
```

### Repo
[cerebral-view-inferno](https://github.com/trueadm/cerebral-view-inferno)

### Get started
#### Render

```javascript
import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import Inferno from 'inferno'
import {Component, render}  from 'cerebral-view-inferno'

// Your main application component
import HomeComponent from './components/Home'
import Home from './modules/Home'

const controller = Controller(Model({}))

controller.modules({
  home: Home()
})

render(() => <HomeComponent/>, document.querySelector('#app'), controller)
```

Note that you have to pass a callback to render the initial component, returning it. And you also have to pass the controller.

**Note!** `() => <HomeComponent/>` is the same as `() => { return <HomeComponent/> }`.

#### Component

```javascript

import Inferno from 'inferno'
import {Component}  from 'cerebral-view-inferno'

export default Component(() => (

  <h1>Hello world!</h1>

))
```

#### Use state from state store
By default you have access to all the state from your state tree on the `state` property passed into each components.

```javascript

import Inferno from 'inferno'
import {Component}  from 'cerebral-view-inferno'

export default Component(({state}) => (

  <h1>{state.home.title}</h1>

))
```

You can optionally extract specific state and customize its property name:

```javascript

import Inferno from 'inferno'
import {Component}  from 'cerebral-view-inferno'

export default Component({
  title: ['home', 'title'],
  rows: ['admin', 'users']
}, ({state}) => {

  const renderRow = (row) => <li>{row.name}</li>

  return (
    <div>
      <h1>{state.title}</h1>
      <ul>
        {state.rows.map(renderRow)}
      </ul>
    </div>
  )

})
```
In this case only *title* and *rows* are available in the component, via the *state* property.

#### Use props passed to component

*MyComponent.js*
```javascript

import Inferno from 'inferno'
import {Component}  from 'cerebral-view-inferno'

export default Component(({props}) => (

  <h1>{props.title}</h1>

))
```

```javascript

import Inferno from 'inferno'
import MyComponent from './MyComponent'

<MyComponent title="whatup!"/>
```

#### Use signals

*MyComponent.js*
```javascript

import Inferno from 'inferno'
import {Component}  from 'cerebral-view-inferno'

export default Component(({state, signals}) => (

  <div>
    <h1 style={{color: state.color}}>{props.title}</h1>
    <button on-click={() => signals.home.colorChanged({color: 'blue'})}>Change color</button>
  </div>

))
```
