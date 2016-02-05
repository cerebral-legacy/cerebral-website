There is not much difference in creating your own application specific module and creating a module that can be shared. But the fact that other developers can namespace your module to whatever they want, you need a way for the signals of your module to access it consistently.

### Single instance modules
Modules like `http`, `recorder` and `router` are *"single instance modules"*. When creating signals for these modules you can give the module an **alias**.

*MyModule.js*
```javascript
import somethingHappened from './signals/somethingHappened'

export default (options = {}) => {
  return (module, controller) => {

    // Alias is a second namespace you can access the module on
    // All Cerebral modules should be named "cerebral-module-xxx"
    module.alias('cerebral-module-myModule')

    module.addSignals({
      somethingHappened
    })

    module.addServices({
      foo() {}
    })

    // The second argument to a module is the controller itself. You
    // might need this to do some special manipulation
    controller

  };
}
```

#### Accessing your shared module in actions
```javascript
function mySharedModuleAction({state, modules, services}) {
  const module = modules['cerebral-module-myModule']

  // Change its state
  const cursor = state.select(module.path)
  cursor.set('foo', 'bar')

  // Access its service
  const service = module.path.reduce((service, key) => service[key], services)
  service.foo()


}
```

#### Accessing your shared module in components
All Cerebral decorated components gets the modules as a property.

```javascript
@Cerebral((props) => ({
  myModule: props.modules['cerebral-module-myModule'].path
}))
class MyModuleComponent extends React.Component {
  componentWillMount() {
    const path = this.props.modules['cerebral-module-myModule'].path
    const signals = path.reduce((signal, key) => signal[key], this.props.signals)
    signals.mounted()
  }
  render() {
    return <div>{this.props.myModule.foo}</div>
  }
}
```

This makes it possible for consumers of your shared module to just use your exposed signals, actions and components without any configuration:

```javascript
import signal from 'cerebral-module-myModule/signals/signal'

export default [
  myAppAction,
  ...signal
]
```

```javascript
import ModuleComponent from 'cerebral-module-myModule/ModuleComponent'

class MyAppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>I just included a shared module component</h1>
        <ModuleComponent/>
      </div>
    );
  }
}
```

### Trigger signals from services
Sometimes you want a service to trigger a signal. You can pass the signals registered to a module using the `module.getSignals()` method.

```javascript
import CreateSyncMethod from './CreateSyncMethod'

export default (options = {}) => {
  return (module) => {

    module.addServices({
      sync: CreateSyncMethod(module.getSignals())
    })

  }
}
```

### Multi-instance shared modules
If a shared module can have multiple instances you will need to construct your signals in a way that makes them know which instance they should talk to. Multi instance modules does no use an `alias`, they pass the path of the module to factories to produce signals that talks to the correct instance.

```javascript

function actionA(path) {
  return function action({state}) {
    const module = state.select(path)
    module.set('foo', 'bar')
  }
}

function actionB(path) {
  return function action({services}) {
    const service = path.reduce((service, key) => service[key], services)
    service.doSomething()
  }
}

function signalA(path) {
  return [
    actionA(path),
    actionB(path)
  ]
}

export default (options = {}) => {
  return (module) => {

    module.addSignals({
      signalA: signalA(module.path)
    })

  }
}
```

So you use factories to make your modules generic. This also allows other modules to reuse the signals of your generic module. For example some signal in an application might want to use the signal from the `genericModule` instance at path `app.genericA`:

```javascript
import signalA from 'genericModule/signals/signalA'

export default [
  myAction,
  ...signalA(['app', 'genericA'])
]
```

You have the same approach with components you expose from your shared module:

```javascript
import ModuleComponent from 'cerebral-module-myModule/ModuleComponent'

class MyAppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>I just included a shared module component</h1>
        <ModuleComponent module="path.to.module"/>
      </div>
    );
  }
}
```

### Grab values across model packages
You can use `state.toJS(path)` to ensure that you get the plain JavaScript representation of values you extract.
