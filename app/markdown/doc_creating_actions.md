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
In the demo application we are using the [cerebral-addons]() to copy the **title** value from the input into our state tree:
