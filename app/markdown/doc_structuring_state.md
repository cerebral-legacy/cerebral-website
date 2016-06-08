## Structuring state

In a Cerebral application all the state are normal strings, numbers, boolean, objects and arrays. That means you do not create classes with methods or other abstractions to express state. This is actually a really good thing because everything drills down to these core JavaScript value types anyways. When we picture our state this way we can also do amazing things. Things like [hydrating/dehydrating]() the whole state of the application, record interaction and visualize the state of our application in a debugger.

In the **quickstart** project we have already defined some state:

```javascript
const model = Model({
  items: [],
  newItemTitle: ''
})
```

Our application should just show a list of items and allow us to add new items with a title. Thinking about what state your application needs before you implement logic and UI is a very good exercise that can be done with multiple developers. Basically you describe what state is needed to produce the UI you want to build for your users.

### Namespaces
Typically you create namespaces for your state to structure it. Typically in an application with multiple pages you would namespace by page:

```javascript
const model = Model({
  home: {},
  feed: {},
  issues: {},
  admin: {}
})
```

But there are not limits to this. You structure your state in a way that makes sense to you and your team.

Cerebral has a concept of [modules]() which helps you do this namespacing for your state and your signals. We will look at this later, but for now you can add a new state to the **quickstart** project:

```javascript
const model = Model({
  items: [],
  newItemTitle: '',
  isSaving: false
})
```

We are going to use this **isSaving** state to indicate in the UI that we are saving the new item to the server.

#### Summary
It can often be a good idea to start any implementation by defining state structure. If you think of a design mock of a user interface you can translate this into state using strings, numbers, booleans, objects and arrays. It is a good team exercise that ensures that your chosen conventions on naming state properties and overall structure is nurtured.
