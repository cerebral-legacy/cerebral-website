# Output

All actions are able to output values. All output is merged with previous input before being sent to the next actions.

```javascript

function actionA ({output}) {
    output({
      bip: 'bop'
    });
}

function actionB ({input}) {
  input.foo; // "bar"
  input.bip; // "bop"
}

const somethingHappened = [
  actionA,
  actionB
];

controller.signals({
  somethingHappened
});

// In some Component
signals.somethingHappened({
  foo: 'bar'
});

```
Architecting the input/output of actions as a "bus" gives action chains a lot of flexibility and allows for some awesome patterns you can read about at the bottom of this page.


In the example above we call *output* directly. When doing so the next item in the signal has to be an action, it can not be an object representing paths.

### Paths
An action might want to take different paths based on some conditional. A example of this would be:

```javascript

function getItems ({output}) {
  fetch('/items')
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      output.success({json: json});
    }).catch(function(ex) {
      output.error({ex: ex});
    });
}

const somethingHappened = [
  [
    getItems, {
      success: [setItems],
      error: [setError]
    }
  ]
];

controller.signals({
  somethingHappened
});
```

But you can define your own custom output paths if you want to. Note that actions does not know about paths they are currently running on. They only get inputs. The previous action could do an `output({})` or `output.success({})`, or nothing at all. An action always just starts with some input and can itself decide a path to take next.

### Custom outputs

```javascript

function getItems ({output}) {
  // For simplicities sake
  output.success();
  output.notFound();
  output.notAuthenticated();
  output.error();
}

getItems.outputs = [
  'success',
  'notFound',
  'notAuthenticated',
  'error'
];

const somethingHappened = [
  [
    getItems, {
      success: [setItems],
      notFound: [displayNotFoundError],
      notAuthenticated: [displayAuthenticationError]
      error: [setError]
    }
  ]
];

controller.signals({
  somethingHappened
});
```
This is a powerful tool to express the flow of your application. This can be combined with *factories* and *chains* to create default behavior in your signals. The new ES6 *spread* operator is also a great tool for signals. An example of that would be:

```javascript

const somethingHappened = [
  [
    ...get('/items', {
      success: [setItems]
    })
  ]
];

controller.signal({
  somethingHappened
});
```
If this is not perfectly clear to you, do not worry. You will learn more about *factories*, *chains* and the *spread operator*.

### Default output

When defining outputs you can also define which one of those outputs are default.

```javascript

function myAction ({output}) {
  output(); // Will go to path "foo"
}

myAction.outputs = ['foo', 'bar'];
myAction.defaultOutput = 'foo';
```

Because all actions receive the same input as the previous actions in the chain (plus whatever new data has been merged in), adding on extra functionality at the start or end of signals is extremely simple. One example is wrapping certain signals to check for authentication:
```javascript

function requireAuth (actionChain) {
  return [checkAuthenticated, { //action that checks if user is authenticated and outputs success or error
    success: actionChain, //run the usual action chain
    error: [displayNoAuthWarningToUser] //display a warning to the user
  }]
}

const saveSensitiveDataToDB = [
  saveDataToDb //action to save data to DB
];


controller.signal({
  saveButtonClicked: requireAuth(saveSensitiveDataToDB)
});

// In some Component
signals.saveButtonClicked({
  foo: 'bar'
});

```
