## Signals

To change the state of your application you have to trigger a signal. A signal controls the execution of actions. That means it is not the signal itself that handles the state changes, it handles the flow of state changes. This is where Cerebral is unique. You might have heard of [RxJS]() or [asequence](). These are really great tools that also handles flow, but they are not specifically built to handle application state changes and notify a view layer about what state changes has been done. Signals in Cerebral are all about that.

### Defining a signal
Signals are defined as an array.

```javascript
import actionA from '../actions/actionA'
import actionB from '../actions/actionB'

export default [
  actionA,
  actionB
]
```

When this signal triggers it will first run **actionA** and then run **actionB**. Nothing special about that. But signals has more complex flow control than this. For example if **actionA** is defined as an async action it will wait for it to finish before executing **actionB**:

```javascript
import asyncActionA from '../actions/asyncActionA'
import actionB from '../actions/actionB'

export default [
  asyncActionA,
  actionB // Runs when A is done
]
```

#### Parallel execution
Sometimes you want two, or more, asynchronous actions to run in parallel. You achieve that by putting the actions inside another array:

```javascript
import asyncActionA from '../actions/asyncActionA'
import asyncActionB from '../actions/asyncActionB'
import actionC from '../actions/actionC'

export default [
  [
    asyncActionA,
    asyncActionB
  ],
  actionC // Runs when both A and B is done
]
```

### Paths
When handling application state changes it is very typical that things happen conditionally. A server response is not always a success, users might have different roles and maybe you only want to run certain flows when the user is authenticated. Normally we use IF statements to handle this in our code, but Cerebral signals uses objects.

```javascript
import getItems from '../actions/getItems'
import setItems from '../actions/setItems'
import setItemsError from '../actions/setItemsError'

export default [
  getItems, {
    success: [
      setItems
    ],
    error: [
      setItemsError
    ]
  }
]
```

The action **getItems** will at some point output either a *success* or an *error*. The paths object identifies this output and runs the corresponding path. Here is an other example:

```javascript
import isLoggedIn from '../actions/isLoggedIn'
import showHiddenThing from '../actions/showHiddenThing'

export default [
  isLoggedIn, {
    true: [
      showHiddenThing
    ],
    false: []
  }
]
```
Even though nothing happens when the user is not logged in we explicitly say that nothing does happen using an empty array. This reads better because it tells "the next developer" that the user might not be logged in. It also makes it very easy to later extend this signal as all possible scenarios are defined.

### Composing signals
The array used to define a signal is what we call a **chain**. With the spread operator we can compose these chains (arrays) together. As an example we want to fetch items when the application loads, but also have a button click that does the same thing. We first define a chain:

*chains/updateItems.js*
```javascript
import getItems from '../actions/getItems'
import setItems from '../actions/setItems'
import setItemsError from '../actions/setItemsError'

export default [
  getItems, {
    success: [
      setItems
    ],
    error: [
      setItemsError
    ]
  }
]
```

And now we can define our two signals **appMounted** and **refreshClicked**. When the app mounts we want to fetch both the items and the notifications, but on the button click we only want to fetch the items.

*signals/appMounted.js*
```js
import updateItems from '../chains/updateItems'
import updateNotifications from '../chains/updateNotifications'

export default [
  ...updateItems,
  ...updateNotifications
]
```

*signals/refreshClicked.js*
```js
import updateItems from '../chains/updateItems'

export default [
  ...updateItems
]
```

The really good thing about this composition is that the debugger looks at both of these signals as a complete signal. Meaning that you get all the details about them as if the contents of the chain was defined directly in the signal.
