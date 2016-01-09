# Modules DRAFT 2 (EXPERIMENTAL)

Cerebral Modules is still in experimental stage, but we are closing in on the API. This is what modules allows you to do:

1. Structure your own application by grouping and subgrouping signals, state and services
2. Share your modules between own project and other Cerebral developers
3. Use official Cerebral modules that will help you with everything from authentication, to server communication, forms etc.

### Registering a module

```javascript

import controller from './controller';
import SomeModule from './SomeModule';
import RecorderModule from 'cerebral-module-recorder';

controller.modules({
  myModule: SomeModule({
    foo: 'bar'
  }),
  recorder: RecorderModule()
});

```

You register one or multiple modules to your existing Cerebral application. You instantiate a module by calling it and passing any options. A module may, as stated, expose state, signals and services to your application. It may also have related actions, chains and even UI components. You name the module yourself, in this case *myModule* and *recorder*, which will namespace everything related to the module.

### Creating a module

*MyModule.js*
```javascript

import somethingHappened from './signals/somethingHappened';
import somethingElseHappened from './signals/somethingElseHappened';

export default (options = {}) => {
  return (module) => {

    // Set state to your module
    module.state({
      foo: 'bar'
    });

    // Add signals
    module.signals({
      somethingHappened
    });

    module.signalsSync({
      somethingElseHappened
    });

    // Add services
    module.services({
      hello() {
        return 'hello';
      }
    });

    // Return some META information about the module
    return {};

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

import SubModule from './modules/SubModule';

export default (options = {}) => {
  return (module) => {

    module.modules({
      subModule: SubModule()
    });

  };
}
```

Any modules registered as a submodule will use the namespace of the parent module. That means any state, signals and services created in the *subModule* will be namespaced `myModule.subModule`. Really nothing more to it :-)

### Sharing a module
There is not much difference in creating your own application specific module and creating a module that can be shared. But the fact that other developers can namespace your module to whatever they want, you need a way to access your module.

*MyModule.js*
```javascript

import somethingHappened from './signals/somethingHappened';

export default (options = {}) => {
  return (module) => {

    // Alias is a second namespace you can access the module on
    // All Cerebral modules should be named "cerebral-module-xxx"
    module.alias('cerebral-module-myModule');

    module.signals({
      somethingHappened
    });

    module.services({
      foo() {}
    });

  };
}
```

#### Accessing your shared module in actions
```javascript

function mySharedModuleAction({module}) {
  module.services.foo;
}
```
Or if you want to access some other shared module, use its alias name:

```javascript

function mySharedModuleAction({modules}) {
  modules['cerebral-module-otherModule'].state.get();
}
```

#### Accessing your module in components
```javascript

@Cerebral((props) => ({
  myModule: props.modules['cerebral-module-myModule'].path
}))
class MyModuleComponent extends React.Component {
  render() {
    return <div>{this.props.myModule.foo}</div>;
  }
}
```

This makes it possible for consumers of your shared module to just use your exposed actions and components without
any configuration:

```javascript

import ModuleComponent from 'cerebral-module-myModule/ModuleComponent';

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

### Multi-instance shared modules
If a shared module can have multiple instances the developer consuming the module will have to specify the module name.

```javascript

import SharedModuleAction from 'cerebral-module-someModule/actions/SharedModuleAction';

const chain = [
  SharedModuleAction('mySharedModuleNameSpace')
];
```

```javascript

import ModuleComponent from 'cerebral-module-myModule/ModuleComponent';

class MyAppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>I just included a shared module component</h1>
        <ModuleComponent module="mySharedModuleNameSpace"/>
      </div>
    );
  }
}
```
