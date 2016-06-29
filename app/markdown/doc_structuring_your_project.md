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
/modules
  /App
  /Items
```

And inside a module directory you will have:

```javascript
/modules
  /App
    /signals
    /actions
    index.js
```

The **index.js** file is where you define your module. The directories **/signals** and **/actions** of course holds the signals and actions files, and you might also add **/chains** and **/factories** depending on how complex your signals are.

### Common stuff
Sometimes you create a very generic action, chain or factory. These should be stored in its own **/common** folder:

```javascript
/modules
  /common
    /chains
    /factories
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
    /signals
      newItemTitleChanged.js
      newItemTitleSubmitted.js
    index.js
  /Items
    /actions
      toggleCompleted.js
    /signals
      itemCompletedToggled.js
    index.js
controller.js
main.js
```
