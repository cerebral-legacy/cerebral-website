Notice how dumb this component is: it only knows what state it is interested in and it triggers signals representing what happened in your application. That, in addition to UI description, is ideally all the responsibility your view should have.

### Decoupling app and UI
What you will quickly notice in a Cerebral application is how easy it is to move components around. Since all of them define their own state dependencies you can just move them wherever you want and they will still work.

You might be familiar with state containers and presentation containers, or the like, but that is not how Cerebral works. In Cerebral you are encouraged to define the state dependencies as close as possible to the component that needs them, not pass state down as properties to nested components. This makes it a lot easier to reason about your application.

### Rendering the application
The components of your view layer need to know about Cerebral. There are different approaches based on the view package you choose, but the basic idea is the same. Expose Cerebral state and signals to the components.
