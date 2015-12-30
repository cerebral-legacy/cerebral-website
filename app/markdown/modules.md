# Modules (EXPERIMENTAL)

Cerebral modules is a concept in the making. It is an API with multiple goals:

1. Allow you to structure your own application, namespacing signals
2. Allow you to expose services to your application
3. Share your modules with other Cerebral developers, exposing services, signals and even UI components

The vision is to allow you to search for modules on the Cerebral site. These modules can help you with anything from connecting to Firebase, pouchdb, localStorage, forms, UI frameworks etc.

### Using a module

```javascript

import controller from './controller';
import SomeModule from './SomeModule';

controller.register({
  myModule: SomeModule({
    foo: 'bar'
  })
});

```

You register one or multiple modules to your existing Cerebral application. You instantiate a module by calling it an passing any options. A module may, as stated, expose signals, services and even components to your application. You name the module yourself, in this case *myModule*, which will namespace signals and services exposes. These are the ways you can access the module, depending on the type of module:

#### As a service in an action

```javascript

function myAction({services}) {
  services.myModule.someServiceMethod();
}
```

#### As a signal

```javascript

class MyComponent extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.signals.myModule.someSignal()}>
        click
      </button>
    );
  }
}
```

#### As other exposed module data

```javascript

class MyComponent extends React.Component {
  render() {
    const Page = this.props.modules.myModule.Component;
    return <Page/>;
  }
}
```

### Building a module

```javascript

export default (options) => {
  return {
    init({name, controller}) {
      // Do whatever custom stuff you need with the controller
      return {
        metaA: 'foo',
        metaB: 'bar'
      };
    },
    signals: {
      mySignal: [] // A normal signal chain
    },
    signalsSync: {
      mySyncSignal: [] // A sync signal chain
    },
    services: {
      myService: {} // Some service or service method
    }
  }
};
```

Any signals or services registered are automatically namespaced to the name of the module defined by the user of the module.
