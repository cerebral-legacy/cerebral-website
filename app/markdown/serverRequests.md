# Server requests

Cerebral does not allow you to set any state in asynchronous actions. So how would you go about actually grabbing data from the server and set it into your state store?

Let us look at our signal first:
```javascript

import controller from './controller.js';

const appMounted = [
  setLoadingTodos,
  [
    getTodos, {
      success: [setTodos],
      error: [setTodosError]
    }
  ],
  unsetLoadingTodos
];

controller.signals({
  appMounted
});
```

In this example we will explicitly create all the actions we need. It is certainly possible to make this more dry using factories, but let us leave it at this for now.

The *setLoadingTodos* and *unsetLoadingTodos* actions are not so important here, so let us look at the others. We have our *getTodos* action which will run asynchronously since it is an item of an array inside a chain. Lets look at it:

```javascript

function getTodos({services, output}) {
  services.ajax.get('/todos')
    .then((todos) => output.success({todos}))
    .catch((error) => output.error({error}));
}

export default getTodos;
```

Our action just grabs the todos using a custom service. If it is a success it outputs the todos as `{todos: []}`, or an error with `{error: ''}`.

Now this information is available on our signal and we can grab it in our next *setTodos* action:

```javascript

function setTodos(input, state) {
  state.set(['todos'], input.todos);
}

export default getTodos;
```

And that is how you grab stuff from server and set it. Now you might ask why you can not just set it inside the asynchronous action? Actually the initial version of Cerebral remembered your signals, not your state changes. So when remembering state it would rerun the actual signals. Later this has been changed to analyzing signals as a "static tree". Then it adds whatever mutations done to that tree. So remembering state does not run the actual signals anymore. That said, we found splitting asynchronous fetching/changes and actually changing the state of your application is a good separation of concerns. The reason is that asynchronous stuff can fail and you want to express how you solve those scenarios in your signal definition, not hide it inside an action.
