## Actions

When you develop a Cerebral application you will create actions to change the state of your application, run side effects like talking to the server and also run other business logic.

An action is just a function that receives a context:

```javascript
function myAction(context) {

}
```

The context is an object and it gets populated by Cerebral. By default you have four properties on the context:

```javascript
function myAction({input, state, output, services}) {

}
```

Let us put the action into a signal and explore these properties.

```javascript
import myAction from '../actions'

export default [
  myAction
]
```

### Input
When a signal triggers it can be passed a payload. This payload is the input to the signal. So when we trigger a a signal with the payload: `{foo: 'bar'}`, the action would look like:

```javascript
function myAction({input, state, output, services}) {
  input // {foo: "bar"}
}
```

### State
To make changes to the state of your application you use the state API passed to the actions. You use it both to get state and change the state.

```javascript
function myAction({input, state, output, services}) {
  // Given the state: {foo: {bar: "value"}}
  state.get() // {foo: {bar: "value"}}
  state.get('foo') // {bar: "value"}
  state.get('foo.bar') // "value"

  // If you have computed functions they can
  // also be used inside an actions
  state.computed(getMyComputedValue())

  // If the value is an array you can do this
  // to match first object in list
  state.findWhere('app.list', {id: 3})

  // Before: {foo: "bar"}
  state.set('foo', 'newBar')
  // After: {foo: "newBar"}

  // Before: {foo: "bar"}
  state.unset('foo')
  // After: {}

  // Before: {foo: {a: 'A', b: 'B'}}
  state.unset('foo', ['a', 'b'])
  // After: {foo: {}}

  // Before: {foo: {bar: 'bar'}}
  state.merge('foo', {bar2: 'bar2'})
  // After: {foo: {bar: "bar", bar2: "bar2"}}

  // NOTE on merge! If you point to the path
  // "foo.bar" in a component/computed and you
  // merge on "foo", the component/computed will
  // not update

  // Before: {foo: ["bar"]}
  state.push('foo', 'bar2')
  // After: {foo: ["bar", "bar2"]}

  // Before: {foo: ["bar"]}
  state.unshift('foo', 'bar2')
  // After: {foo: ["bar2", "bar"]}

  // Before: {foo: ["bar", "bar2"]}
  state.pop('foo')
  // After: {foo: ["bar"]}

  // Before: {foo: ["bar", "bar2"]}
  state.shift('foo')
  // After: {foo: ["bar2"]}

  // Before: {foo: ["bar"]}
  state.concat('foo', ['bar2', 'bar3'])
  // After: {foo: ["bar", "bar2", "bar3"]}

  // Before: {foo: ["bar", "bar2", "bar3"]}
  state.splice('foo', 1, 1)
  // After: {foo: ["bar", "bar3"]}
}
```

### Output
Any action can output values to the signal. The outputted values will be merged with the current input and be passed into any actions executed next. Note that you always output an object to the output and this object has to be **serializable**. That means any functions, prototypes etc. you output will be lost. This is not really a limitation, it is a constraint to make Cerebral more interoperable.

```javascript
function myAction({input, state, output, services}) {
  input // {}
  output({foo: 'bar'})
}

function myNextAction({input}) {
  input // {foo: "bar"}
}

export default [
  myAction,
  myNextAction
]
```

#### Outputting to paths
When you want your action to output to specific paths you have to define that on the action itself.

```javascript
function myAction({state, output}) {
  if (state.get('app.isAwesome')) {
    output.awesome()
  } else {
    output.notSoAwesome()
  }
}
myAction.outputs = ['awesome', 'notSoAwesome']
```

Now Cerebral knows what this action expects as paths:

```javascript
import myAction from '../actions/myAction'

export default [
  myAction, {
    awesome: [],
    notSoAwesome: []
  }
]
```

### Services
We can not build applications without side effects. In Cerebral side effects are contained in services. This allows Cerebral to track their usage and help you understand how side effects are being triggered in your application.

```javascript
function myAction({output, services}) {
  services.myService()
    .then(output.success)
    .catch(output.error)
}
```

### Async actions
Very often you want to run actions asynchronously. This is typically related to server requests. When you define an action as asynchronous you have to output to the signal so that the signal knows when it is done.

```javascript
function myAction({output}) {
  setTimeout(output, 1000)
}
myAction.async = true
```
