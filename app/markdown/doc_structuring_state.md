## Structuring state

In a Cerebral application all the state of your application exists in a model we call "the state tree". This concept helps you create a mental image of all the state in your application, it being a list of users or what page is currently active.

We also get some other benefits with this approach. Things like visualizing the state of our application in a debugger and the actual state changes. Even how state changes affects the rendering of the application can be visualized. If you use the immutable model it also makes it very easy to hydrate/dehydrate all the state of the app, record changes and even time travel debugging as well.

In the demo project we have already defined some state using one of the two model packages for Cerebral:
