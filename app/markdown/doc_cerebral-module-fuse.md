## cerebral-module-fuse

Go to official [README](https://github.com/cerebral/cerebral-module-fuse/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
The fuse module allows you to do fuzzy search on different parts of of your model.

It is based on [Fuse](https://github.com/krisk/Fuse).

### Instantiate the module
```javascript
...

import Fuse from 'cerebral-module-fuse'

...

controller.modules({
  findUsers: fuse({
    // statePath should point to either an object or array in the store
    statePath: 'users',  
    // options are passed on to fuse.js
    options: { keys: ['firstName', 'lastName'] }
  })
})
```
You can have multiple instances of fuse.

### Use it in components

```js
import React from 'react'
import { connect } from 'cerebral-view-react'
import fuse from 'cerebral-module-fuse/computed'

export default connect({
  users: fuse({ modulePath: 'findUsers', statePath: 'users' })
}, ({ users }) => (
  <ul>
    {users.map(user => (
      <li>{`${user.firstName} ${user.lastName}`}</li>
    ))}
  </ul>
))
```

to execute the search simply call the `search` signal and the view will automatically update

```js
signals.findUsers.search({ query: 'John' })
```

you can also access the filtered data from an action via the provided service

```js
export default myAction({ state, services: { findUsers } }) {
  const users = findUsers.get(state)
}
```
