## Description
Read more about the Cerebral router in the **Routing** section.

**Important!** Currently the router has to be namespaced to `router`.

### Install
`$ npm install cerebral-module-router`

### Use

```javascript
import controller from './controller'
import RouterModule from 'cerebral-module-router'

controller.addModules({
  router: RouterModule({
    '/': 'home.routed'
  }, {
    onlyHash: true
  })
})
```

#### Services

```javascript
services.{namespace}.redirect('/to/some/url')
```

#### Action factories

```javascript
import {redirect} from 'cerebral-module-router'

export default [
  [
    getSomething, {
      success: [setSomething],
      error: [redirect('/error')]
    }
  ]
]
```
