---
title: Using simple async actions
---

## Using simple async actions 

Until now we were just using synchronous actions inside our **Signals** and the flow was therefore straightforward. Example:
```js
signals:
test:[
action1,
action2,
...
]
```
Because action2 depends on the outcome of action1, action1 needs to be finished before action2 starts. Clear enough. But now what happens when action1 executes an async-task? Well let us see because we have a somewhat perfect candidate in our tutorial app to test exactly this scenario.
We will simplify:
```js
      ...
      set('state:toast.message', 'Button Clicked!'),
      wait(4000),
      set('state:toast.message', '')
      ...
```
to:
```js
      ...
      showToast('Button Clicked!',1000),
      set('state:toast.message', '')
      ...
```
**showToast(..)** is a so called **Factory**. A simple Version of it could look like this:

```js
function showToast(message, milliseconds) {
  function action({input, state, path}) {
    let msg = message
    let ms = milliseconds
    if (!msg && input)
      msg = input.message
    if (!ms)
      ms = 8000
    state.set('toast.message', msg)
    return new Promise(function(resolve, reject) {
      window.setTimeout(function() {
        resolve({})
      }, ms)
    })
  }
  action.displayName = "showToast"
  return action
}
```
You have maybe recognised that we still reset the *toast.message* after the *showToast(..)* call. There is a reason for that. **Cerebral** is batching changes inside actions
