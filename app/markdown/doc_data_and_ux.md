## Data and ux

So what is the difference between data and state? In Cerebral world data is also state, but it is state you retrieve from the server. So a list of items is data, because you get the items from the server, and *isLoading* is just state because it only lives in the client.

There are many different ways of handling data. Cerebral is not opinionated on that at all. In the demo application in this section we have a simple approach to give a bit better user experience (ux). Basically what we want is to allow the user to add multiple items without waiting for the server to respond. To handle this we need a way to reference existing items and new items the same way. The way we do this is using [uuid](https://www.npmjs.com/package/uuid), a library that creates ids. That means an item will have a server side id, but the client will also create its own ids for all the items.

Let us look at how the items from the server are stored:
