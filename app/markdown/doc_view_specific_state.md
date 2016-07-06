## View specific state

How your state looks in the state tree and how your view layer wants to display that data is not always the same. In many situations your state tree just represents the current state of the app in multiple parts and it is up to your view layer to combine different states to produce a sensible UI for the user. With the demo application for this section we have an example of that. Showing a filtered list.

So computed in Cerebral works much like a component. You define what state paths it is interested in, but instead of returning a UI description, you return a value.
