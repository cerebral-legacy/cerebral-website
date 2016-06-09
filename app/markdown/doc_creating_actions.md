## Creating actions

Signals in Cerebral executes actions. Actions are just a function that receives a context:

```javascript
function myAction(context) { ... }
```

This context is created by Cerebral using its **context providers**. There are several kinds of context providers and you can also create your own. By default Cerebral will create four properties on this context:

```javascript
function myAction({input, state, output, services}) {

}
```

- **input** represents the initial payload (object) passed into the signal. Any outputs from an action will be merged and passed as input to the next action
- **state** any change to the state of the application happens using the collection of mutation methods on state
- **output** the payload (object) passed to output will be merged with the current input. Asynchronous actions requires you to call an output to move on to the next action
- **services** allows you to do side effects like HTTP and other things. Use of services is also tracked and presented by the debugger

### Changing state
In the **quickstart** project we are using the [cerebral-addons]() to copy the **title** value on the input into our state tree. Let us create our own custom action for this instead:

```javascript
function myAction({input, state}) {
  state.set('app.newItemTitle', input.title)
}
```

**set** is one method you can use to change the state of the app. The first argument is always the state path and the other arguments differ based on the mutation method. Let us replace the action factory in the **newItemTitleChanged** signal:

```javascript
import setTitle from '../actions/setTitle'

default export [
  setTitle
]
```

You should now have the exact same behaviour.

#### Best practices
You have now gotten insight into how you can define your actions from scratch. When developing applications you will depend heavily on the **cerebral-addons** package to avoid creating new actions for every little state change. You will also start to create your own action factories, chains and even chain factories to be reused in different signals. You will be surprised how signals becomes more like describing behaviour with legoblocks, rather than implementing logic.
