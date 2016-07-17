## Feedback messages

Feedback messages, snackbars, popups etc. There are many names and approaches to how you give users feedback about what they are doing in your application, and maybe more importantly if something goes wrong. These feedback messages can actually be surprisingly complex. The reason is that you do not know when the next message will appear. Maybe showing the first one is not done yet... what should happen? Should it overwrite the current message, but what about the timing? Should it extend the timing of showing that message? Or maybe you want to display the messages on top of the other messages?

We are going to explore how we can solve these scenarios using Cerebral.

### A simple feedback message
Let us add a state for showing the message first in our **App** module:

```javascript
export default module => {

  module.addState({
    feedbackMessage: {
      show: false,
      message: null
    }
  })

}
```

Now let us create a chain factory we can compose into any other chain to display this message.

```javascript
import {set, delay} from 'cerebral/operators'

export default (message) => {
  return [
    set('app.feedbackMessage.show', true),
    set('app.feedbackMessage.message', message),
    delay(5000),
    set('app.feedbackMessage.show', false),
    set('app.feedbackMessage.message', null)
  ]
}
```

We can now compose this chain into another chain, for example doing a request:

```javascript
import getSomething from '../actions/getSomething'
import setSomething from '../actions/setSomething'
import feedbackMessage from '../factories/feedbackMessage'

export default [
  getSomething, {
    success: [
      setSomething,
      ...feedbackMessage('Fetched something!')
    ],
    error: [
      ...feedbackMessage('Failed fetching something :()')
    ]
  }  
]
```
But we have an issue here. What if two message appear within 5 seconds? What if another one is triggered after 4 seconds? It will change the text, but after 1 second it will close... instead of waiting a new 5 seconds. And after another 4 seconds it will try to close it again, without needing to.

Let us see how we can make this better.

### Debouncing
We can use debouncing instead.

```javascript
import {set, debounce} from 'cerebral/operators'

// We first create the close feedback message
// chain. The reason we create it up here is because
// we do not want to create a new debounce for every
// call to our factory, we want to reuse it across
// all the instances
const closeFeedbackMessage = [
  ...debounce(5000, [
    set('app.feedbackMessage.show', false),
    set('app.feedbackMessage.message', null)
  ])
]

export default (message) => {
  return [
    set('app.feedbackMessage.show', true),
    set('app.feedbackMessage.message', message),
    ...closeFeedbackMessage
  ]
}
```

Now we have essentially fixed the problem. If again a new message triggers after 4 seconds, the debounce will discard the first one. If no new messages trigger during 5 seconds it will close the message, or if a new one appears it will again replace the text, discard the previous and wait 5 seconds to close.

### Multiple messages
What if we wanted to stack messages on top of each other if there were messages there already?

First let us change our state to handle multiple messages:

```javascript
export default module => {

  module.addState({
    feedbackMessage: {
      show: false,
      messages: []
    }
  })

}
```

And now let us rather unshift a new message to the array.

```javascript
import {set, debounce} from 'cerebral/operators'

const closeFeedbackMessage = [
  ...debounce(5000, [
    set('app.feedbackMessage.show', false),
    set('app.feedbackMessage.messages', [])
  ])
]

const addMessage = (message) => {
  return function ({state}) {
    state.unshift('app.feedbackMessage.messages', message)
  }
}

export default (message) => {
  return [
    set('app.feedbackMessage.show', true),
    addMessage(message),
    ...closeFeedbackMessage
  ]
}
```

So now as long as we are showing messages we will stack them on top of each other. When 5 seconds has passed without any new messages it will close and clear out all messages.
