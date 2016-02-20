### With Flux I can react to multiple actions, can I listen to signals?
This is how Cerebral is different. Flux is "inside out" and Cerebral is "outside in". You compose signals together instead of reacting to multiple actions. This makes your code much more readable because your one signal describes everything that is happening, instead of you looking into every piece of state and try to compose in your head what all of them reacts to. This is the same for stores and reducers in Redux.

So lets imagine a scenario where you want to reset the state of your modules (stores/reducers) when the user signs out. In traditional flux/redux you would do this in every store/reducer:

```js
function myReducer(state, action) {
  switch (action.type) {
    RESET_STATE:
      return Object.assign({}, state, {foo: ''})
  }
}
```

With Cerebral you compose multiple actions together into the signal that wants to reset all the state:

```js
signedOut = [
  resetModuleA,
  resetModuleB,
  resetModuleC
]
```
Each of these actions resets their specific module. There are many benefits to this approach:

1. When a signout occurs "the next developer" will know exactly what is happening inside your app by looking at this one signal, instead of going into multiple files and try to compose this flow in their head
2. The debugger also knows exactly what happens on a signout and will display all that as one flow
3. You can reuse any of these actions at a later point, in other signals, if you want to reset the state of the modules
4. You choose the order of things happening, with flux actions you can not control the order, except with `waitFor`, which adds a lot of mind load
5. You can add any other action in between, at beginning or end of this signal. And that action can even be asynchronous

### Why isn't the debugger working?
Cerebral depends on multiple projects and it is important the you update to the latest version of all of them. NPM can be a bit problematic when changing to a new 0.x.x version, rather than 0.1.x, so please be sure you have the very latest versions.

### Why aren't my signals registering?
When moving back in time with the debugger ignores any signals fired. The reason for this is that you can not "change the past". You have to move back to the current signal, "current time", to continue moving forward. You can also clear out signals from current position and move on from there.

### How do I handle non-serializable state?
Normally you will only use plain objects, arrays, strings etc., but sometimes you also need to handle files or other non-serializable state. You will need to handle these inside components. For example uploading some files will have to be done inside the component handling it. That said, you can still use signals to notify your application about files being dropped, being uploaded and successfully uploaded.
