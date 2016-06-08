## Defining signals

The signals of Cerebral is where you define what should happen when a user interacts with the application, or some other event like a websocket message is received. You can think of signals as a decision or behaviour tree. It allows you to express complex flows in a natural way. You will be able to read all the logic of the change in one file and Cerebral knows how the signal will run before it is even run. This allows the debugger to give you great insight into running signals and historic signals.

In the **quickstart** application there are already two signals defined.

```javascript
import newItemTitleChanged from './signals/newItemTitleChanged'
import newItemSubmitted from './signals/newItemSubmitted'

...

const controller = Controller(model)

controller.addSignals({
  newItemTitleChanged: {
    chain: newItemTitleChanged,
    immediate: true
  },
  newItemSubmitted
})
```

As you can see we are defining the name of these signals in "past tense". What happened in your application for these signals to trigger. This gives some advantages:

* Your UI stays dumb. Meaning that the UI has no knowledge of what is happening inside your application, it just tells your application what is happening in the UI
* When you open a signal file you know what causes the signal to trigger by just reading its name
* Signals tends to grow and do multiple things. This ensure that you do not have to refactor the name of your signal and the UI when the scope of a signal increases

As you can see we define our two signals differently. The reason is that by default Cerebral will trigger signals after the next animation frame of the browser. That ensures that your business logic and a new render of your application happens at the optimal time. But when we update the state of inputs and textareas we have to do that *synchronously*, or immediately as we call it in Cerebral world. So our **newItemTitleChanged** signal runs immediately, but **newItemSubmitted** runs right after the next animation frame.

Let us take a look at the **newItemTitleChanged** signal.

```javascript
import copy from 'cerebral-addons/copy'

default export [
  copy('input:/title', 'state:/newItemTitle')  
]
```

As you can see a signal is an array. An array that describes what should happen when the signal triggers. By using the [cerebral-addons]() package we get some helpers that you will most definitely use to make changes to the state amongst other things. In this signal we are copying the title from the input of the signal over to the path **newItemTitle** in our model. This is the most straight forward state change you can do. Your UI has passed in a payload to the signal which is available on the input and we copy it into our model.

This **copy** function is something we call an action factory. So when we call this function it will return an action that the signal executes. We will look more into these actions in [the next steps]() section.

#### Summary
Signals is where you define the *business logic* of your application. They are at the core of Cerebral and makes it possible for you and your team members to quickly understand how state changes run in your application. Signals can become very complex, but they are still easy to read and understand. As you work on larger application you are free to create your own action factories and even chain factories, as we will look more into later.
