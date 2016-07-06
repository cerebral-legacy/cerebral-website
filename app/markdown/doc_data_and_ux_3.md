So now you are safe to add multiple items to the list and as the server responds with IDs each item is updated. We decided to not allow any changes to an item before the ID has been returned from the server, as we need that ID to tell the server what item to change. But in terms of user experience this is an improvement over waiting for each item to save before adding a new one.

#### Best practices
Structuring data in your state tree can be done in many ways. There is really no best practice here as it heavily depends on your application, its user experience and the data your are fetching from the server. How you structure your data is also affected by an immutable model or a mutable one. This is not specific to Cerebral, this is just the nature of handling data in general. If you work with backend services like [Firebase](https://firebase.google.com/) there are modules that will help you structure the data. 

#### Challenge
Instead of removing items that fail on the server, rather give them an **$error** property which disables the checkbox and displays a red text on the failed item.
