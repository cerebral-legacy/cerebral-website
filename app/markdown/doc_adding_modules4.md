Notice here that we have also split our component into two parts. The **App** component and the **Items** component. Though modules often has a component with the same name you should not consider them "part of the same thing". As mentioned before components are completely separated from your actual application and you should not mix these two concepts together. You will have a lot more components than modules.

With this structure in place you start to see how larger applications scale in terms of files and directories.

```javascript
/src
  /components
    /App
    /Items
  /modules
    /App
      /actions
      /signals
      index.js
  controller.js
  main.js
```

#### Best practices
Creating modules helps you decouple and structure your application. Modules are really nothing more than namespacing, but you will see later what other benefits we can also get from modules. A challenge decoupling code is isolation. In Cerebral that does not happen. Any module has access to any state in your model, also signals and actions can be reused across modules. Since components are completely decoupled from your application they have access to any state and any signal.

And yes, modules can have submodules ;-)
