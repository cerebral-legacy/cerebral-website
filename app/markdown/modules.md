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

You register one or multiple modules to your existing Cerebral application. You instantiate a module by calling it and passing any options. A module may, as stated, expose state, signals and services to your application. It may also have related actions, chains and even UI components. You name the module yourself, in this case *myModule* and *recorder*, which will namespace everything related to the module.

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

function myAction({module, modules, services}) {

  // Access the module where the current signal running is registered
  module

  // Access any modules registered to the app
  modules.myModule
  modules.recorder

  // Access any services registered to the app
  services.myModule.hello()

  // Change and get state
  module.state.set(['foo'], 'otherBar');
  modules.recorder.state.get(['isPlaying']);

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

function mySharedModuleAction({module}) {
  module.services.foo
}
```
Or if you want to access some other shared module, use its alias name:

```javascript

function mySharedModuleAction({modules}) {
  modules['cerebral-module-otherModule'].state.get()
}
```

#### Accessing your module in components
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
If a shared module can have multiple instances the developer consuming the module will have to specify the module name.

```javascript

import SharedModuleAction from 'cerebral-module-someModule/actions/SharedModuleAction'

const chain = [
  SharedModuleAction('mySharedModuleNameSpace')
]
```

```javascript

import ModuleComponent from 'cerebral-module-myModule/ModuleComponent'

class MyAppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>I just included a shared module component</h1>
        <ModuleComponent module="mySharedModuleNameSpace"/>
      </div>
    )
  }
}
```

### Grab values across model packages
You can use `state.toJS(path)` to ensure that you get the plain JavaScript representation of values you extract.
