## Factories

When you create actions and chains you sometimes want variations of them. Factories can help you with that. The Cerebral **operators** are actually factories for actions and chains. A typical factory is notifying about errors.

```javascript
import notifyError from '../factories/notifyError'

export default [
  getUser, {
    success: [],
    error: [
      notifyError('Could not get user')
    ]
  }
]
```

A factory is just a function that in this case returns an action. It could be implemented like this:

```javascript
function notifyError(errorMessage) {
  function action({state}) {
    state.set('app.error', errorMessage)
  }

  // You can set custom display names for the debugger
  action.displayName = 'notifyError'

  return action
}

export default notifyError
```

### Chains
You can do the same with chains. Maybe you have some default outputs for doing http requests:

```javascript
export default [
  getUser, {
    success: [],
    notFound: [],
    noAccess: [],
    error: []
  }
]
```

Instead of defining all the outputs on all requests you can create a factory.

```javascript
import {copy} from 'cerebral/operators'
import httpGet from '../factories/httpGet'

export default [
  ...httpGet('/user', [
    copy('input:result', 'state:app.user')
  ])
]
```

The factory could be implemented something like:

```javascript
import {set, copy} from 'cerebral/operators'

function httpGet(url, successChain) {

  function get({services, output}) {
    services.http.get(url)
      .then((result) => {
        switch (result.statusCode) {
          case 200:
            return output.success({result: result.data})
          case 404:
            return output.notFound()
          case 401:
            return output.noAccess()
          default:
            return output.error({error: result.data})
        }
      })
  }
  get.async = true
  get.outputs = ['success', 'error', 'notFound', 'noAccess']
  get.displayName = `httpGet (${url})`

  return [
    get, {
      success: successChain,
      notFound: [
        set('state:app.error', `Could not find entity on ${url}`)
      ],
      noAccess: [
        set('state:app.error', `Do not have access to ${url}`)
      ],
      error: [
        copy('input:error', 'state:app.error')
      ]
    }
  ]
}

export default httpGet
```
