## Structuring your project

You will most certainly need *modules* when building an application. Modules are basically just namespaces for your state, signals and services. To reflect this structure in your directories you will typically create a file structure like this:

```javascript
/components
/modules
controller.js
main.js
```

Where **controller.js** is where you instantiate Cerebral and attach the modules you need. **main.js** is where you connect your controller with the chosen view.

The important thing to note is that *components* and *modules* are separated. There is absolutely no relationship between components and modules. This is what makes it so easy to scale up your application and reuse your whole application on different platforms, just replacing the view layer.

### A module
So inside your modules folder you will have multiple directories representing different modules:

```javascript
/components
/modules
  /App
  /Items
```

And inside a module directory you will have:

```javascript
/components
/modules
  /App
    /chains
    /actions
    index.js
```

The **index.js** file is where you define your module. The directories **/chains** and **/actions** of course holds the chains and actions files, and you might also add **/chainFactories** and **/actionFactories** depending on the level of complexity and reusability.

### Common stuff
Sometimes you create a very generic action, chain or factory. These should be stored in its own **/common** folder:

```javascript
/modules
  /common
    /chains
    /actionFactories
    /chainFactories
  /App
  /Items
```

### A small, but scalable application
```javascript
/components
  /App
    index.js
  /Items
    index.js
  /Item
    index.js
/modules
  /App
    /actions
      addItem.js
      removeFailedItem.js
    /chains
      changeItemTitle.js
      submitItemTitle.js
    index.js
  /Items
    /actions
      toggleItemCompleted.js
    /chains
      toggleItemCompleted.js
    index.js
controller.js
main.js
```

You might wonder why we have a chain and an action with the same name, **toggleItemCompleted** The point here is that the chain represents the flow of changes needed to toggle the item completion and the action is where it actually flips the completed state. The chain just happens to have one action, which often results in the same name. At a later point though the chain might get other actions or be composed with other chains, as we want to do more related to toggling completed on an item. It is perfectly okay that they have the same name, the important thing is to know that chains expresses a flow of changes and an action does one specific change.
