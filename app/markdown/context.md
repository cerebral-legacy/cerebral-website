The argument passed to each action is called, **context**. By default this context consists of *input*, *state*, *output* and *services*. You can change this context if you want to.

```javascript
controller.addSignals({
  somethingHappened: {
    chain: [someAction],
    context: {
      foo: 'bar'
    }
  }
})

function someAction({foo}) {
  // Foo is now available with the value "bar"
}
```

You can also set the context of all the signals, and you can use a function instead. Typically you do this on modules.

```javascript
module.addSignals({
  somethingHappened: [someAction]
  }
}, {
  context(context) {
    return {
      ...context,
      modulePath: module.path
    }
  }
})

function someAction({state, modulePath}) {
  state.select([...modulePath, 'someState'])
}
```

This is a rather low level implementation that will allow us to build abstractions on top of it.
