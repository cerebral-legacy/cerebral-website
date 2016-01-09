# Compute

Very often it is necessary to compute state. Some libraries do this inside the components, others do it inside the state store. With Cerebral you do it when state is extracted from Cerebral. This allows computed state to be run on any state store, it being Baobab or Immutable JS.

Computed state are just functions with a special `get` function.
```javascript

// Grab values as normal, as if it was an action
const displayedMessages = function (get) {
  return get(['displayedMessagesIds']).map((id) => get(['messages', id]));
}

// You can also grab existing computed state
const foo = function (get) {
  return 'Wazah!';
}

const bar = function (get) {
  return get(foo) + '!!!!';
}

```

The compute functions are very smart. They will automatically run when needed by analyzing the state you are grabbing when running it. This means that in this case if *displayedMessagesIds* change or any of the grabbed *messages*, this function will run when the UI updates. If nothing has changed it will return the previous value.

You use them the same way as normal state, though just referencing the computed function.

```javascript

import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import displayedMessages from './computed/displayedMessages';

@Cerebral({
  title: ['title'],
  messages: displayedMessages
})
class App extends React.Component {
  renderMessage(message, index) {
    return (
      <li key={index}>
        {message.name}
      </li>
    );
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <ul>
          {this.props.messages.map(this.renderMessage)}
        </ul>
      </div>
    );
  }
}

export default App;
```

You can also use them inside actions.

```javascript

import displayedMessages from '../computed/displayedMessages';

function myAction({state}) {
  const messages = state.get(displayedMessages);
}
```
