# cerebral-provider-modules
Modules pattern for Cerebral

`npm install cerebral-provider-modules`

```js
import ModulesProvider from 'cerebral-provider-modules';

controller.addModules({})

// Add it after modules are registered 
controller.addContextProvider(ModulesProvider);
```

```js
function SomeAction({module, modules}) {
  module.meta // returned value from module declaration
  module.state.set('foo', 'bar');
  module.services.foo();

  modules.someOtherModule.meta // returned value from module declaration
  modules.someOtherModule.state.set('foo', 'bar');
  modules.someOtherModule.services.foo();
}
```
