## Controller

The Cerebral controller is where you define all state changing logic in your application-- code that runs after a button click or a received websocket message, for example.

State changes are modeled using **signals**. It is a declarative approach, meaning that you are able to describe behaviour without implementing anything. Using arrays and objects to build signals makes them look like decision trees, which is a very good construct to help you build a mental image of complex flows.

The debugger knows when signals trigger and what data goes through them, giving you great insight into your application.
