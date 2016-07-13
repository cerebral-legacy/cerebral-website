A chain is an array. An array that describes how the actions should be executed. In this chain we are copying the title from the signal input over to the path **newItemTitle** in our model. We use a Cerebral operator to do so. This is the most straight forward state change you can do. Your UI has passed in a payload to the signal which becomes available on the input and we copy it into our model.

#### Best practices
Signals execute the *state changing flow* of your application using chains. Signals and action chains are at the core of Cerebral and make it possible for you and your team members to quickly understand how state changes run in your application. These chains can become very complex, but they are still easy to read and understand. As you work on larger applications you will use concepts like composition and factories to create these chains.

#### Challenge
Replace the **copy** with your own action, doing the same thing, but also uppercasing the title.
