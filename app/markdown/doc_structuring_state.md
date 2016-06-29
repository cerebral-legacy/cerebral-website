## Structuring state

In a Cerebral application all the state are just strings, numbers, booleans, objects and arrays. That means you do not create classes with methods or other abstractions to express state. This is actually a really good thing because everything drills down to these core JavaScript value types anyways. This is also how state is stored in a database.

When we picture our state this way we can do some pretty amazing things. Things like visualize the state of our application in a debugger and the actual state changes. Even how state changes affects the rendering of the application can be visualized. Using core JavaScript value types also, in combination with immutability, means we can allow hydration/dehydration of state, recording of interaction and even time travel debugging as well.

In the demo project we have already defined some state using one of the two model packages for Cerebral:
