## cerebral-computed-fuse

Go to official [README](https://github.com/cerebral/cerebral-computed-fuse/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
[Fuse](https://github.com/krisk/Fuse) is a project that lets you fuzzy search on data. Cerebral lets you add fuzzy search to your project using computed.

### Install
`npm install cerebral-computed-fuse --save`

### Add fuzzy search
You pass three arguments to a fuse computed. The first argument is where the data is located in your model. The second is where the query is located. Last you pass what keys each object in the array should be indexed and searched upon.

```js
import React from 'react'
import { connect } from 'cerebral-view-react'
import fuse from 'cerebral-computed-fuse'

export default connect({
  users: fuse('app.users', 'app.query', ['firstName', 'lastName'])
}, ({ users }) => (
  <ul>
    {users.map(user => (
      <li>{`${user.firstName} ${user.lastName}`}</li>
    ))}
  </ul>
))
```

### Fuzzy search in actions
You can also access the filtered data from an action using the same computed function.

```js
import fuse from 'cerebral-computed-fuse'

function myAction({ state }) {
  const users = state.computed(fuse('app.users', 'app.userQuery', ['firstName', 'lastName']))
}

export default
```
