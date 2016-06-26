## Defining signals

The signals of Cerebral is where you define what should happen when a user interacts with the application, or some other event like a received websocket message. You can think of signals as a decision or behaviour tree. It allows you to express complex flows without thinking about implementation. This is much like we think about complexity in real life. We label things that needs to be done without thinking about the details. These labels are called actions in Cerebral. So a signal defines a flow of actions to be executed. We will talk more about these actions, but for now just think of them as labels of what should be done.

In the demo application there are already two signals defined. Lets look at one of them:
