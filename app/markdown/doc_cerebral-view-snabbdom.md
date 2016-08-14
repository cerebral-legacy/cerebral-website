## cerebral-view-snabbdom

Go to official [README](https://github.com/cerebral/cerebral-view-snabbdom/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
The Snabbdom view package uses the [Snabbdom](https://github.com/paldepind/snabbdom) project to render. It is very fast, but does not have the same "render at specific point in component tree" optimization React and Inferno has. That means Snabbdom will always recalculate render on your whole app on any state change. That said, it is still extremely fast!

### Install
`npm install cerebral-view-snabbdom --save`

### Instantiate
```javascript
import { Component, render } from 'cerebral-view-snabbdom'
import App from './components/App'
import controller from './controller'

render(() => App(), document.querySelector('#app'), controller)
```

### Connecting state
Snabbdom does not really have a concept of components, they are just functions returning a UI description. But we can still attach state dependencies to these functions.

```javascript
import { connect, h } from 'cerebral-view-snabbdom'

export default connect({
  title: 'app.title'
},
  function App({title}) {
    return h('h1', title)
  }
)
```

### Expose signals
By default all signals are available on **props.signals**, but you can expose specific signals to the function.

```javascript
import { connect, h } from 'cerebral-view-snabbdom'

export default connect({
  title: 'app.title'
}, {
  buttonClicked: 'app.buttonClicked'
},
  function App({title, buttonClicked}) {
    return (
      h('div', [
        h('h1', title),
        h('button', {
          on: {
            click: () => buttonClicked()
          }
        })
      ])
    )
  }
)
```

### Dynamically grabbing paths
It is also possible to use a function to define the state dependencies. The function will receive the passed props to the component, allowing you to dynamically grab the state you need.

```javascript
import { connect, h } from 'cerebral-view-snabbdom'

export default connect(props => {
  user: `app.users.${props.userId}`
},
  function App({user}) {
    return h('h1', `Hello ${user.name}!`)
  }
)
```

### Dynamically grabbing signals

```javascript
import { connect, h } from 'cerebral-view-snabbdom'

export default connect({
  currentModule: 'app.currentModule'
}, props => ({
  buttonClicked: `${props.currentModule}.buttonClicked`
}),
  function App({buttonClicked}) {
    return (
      h('div', [
        h('button', {
          on: {
            click: () => buttonClicked()
          }
        })
      ])
    )
  }
)
```
