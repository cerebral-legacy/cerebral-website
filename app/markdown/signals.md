# Signals

The way you think of signals is that something happened in your application. Either in your UI, a router, maybe a websocket connection etc. So the name of a signal should define what happened: *appMounted*, *inputChanged*, *formSubmitted*. The functions in a signal are called **actions**. They are named by their purpose, like *setInputValue*, *postForm* etc. This setup makes it very easy for you to read and understand the flow of the application.

This is a typical signal:

```javascript

const appMounted = [
  setLoading,
  [
    getUser, {
      success: [setUser],
      error: [setUserError]
    }
  ],
  unsetLoading
];

controller.signals({
  appMounted
});
```

As you can see, there are not only functions that are used to express flow. You also have arrays and objects. Normally arrays and object literals define data structure. Inside a signal however, they define behaviour. An array inside an array means its contents will run asynchronously. The *getUser* action will run asynchronously. An object is used to define paths. This means that the execution of an action can result in different outcomes. Each output path is itself just a normal chain of actions, subject to the same rules as normal. For example, you can define sub-paths within paths and if you want to use an asynchronous action within a path, you'd still need to wrap it in an a second array.

### Force synchronous UI updates

By default Cerebral will run your signals between animation frames. Sometimes you want to trigger UI updates synchronously as soon as a signal has finished. Typically this is related to inputs.

```javascript

import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';

@Cerebral({
  value: ['inputValue']
})
class App extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.value}
          onChange={(e) => this.props.signals.valueChanged.sync({value: e.target.value})}
        />
      </div>
    );
  }
}
```

All signals have a `.sync()` method. Use this with inputs to avoid glitches in UI. You can also register a signal as sync:

```javascript

const inputChanged = [
  setInputValue
];

controller.signalsSync({
  inputChanged
});
```
