---
title: From 1.x to 2.x
---

## From 1.x to 2.x

To migrate from 1.x to 2.x you need to take the following under consideration.

- There are no models left to choose from. Cerebral comes with one model.
- Services is removed in favor of function-tree/providers

### Controller
Instead of choosing your model and connect to the *Controller* as in 1.x as shown below

```js
import {Controller} from 'cerebral'
import Model from 'cerebral/models/immutable'

const controller = Controller(Model({
  // You can add some initial state here if you want
}))

export default controller
```

You would simple do the following in 2.x

```js
import {Controller} from 'cerebral'

const controller = Controller({
  // You can add some initial state here if you want
})

export default controller
```

### Modules
In 1.x you would have done something like this.

```js
import {Controller} from 'cerebral'
import Model from 'cerebral/models/immutable'

import Home from './modules/Home'
import Admin from './modules/Admin'

const controller = Controller(Model({}))

controller.addModules({
  home: Home,
  admin: Admin
})

export default controller
```

In 2.x it's a simpler process.

```js
import {Controller} from 'cerebral'

import Home from './modules/Home'
import Admin from './modules/Admin'

const controller = Controller({
  modules: {
    home: Home,
    admin: Admin
  }
})

export default controller
```
