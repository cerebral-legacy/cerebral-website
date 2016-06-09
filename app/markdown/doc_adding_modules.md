## Adding modules

It does not take long before you need to split up your state and signals. In Cerebral you can use modules to handle that. Modules are a very simple concept, it basically just namespaces to structure your application. Let us move our code around a bit:

```javascript
import App from './modules/App'

const model = Model({}) // We create an empty root model

const controller = Controller(model)

// Instead of our signals we create a module
controller.addModules({
  app: App
})
```

What we have done now is add a namespace to our application called **app** and we reference our App module. Let us take a closer look at that:

```javascript
import newItemTitleChanged from './signals/newItemTitleChanged'
import newItemSubmitted from './signals/newItemSubmitted'

export default module => {

  module.addState({
    items: [],
    newItemTitle: '',
    isSaving: false
  })

  module.addSignals({
    newItemTitleChanged: {
      chain: newItemTitleChanged,
      immediate: true
    },
    newItemSubmitted
  })

}
```

A module is just a function that receives the module. We can now attach our state and the signals to the module instead. To complete our refactor we just have to update our component state paths, using the React decorator as an example:

```javascript
@Cerebral({
  newTodoTitle: 'app.newTodoTitle',
  items: 'app.item',
  isSaving: 'app.isSaving'
})
```

When you use modules you should also structure your files and directories in the same way:

```javascript
/src
  /components
  /modules
    /App
      /actions
      /signals
      index.js
  main.js
```

#### Best practices
Creating modules helps you decouple and structure your application. Modules are really nothing more than namespacing, but you will see later what other benefits we can also get from modules. A challenge decoupling code is isolation. In Cerebral that does not happen. Any module has access to any state in your model, also signals and actions can be reused across modules.

And yes, modules can have submodules ;-)
