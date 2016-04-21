When you create an action you use the **context**:

```javascript
function someAction(context) {
  context.input
  context.state
  context.output
  context.services
}

// Or with destructuring
function ({input, output, services, state}) {}
```

This context is actually empty by default with Cerebral:

```javascript
function (context) {
  context // {}
}
```

The way Cerebral populates this context is using **Context Providers**:

```javascript
function myContextProvider(context, execution.controller) {
  context.foo = 'bar';
  return context;
}

controller.addContextProvider(myContextProvider);

function someAction(context) {
  context.foo // "bar"
}
```

Context providers are used to add new properties to the context, override them or wrap them. An example of this is the **devtools** which wraps all services to track their usage.

Context providers has become a core concept in Cerebral and is used to actually build the behaviour of Cerebral as we know it today. The other core concept is the **signals**.

So signals controls the execution flow of actions and their passing of values to each other. It also handles any paths taken, for example when an action wants to go down a success path. The context providers are run for every action and builds the context for the currently executed action.

That means we can also scope a context provider.

```javascript
function myModule(module) {
  module.addContextProvider(someContextProvider);
}
```

So a module can also have a specific context provider. That means any actions part of this specific modules signals will have their context manipulated by this provider.

### Creating your own context provider
Typically you will not create your own context providers. These are built to provide new patterns or share modules. So lets take a look at how it works:

```javascript
function myContextProvider(context, execution, controller) {
  execution.signal // The current signal
  execution.action // The current action
  execution.payload // The payload passed to this action
  execution.resolve // A function that takes optionally a path and/or payload
  execution.options // Options passed to signal

  controller.getModel() // The model
  controller.getServices() // The services
  controller.getModules() // Get modules
  controller.get() // Get some state, passing a path

  return context;
}
```

So let us imagine that we want to create a provider that exposes all the modules on the context of all actions.

```javascript
controller.addContextProvider((context, execution, controller) {
  context.modules = controller.getModules();

  return context;
});
```
Or we want to expose the path of the currently running module:

```javascript
function myModule(module) {
  module.addContextProvider({
    modulePath: module.path
  });
});
```

In this second example we used the "short version" of a context provider. It is just an object that is merged with the context.

### Summary
So now you have some insight into what context providers is all about. They are heavily used inside Cerebral and decouples the code in a really good way. It also opens up for completely new patterns and behaviours with Cerebral. Looking forward to see what you create with this! :-)
