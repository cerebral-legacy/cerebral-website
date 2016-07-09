## Modules

Primarily you use modules to organize your code. They create namespaces for your state, signals and services. You create modules based on the domain of the application and complexity. For example if your application has multiple pages it is typical to create a module for each page. But you might also have other complex sections like a modal to create a new post, or whatever. These can also have their own modules, or be submodules of an other module. The important thing to understand is that a module is just a namespace, it is about structuring code and you are free to structure it however you want.

Modules are registered to the controller:

```javascript
import {Controller} from 'cerebral'
import Model from 'cerebral-model-immutable'

import Home from './modules/Home'
import Admin from './modules/Admin'

const controller = Controller(Model({}))

controller.addModules({
  home: Home,
  admin: Admin
})

export default controller
```

Notice that we choose a namespace for the module used. The *home* namespace could also have been *start*, but still using the Home module. To create a module you use a function which is passed the module instance:

*modules/Home/index.js*
```javascript
import changeTab from './chains/changeTab'

export default module => {

  module.addState({
    currentTabIndex: 0,
    posts: {}
  })

  module.addSignals({
    tabClicked: changeTab
  })

}
```

### Methods

#### module
You create a module with a function. This function receives the instance of the module and also the controller in case you need to allow your services to trigger signals etc.

```javascript
export default (module, controller) => {

}
```

#### module.addState(object)
Adds state to the namespace the module is added to.

```javascript
export default module => {

  module.addState({
    foo: 'bar'
  })

}
```

#### module.addSignals(signals)
Adds signals to the namespace the module is added to.

```javascript
import doSomething from './chains/doSomething'

export default module => {

  module.addSignals({
    buttonClicked: doSomething
  })

}
```

#### module.addServices(services)
Adds services to the namespace the module is added to.

```javascript
import serviceA from './services/serviceA'
import serviceB from './services/serviceB'

export default module => {

  module.addServices({
    serviceA,
    serviceB
  })

}
```

#### module.addModules(modules)
Adds submodules to the namespace the module is added to.

```javascript
import SubModuleA from './modules/SubModuleA'
import SubModuleB from './modules/SubModuleB'

export default module => {

  module.addModules({
    subModuleA: SubModuleA,
    subModuleB: SubModuleB
  })

}
```
