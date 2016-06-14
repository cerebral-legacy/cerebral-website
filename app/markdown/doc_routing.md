## Routing

Cerebral has a different approach to routing. In Cerebral a url change is no different than a click. That means url changes triggers signals, just like any other request for state change. This makes the router a lot less magical and it is also completely separated from your view layer.

The way you create the link between a url and a signal is simply by defining it in the router module:
