## Controller

The Cerebral controller is where you define all state changing logic in your application-- code that runs after a button click or a received websocket message, for example.

State changes are modeled using **signals**. Signals execute **chains** with **actions**. Actions are simply Javascript functions; Chains are groupings of one or more functions, executed in order, and signals bind application events to chains.

The debugger knows when signals trigger and what data goes through them, giving you great insight into your application.
