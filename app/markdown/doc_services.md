## Services

When you are not doing state changes in an action you are likely trying to create a side effect. Side effects are logic out of Cerebrals control. Typically it is related to asynchronous things like HTTP requests, but it can also be things like storing things to local storage which is synchronous. Services in Cerebral wraps these operations in a function. That is it, services are just functions, but functions Cerebral knows about. That means any calls to services can be seen in the debugger.

When creating services you typically use a module. That way you can use the closure of the module to keep internal state related to the services and not your application. A typical example is passing in options to the services:

```javascript
import someExternalApi from 'some-external-api'

export default (options = {}) => module => {

  if (!options.apiKey) {
    throw new Error('This service needs an apiKey')
  }

  module.addServices({
    connect() {
      return someExternalApi.connect({
        apiKey: options.apiKey
      })
    }
  })

}
```

Now we effectively use a module to hold the options passed in on instantiation of the module.

```javascript
import {Controller} from 'cerebral'
import Model from 'cerebral/models/immutable'

import MyServiceModule from './modules/MyServiceModule'

const controller = Controller(Model({}))

controller.addModules({
  myService: MyServiceModule({
    apiKey: '123'
  })
})

export default controller
```

### Structuring services
Some services might get pretty large. To handle that it is a good idea to use factories. For example:

```javascript
import ServiceA from './services/ServiceA'
import ServiceB from './services/ServiceB'

export default (options = {}) => (module, controller) => {

  module.addServices({
    serviceA: ServiceA(options, controller),
    serviceB: ServiceB(options, controller)
  })

}
```
