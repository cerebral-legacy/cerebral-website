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
