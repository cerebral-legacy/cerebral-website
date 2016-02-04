You build your application using modules. Modules will separate signals, state and services related to a specific part of your application. The good thing about modules though is that they can reach into any other module if necessary. Here are some key points to modules:

1. Structure your own application by grouping and subgrouping signals, state and services
2. Share your modules between own projects and other Cerebral developers on NPM
3. Use official Cerebral modules that will help you with everything from authentication, to server communication, forms etc.

### Registering a module to the Cerebral controller

```javascript
import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import Home from './modules/Home'
import Recorder from 'cerebral-module-recorder'

const controller = Controller(Model({}));

controller.addModules({
  home: Home({
    foo: 'bar' // Some option
  }),
  recorder: Recorder()
});
```

You register one or multiple modules to your existing Cerebral application. You instantiate a module by calling it and passing any options. A module may, as stated, expose state, signals and services to your application. Shared modules from Cerebral ecosystem may also have related actions, chains and even UI components. You name the module yourself, in this case *myModule* and *recorder*, which will namespace everything related to the module.

### Creating a module

*MyModule.js*
```javascript
import somethingHappened from './signals/somethingHappened'
import somethingElseHappened from './signals/somethingElseHappened'

export default (options = {}) => {
  return (module) => {

    // Set state to your module
    module.addState({
      foo: 'bar'
    })

    // Add signals
    module.addSignals({
      somethingHappened,

      // Signals for synchronous UI updates,
      // typically inputs. Normal signals runs
      // on animation frame
      somethingElseHappened: {
        chain: somethingElseHappened,
        sync: true
      }
    })

    // Add services
    module.addServices({
      hello() {
        return 'hello';
      }
    })

    // Return some META information about the module
    return {}

  };
}
```

### Using a module

#### Actions

```javascript
function myAction({state, services}) {

  // Access any services registered to the app
  services.myModule.hello()

  // Change and get state
  state.set(['myModule', 'foo'], 'bar')
  state.get(['recorder', 'isPlaying'])

  // Create a cursor
  const module = state.select('myModule')
  module.set('foo', 'newBar')

}
```

#### In components

```javascript
@Cerebral({
  foo: ['myModule', 'foo']
})
class MyComponent extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.signals.myModule.somethingHappened()}>
        click
      </button>
    );
  }
}
```

### Creating a submodule

*MyModule.js*
```javascript
import SubModule from './modules/SubModule'

export default (options = {}) => {
  return (module) => {

    module.addModules({
      subModule: SubModule()
    });

  };
}
```

Any modules registered as a submodule will use the namespace of the parent module. That means any state, signals and services created in the *subModule* will be namespaced `myModule.subModule`. Really nothing more to it :-)

### Sharing your module on NPM
There is not much difference in creating your own application specific module and creating a module that can be shared. But the fact that other developers can namespace your module to whatever they want, you need a way to access your module consistently.

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

#### Accessing your module in components
All Cerebral decorated components gets the modules as a property.

```javascript
@Cerebral((props) => ({
  myModule: props.modules['cerebral-module-myModule'].path
}))
class MyModuleComponent extends React.Component {
  render() {
    return <div>{this.props.myModule.foo}</div>
  }
}
```

This makes it possible for consumers of your shared module to just use your exposed actions and components without
any configuration:

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

#### Trigger signals from services
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
If a shared module can have multiple instances you will need to construct your signals in a way that makes them now which instance they should talk to.

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
  ...signalA(['app.genericA'])
]
```

### Grab values across model packages
You can use `state.toJS(path)` to ensure that you get the plain JavaScript representation of values you extract.
