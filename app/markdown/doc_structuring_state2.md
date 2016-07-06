Our application should just show a list of items and allow us to add new items with a title. Thinking about what state your application needs before you implement logic and UI is a very good exercise that can be done with multiple developers. Basically you describe what state is needed to produce the UI you want to build for your users.

### Namespaces
Typically you create namespaces for your state to structure it. In an application with multiple pages you might namespace by page:

```javascript
const model = Model({
  home: {},
  feed: {},
  issues: {},
  admin: {}
})
```

But there are no limits to this. You structure your state in a way that makes sense to you and your team.

Cerebral has a concept of **modules** which helps you do this namespacing for your state and your signals. We will look more at this later.

#### Best practices
It can often be a good idea to start any implementation by defining state structure. If you think of a design mock of a user interface you can translate this into state of strings, numbers, booleans, objects and arrays. It is a good team exercise that ensures the conventions on naming state properties and overall structure is aligned.

#### Challenge
Try to add a new state called **title** with some text. Then try to display that in the component.
