# cerebral-computed-fuse

A cerebral computed function that adds fuzzy search to data in the store.

## Install

```
npm install cerebral-computed-fuse
```

## Api

`fuse(dataPath, queryPath, options)`

where

* `dataPath`: is the location in the state store of an array or hash of objects to search
* `queryPath`: is the location in the state store of a string to search for
* `options`: is an array of keys to search or an fuse options object

> See [fuse docs](https://github.com/krisk/Fuse) for more information about search keys or other available options.

## Usage

```js
import React from 'react'
import { connect } from 'cerebral-view-react'
import fuse from 'cerebral-computed-fuse'

export default connect({
  users: fuse('users', 'query', ['firstName', 'lastName'])
}, ({ users }) => (
  <ul>
    {users.map(user => (
      <li>{`${user.firstName} ${user.lastName}`}</li>
    ))}
  </ul>
))
```

you can also access the filtered data from an action using the same computed function

```js
import fuse from 'cerebral-computed-fuse'

export default myAction({ state }) {
  const users = state.computed(fuse('users', 'query', ['firstName', 'lastName']))
}
```

## Contribute

Fork repo

* `npm install`
* `npm start` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es2015 to es5
