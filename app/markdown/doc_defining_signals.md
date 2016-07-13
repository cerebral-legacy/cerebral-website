## Signals and actions

Signals can be seen as events - a user clicks, the address bar changes, a web socket pushes data and so on. Each signal you define will trigger exactly one signal chain. A signal chain allows you to express complex flows (business logic) without thinking about implementation. This is much like we think about complexity in real life. We label things that needs to be done without thinking about the details. These labels are called actions in Cerebral and they are the building blocks of action chains. We will talk more about these actions, but for now just think of them as labels for what should be done.

In the demo application there are already two signals defined. Lets have a look:
