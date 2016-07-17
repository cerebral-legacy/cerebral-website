## Controller

Cerebral is primarily a controller. The part of your application that controls requests for state change. To handle a specific request for state change you register a **signal**. You do this by naming it and pointing to the **chain** to execute. Signals controls the execution of **chains** and **actions**. To actually hold on to the state that will change through the lifecycle of your application you pass a model to the controller when instantiating. This allows Cerebral to get full control of any changes of state and notify the view layer when it should update.

Typically you will create a *controller.js* file in your project:

```javascript
import {Controller} from 'cerebral'
import Model from 'cerebral/models/immutable'

const controller = Controller(Model({
  // You can add some initial state here if you want
}))

export default controller
```

### Methods

#### controller.addModules(modules)
Attaches modules to the controller. The key is the namespace you choose for your module. Any state, signals and services added to module will be avilable on that chosen namespace.
```javascript
import App from './modules/App'
import Devtools from 'cerebral-module-devtools'

...

controller.addModules({
  app: App,

  devtools: Devtools()
})
```

#### controller.addSignals(signals)
Typically you will use modules to add signals, but you can attach signals directly to the controller as well.
```javascript
import loadData from './chains/loadData'

...

controller.addSignals({
  appMounted: loadData,
  buttonClicked: loadData
})
```

#### controller.addServices(services)
You can add services directly on the controller if you want to. The will be available directly on `services` provider in all actions.
```javascript
...

controller.addServices({
  getLocalStorage,
  setLocalStorage
})
```

#### controller.addContextProvider(contextProvider)
By adding a context provider to the controller you add it globally to all actions in your application.
```javascript
...

controller.addContextProvider(contextProvider)
```

#### controller.get(?path)
Returns the current state of the model.
```javascript
controller.get() // {foo: {bar: "hello"}}
controller.get('foo.bar') // "hello"
```

#### controller.getSignals(?path)
Returns the signals registered to the controller
```javascript
controller.getSignals() // {app: {mounted: function () {}}}
controller.getSignals('app.mounted') // function () {}
```

#### controller.getModules(?path)
Returns the modules registered to the controller
```javascript
controller.getModules() // {app: {path: ["app"], meta: {}}}
controller.getModules('app') // {path: ["app"], meta: {}}
```

#### controller.getServices(?path)
Returns the services registered on the controller
```javascript
controller.getServices() // {myService: {get: function () {}, set: function () {}}}
controller.getServices('myService') // {get: function () {}, set: function () {}}
```

#### controller.on(event, callback)
Cerebral will emit events regarding instantiation, execution of signals and state updates. Typically you do not listen to these events.

```javascript
// When a state change has happened and the UI needs to update,
// passing the signal that caused the change
controller.on('change', ({signal}) => {})

// When a state change has happened and the UI needs to update,
// passing the state paths that has changed.
controller.on('flush', (changes) => {})

// When some error has happened
controller.on('error', (error) => {})

// When a signal is being executed
controller.on('signalStart', ({signal}) => {})

// When a signal is done executing
controller.on('signalEnd', ({signal}) => {})

// When an action is being executed
controller.on('actionStart', ({signal, action}) => {})

// When an action is done executing
controller.on('actionEnd', ({signal, action}) => {})

// When a signal has been prevented from executing
controller.on('signalPrevented', ({signal}) => {})

// When some error has happened during execution of a signal.
controller.on('signalError', ({signal, action}) => {})

// When all modules have loaded
controller.on('modulesLoaded', () => {})
```
