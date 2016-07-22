---
title: Adding modules
---

## Adding modules

It does not take long before you need to split up your state and signals. In Cerebral you can use modules to handle that. Modules are a very simple concept, they basically namespace state, signals and services to give structure. Let us see how we can define a module for our application:

[src/model.js](https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/controller.js)

```javascript
import {Controller} from 'cerebral'
import Model from 'cerebral/models/immutable'
import Devtools from 'cerebral-module-devtools'
import Http from 'cerebral-module-http'
import App from './modules/App'

const controller = Controller(Model({}))

controller.addModules({
  app: App,

  http: Http({
    baseURL: '/api'
  }),
  devtools: Devtools()
})

export default controller
```

What we have done now is add a namespace to our application called **app** and we reference our App module. We also have two other modules, **devtools** and **http**. That means there is no difference creating an application specific module or a module you want to share with others. Let us take a closer look at our **App** module:

[src/modules/App/index.js](https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/modules/App/index.js)

```javascript
import changeNewItemTitle from './chains/changeNewItemTitle'
import submitNewItemTitle from './chains/submitNewItemTitle'

export default module => {

  module.addState({
    items: [],
    newItemTitle: '',
    isSaving: false,
    error: null
  })

  module.addSignals({
    newItemTitleChanged: {
      chain: changeNewItemTitle,
      immediate: true
    },
    newItemTitleSubmitted: submitNewItemTitle
  })

}
```

A module is just a function that receives the module. We can now attach our state and the signals to the module instead of directly on the controller. When we have namespaced our state we must also make sure our components points to the complete state path:

###### React

[src/components/App/index.js](https://github.com/cerebral/cerebral-website-tutorial-next/blob/react/src/components/App/index.js)

```javascript
import React from 'react'
import {connect} from 'cerebral-view-react'
import Items from '../Items'

export default connect({
  newItemTitle: 'app.newItemTitle',
  isSaving: 'app.isSaving',
  error: 'app.error'
},
  class App extends React.Component {
    componentDidUpdate(prevProps) {
      if (prevProps.isSaving && !this.props.isSaving) {
        this.input.focus()
      }
    }
    onFormSubmit(event) {
      event.preventDefault()
      this.props.signals.app.newItemTitleSubmitted()
    }
    onInputChange(event) {
      this.props.signals.app.newItemTitleChanged({
        title: event.target.value
      })
    }
    render() {
      return (
        <div>
          <form onSubmit={event => this.onFormSubmit(event)}>
            <input
              autoFocus
              type="text"
              ref={node => this.input = node}
              disabled={this.props.isSaving}
              value={this.props.newItemTitle}
              onChange={event => this.onInputChange(event)}
            />
            {
              this.props.error ?
                <span style={{color: 'red', paddingLeft: '10px'}}>{this.props.error}</span>
              :
                null
            }
          </form>
          <Items />
        </div>
      )
    }
  }
)
```

###### Snabbdom

[src/components/App/index.js](https://github.com/cerebral/cerebral-website-tutorial-next/blob/snabbdom/src/components/App/index.js)

```javascript
import {connect, h} from 'cerebral-view-snabbdom'
import Items from '../Items'

export default connect({
  newItemTitle: 'app.newItemTitle',
  items: 'app.items',
  isSaving: 'app.isSaving',
  error: 'app.error'
},
  function App(props) {

    const onFormSubmit = event => {
      event.preventDefault()
      props.signals.app.newItemTitleSubmitted()
    }

    const onInputChange = event => {
      props.signals.app.newItemTitleChanged({
        title: event.target.value
      })
    }

    const onInputUpdate = (oldNode, newNode) => {
      if (oldNode.data.props.disabled && !props.isSaving) {
        newNode.elm.focus()
      }
    }

    return h('div', [
      h('form', {
        on: {
          submit: onFormSubmit
        }
      }, [
        h('input', {
          props: {
            type: 'text',
            value: props.newItemTitle,
            disabled: props.isSaving
          },
          hook: {
            update: onInputUpdate
          },
          on: {
            input: onInputChange
          }
        }),
        props.error ?
          h('span', {
            style: {
              color: 'red',
              paddingLeft: '10px'
            }
          }, props.error)
        :
          ''
      ]),
      Items()
    ])
  }
)
```

###### Inferno

[src/components/App/index.js](https://github.com/cerebral/cerebral-website-tutorial-next/blob/inferno/src/components/App/index.js)

```javascript
import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral-view-inferno'
import Items from '../Items'

export default connect({
  newItemTitle: 'app.newItemTitle',
  isSaving: 'app.isSaving',
  error: 'app.error'
},
  class App extends Component {
    componentDidUpdate(prevProps) {
      if (prevProps.isSaving && !this.props.isSaving) {
        this.input.focus()
      }
    }
    onFormSubmit(event) {
      event.preventDefault()
      this.props.signals.app.newItemTitleSubmitted()
    }
    onInputChange(event) {
      this.props.signals.app.newItemTitleChanged({
        title: event.target.value
      })
    }
    render() {
      return (
        <div>
          <form onSubmit={event => this.onFormSubmit(event)}>
            <input
              autoFocus
              type="text"
              onAttached={node => this.input = node}
              disabled={this.props.isSaving}
              value={this.props.newItemTitle}
              onInput={event => this.onInputChange(event)}
            />
            {
              this.props.error ?
                <span style={{color: 'red', paddingLeft: '10px'}}>{this.props.error}</span>
              :
                null
            }
          </form>
          <Items />
        </div>
      )
    }
  }
)
```

-----

Notice here that we have also split our component into two parts. The **App** component and the **Items** component. Though modules often has a component with the same name you should not consider them "part of the same thing". As mentioned before components are completely separated from your actual application and you should not mix these two concepts together. You will have a lot more components than modules.

With this structure in place you start to see how larger applications scale in terms of files and directories.

```javascript
/src
  /components
    /App
    /Items
  /modules
    /App
      /actions
      /chains
      index.js
  controller.js
  main.js
```

#### Best practices
Creating modules helps you decouple and structure your application. Modules are really nothing more than namespacing, but you will see later what other benefits we can also get from modules. A challenge decoupling code is isolation. In Cerebral that does not happen. Any module has access to any state in your model, also chains and actions can be reused across modules. Since components are completely decoupled from your application they have access to any state and any signal.

And yes, modules can have submodules ;-)

#### Challenge
Try changing the namespace of **app** and refactor the application to use that new namespace.

[Next](./03_creating_actions.en.md)
