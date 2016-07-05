# cerebral-provider-modules
Modules pattern for Cerebral

`npm install cerebral-provider-modules`

```js
import ModulesProvider from 'cerebral-provider-modules';

(controller || module).addContextProvider(ModulesProvider);
```

```js
function SomeAction({module, modules}) {
  module.meta // returned value from module declaration
  module.state.set('foo', 'bar');
  module.services.foo();

  modules.someOtherModule.meta // returned value from module declaration
  modules.someOtherModule.state('foo', 'bar');
  modules.someOtherModule.services.foo();
}
```
