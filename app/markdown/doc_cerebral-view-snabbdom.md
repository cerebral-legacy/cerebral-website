# Cerebral View Snabbdom

Cerebral View Snabbdom makes Cerebral a first class citizen of components. That means you have to do a lot less wiring to build components and Snabbdom is faster than React. Read more about the JSX syntax over at [snabbdom-jsx](https://github.com/yelouafi/snabbdom-jsx), it differs from React. Instead of JSX you can use the built in [snabbdom hyperscript helper](https://github.com/paldepind/snabbdom#snabbdomh).

## Install
```
npm install cerebral-view-snabbdom
```

### Optional JSX support

To use JSX syntax you also need `snabbdom-jsx` and Babel with the `transform-react-jsx` package.

```
npm install snabbdom-jsx
npm install babel-plugin-transform-react-jsx
```

Add a `.babelrc`

```js
{
  "presets": ["es2015"],
  "plugins": [
    ["transform-react-jsx", { "pragma": "Component.DOM" }]
  ]
}
```

If you are not using jsx and don't want to see a compile warning about a missing `snabbdom-jsx` module then you
can add the following to your `webpack.config.js`:

```js
module.exports = {
  // other webpack config here
  externals: {
    'snabbdom-jsx': 'snabbdom-jsx'
  }
}
```

## Render

```js
import { Component, render } from 'cerebral-view-snabbdom'
import App from './App'
import controller from './controller'

render(() => <App/>, document.querySelector('#app'), controller)
```

> **Note:** `() => <App/>` is the same as `() => { return <App/> }`

or without JSX

```js
render(() => App(), document.querySelector('#app'), controller)
```

Note that you have to pass a callback to render the initial component, returning it. And you also have to pass the controller.

## Component

```js
import { Component } from 'cerebral-view-snabbdom'

export default Component(() => (
  <h1>Hello world!</h1>
))
```

or without JSX

```js
import { Component, h } from 'cerebral-view-snabbdom'

export default Component(() => h('h1', 'Hello World!'))
```

### Use state from state store
By default you have access to all the state from your state tree on the `state` property passed into each components.

```js
import { Component } from 'cerebral-view-snabbdom'

export default Component(({state}) => (
  <h1>{state.title}</h1>
))
```

You can optionally extract specific state and customize its property name:

```js
import { Component } from 'cerebral-view-snabbdom'

export default Component({
  title: ['title'],
  rows: ['admin', 'users']
}, ({state}) => (
  <div>
    <h1>{state.title}</h1>
    <ul>
      {state.rows.map(row => <li>{row.name}</li>)}
    </ul>
  </div>
))
```
In this case only *title* and *rows* are available in the component, via the *state* property.

### Use props passed to component

*MyComponent.js*
```js
import {Component} from 'cerebral-view-snabbdom'

export default Component(({props}) => (
  <h1>{props.title}</h1>
))
```

```js
import MyComponent from './MyComponent'

<MyComponent title="whatup!"/>
```

### Use signals

*MyComponent.js*
```js
import {Component} from 'cerebral-view-snabbdom'

export default Component(({state, signals}) => (
  <div>
    <h1 style={{color: state.color}}>{props.title}</h1>
    <button on-click={() => signals.colorChanged({color: 'blue'})}>Change color</button>
  </div>
))
```

### Access modules
Modules access is primarily necessary for components related to specific modules. The need to expose modules i yet to be discussed.

*MyComponent.js*
```js
import {Component} from 'cerebral-view-snabbdom'

export default Component(({modules}) => (
  <h1>{modules.myModule.foo}</h1>
))
```

### Optimize
Any component you give a `key` will be optimized under the hood. It will shallow check its properties to decide if a render is necessary.

*MyComponent.js*
```js
import {Component} from 'cerebral-view-snabbdom'

const MyComponent = Component(({props}) => (
  <h1>{props.title}</h1>
))

<MyComponent key="main-title" title="test"/>
```
The key has to be **unique**. The component will only render when *title* actually changes. If you want to also optimize on the state used from the state store you can define the state used by the component.

*MyComponent.js*
```js
import {Component} from 'cerebral-view-snabbdom'

const MyComponent = Component({
  version: ['version']
}, ({props, state}) => (
  <h1>{props.title} ({state.version})</h1>
))
```
Now the component will only update if either *title* from props or *version* from the state has changed.
