## cerebral-addons

Go to official [README](https://github.com/cerebral/cerebral-addons/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
In addition to the Cerebral core **operators** you have some more factory functions for doing state changes and other operations directly in your chains.

The Cerebral addons project is more of an experimental project for testing out new operators that might be moved into core when proven completely necessary. Please share your thoughts on them on the repo issues or the chat.

### Using the addons
You use the addons when defining chains.

```javascript
import {copy} from 'cerebral/operators'
import merge from 'cerebral-addons/merge'

export default [
  copy('input:userData', merge('state:app.user'))
]
```

### getters

#### and

You can think of it as `&&` for chains.

```js
import {when} from 'cerebral/operators'
import {and} from 'cerebral-addons'

export default [
  when(and('state:firstCondition', 'input:otherCondition')), {
    true: [],
    false: []
  }
]
```

#### isEqual
Think of it as `===` for chains.

```js
import {when} from 'cerebral/operators'
import {isEqual} from 'cerebral-addons'

export default [
  when(isEqual('state:firstValue', 'input:otherValue')), {
    true: [],
    false: []
  }
]
```

#### isDeepEqual
Think of it as `===` for chains, but "similar objects" rather than exact reference/value match.

```js
import {when} from 'cerebral/operators'
import {isDeepEqual} from 'cerebral-addons'

export default [
  when(isDeepEqual('state:firstValue', 'input:otherValue')), {
    true: [],
    false: []
  }
]
```

#### literal
Lets you define a value to be used by the operator. It can be a string, number, boolean, object or array.

```js
import {copy} from 'cerebral/operators'
import {literal} from 'cerebral-addons'

export default [
  copy(literal('someString'), 'output:value')
]
```

#### not
Think of it as `!` for chains.

```js
import {when} from 'cerebral/operators'
import {and, not} from 'cerebral-addons'

export default [
  when(and('state:firstCondition', not('input:otherCondition'))), {
    true: [],
    false: []
  }
]
```

#### or
Think of it as `||` for chains.

```js
import {when} from 'cerebral/operators'
import {or} from 'cerebral-addons'

export default [
  when(or('state:firstCondition', 'input:otherCondition')), {
    true: [],
    false: []
  }
]
```

#### findWhere
Grab object from an array matching the predicate.

```js
import {copy} from 'cerebral/operators'
import {findWhere} from 'cerebral-addons'

export default [
  copy(findWhere('state:users', { name: 'John' }), 'output:john')
]
```

#### pop
Pops last item from array.

```js
import {copy} from 'cerebral/operators'
import {pop} from 'cerebral-addons'

export default [
  copy(pop('state:users'), 'output:lastUser')
]
```


#### shift
Removes first item from array.

```js
import {copy} from 'cerebral/operators'
import {shift} from 'cerebral-addons'

export default [
  copy(shift('state:users'), 'output:firstUser')
]
```

### setters

#### merge
Merge object with object.

```js
import {copy} from 'cerebral/operators'
import {merge} from 'cerebral-addons'

export default [
  copy('input:newData', merge('state:allData'))  
]
```

#### push
Push value to array.

```js
import {copy} from 'cerebral/operators'
import {push} from 'cerebral-addons'

export default [
  copy('input:newUser', push('state:users'))
]
```

#### unshift
Put item to top of array.

```js
import {copy} from 'cerebral/operators'
import {unshift} from 'cerebral-addons'

export default [
  copy('input:newUser', unshift('state:users'))
]
```

### Creating getters

A getter is a function that accepts the args passed to an action method and returns some value.

```javascript
// getter should return a value or a promise which will later resolve to a value
[promise] getter(args)
```

#### Example
an example getter might get some data from the server:
```javascript
// define the getter
function httpGet(url) {
  return function (args) {
    return new Promise(resolve => {
      getDataFromServer(url, function (err, data) {
        resolve(data)
      })
    })
  }
}

// use the getter
[
  copy(httpGet('/api/date.json'), 'state:date'), {
    success: [],
    error: []
  }
]
```

### Creating setters

A setter is a function that accepts the args passed to an action method and the value to set.

```javascript
// if the setter returns a promise then the addon will wait for it to resolve before continuing
[promise] setter(args, value)
```

if the setter is async then the addon will also pass on the resolve value to the success chain

#### Example
an example setter might post some data to the server:
```javascript
// define the setter
function httpPost(url) {
  return function (args, value) {
    return new Promise(resolve => {
      postDataToServer(url, value, function (err, data) {
        resolve(data) // response from server will be passed onto success chain
      })
    })
  }
}

// use the setter
[
  copy('state:date', httpPost('/api/date.json')), {
    success: [],
    error: []
  }
]
```
