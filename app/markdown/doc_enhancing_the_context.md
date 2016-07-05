## Enhancing the context

There are two different ways Cerebral can be enhanced. We have already talked about the shared modules, like **cerebral-module-http**, but there is also a concept of context providers. As already mentioned all actions executed by signals has a context:

```javascript
function myAction(context) {
  context.input
  context.state
  context.output
  context.services
}
```

So the context is just an object passed into each action. To populate this context Cerebral runs **context providers**. This concept allows Cerebral to change its behaviour and grow as time passes.

The demo project in this section is using the **cerebral-provider-modules**. This provider adds a *module* property to the context, allowing you to point directly to the module the action is executed on to make state changes and run services.
