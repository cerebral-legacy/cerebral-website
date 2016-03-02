The way you think of signals is that something happened in your application. Either in your UI, a router, maybe a websocket connection etc. So the name of a signal should define what happened: *appMounted*, *inputChanged*, *formSubmitted*. The functions in a signal are called **actions**. They are named by their purpose, like *setInputValue*, *postForm* etc. This setup makes it very easy for you to read and understand the flow of the application.

This is a typical signal:

```javascript
const appMounted = [
  setLoading,
  getUser, {
    success: [setUser],
    error: [setUserError]
  },
  unsetLoading
];

module.addSignals({
  appMounted
})
```

As you can see, there are not only functions that are used to express flow. You also have arrays and objects. Arrays are used to define a chain of actions. An object is used to define paths. This means that the execution of an action can result in different outcomes. Each output path is itself just a normal chain of actions.

### Force synchronous UI updates

By default Cerebral will run your signals between animation frames. Sometimes you want to trigger UI updates synchronously as soon as a signal has finished. Typically this is related to inputs.

```javascript
import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'

@Cerebral({
  value: ['home', 'inputValue']
})
class App extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.value}
          onChange={(e) => this.props.signals.home.valueChanged.sync({value: e.target.value})}
        />
      </div>
    )
  }
}
```

All signals have a `.sync()` method. Use this when you want to trigger a signal and a UI update completely synchronous. You can also set this on signal definition:

```javascript
const inputChanged = [
  setInputValue
]

module.addSignals({
  inputChanged: {
    chain: inputChanged,
    sync: true
  }
})
```
