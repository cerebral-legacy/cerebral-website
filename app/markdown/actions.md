# Actions

```javascript

function myAction ({input, state, output, services}) {

}
```

An action is Cerebral has many of the benefits of a pure function. An action does not call or reference anything outside itself. Anything and everything you do inside an action is related to its one argument. This argument current has four properties, *input*, *state*, *output* and *services*. As you can see we use destructuring to access them. That means:

```javascript

function myAction ({output, services}) {

}

function myAction ({input, output}) {

}

function myAction ({state, input}) {

}
```

All work.

When you write a test for an action you can mock properties to fit your test. This makes it easy to verify that actions run as they should. This also ensures that the test breaks if someone changes the action in a way that affects the expected behavior. On larger teams this is crucial to ensure that the application always runs as expected.
