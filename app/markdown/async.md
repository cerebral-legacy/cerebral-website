Actions can run synchronously or asynchronously. When they run *sync* they are able to change the state of the application. When they run async they are not. An async action is only able to grab data and output it to the signal where the next action in line is able to change the state again.

```javascript
const somethingHappened = [
  syncAction,
  asyncAction
]

module.addSignals({
  somethingHappened
})
```

To define an action as asynchronous you attach a property to it.

```javascript
function getTodos({services, output}) {
  services.http.get('/todos')
    .then(output.success)
    .catch(output.error)
}

getTodos.async = true

export default getTodos
```

All *async* actions has to call the output or the signal will not continue.


If you want *async* actions to run in parallel you are able to group them with an array. This forces the actions to run asynchronously.

```javascript
const somethingHappened = [
  syncAction,
  [
    asyncAction,
    asyncAction2
  ]
]

module.addSignals({
  somethingHappened
})
```

Actions defined after an asynchronous array will run after all the actions inside the array are done.

```javascript
const somethingHappened = [
  syncAction,
  [
    asyncAction,
    asyncAction2
  ],
  afterAsyncsAreDone
]

module.addSignals({
  somethingHappened
})
```

Even though the actions run in parallel they also have individual behavior. This is related to paths. In the following example the success path of each action will run when it outputs.

```javascript
const somethingHappened = [
  syncAction,
  [
    wait1000, {
      success: [runsAfter1000]
    },
    wait2000, {
      success: [runsAfter2000]
    }
  ],
  runsAfter2000
]

module.addSignals({
  somethingHappened
})
```

Sometimes you want to track the progress of parallel async operations. You achieve this simply by using actions.

```javascript
function resetProgress ({state}) {
  state.set('progress', 0)
}

function progress ({state}) {
  state.set('progress', state.get('progress') + 50)
}

const somethingHappened = [
  resetProgress,
  [
    wait1000, {
      success: [progress]
    },
    wait2000, {
      success: [progress]
    }
  ]
]

module.addSignals({
  somethingHappened
})
```

You could of course create a factory to make this more dynamic.
