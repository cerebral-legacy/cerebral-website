Depending on the size of your application there are two main differences in how you structure your application. This is common with most projects. You treat your project as one module or a collection of modules.

### Modules setup

Your project file structure can look something like this:

```
modules |
  SomeModule |
    actions
      | setLoading.js
      | setUser.js
      | unsetLoading.js
    chains
      | getUser.js
    components
      SomeModule
        | index.js
    factories
      | get.js
    signals
      | appMounted.js
    index.js
main.js
```

The *index.js* file in your module folder is where you define your module. While your *main.js* is the file that brings in all the modules.
