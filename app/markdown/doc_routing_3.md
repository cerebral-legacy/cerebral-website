#### Best practices
The Cerebral router just maps urls to signals. Signals executes actions and actions changes the state of your app. When a url just makes a change to the state of your application you are free from thinking that a url has to be linked to your view layer. What is going to happen in the view layer is decided after the state has changed. This also opens up for urls being more than deciding what page to display. You can do very complex state changes based on the url and its query parameters, which can result in completely new user experiences.

#### Challenge
Add the **/*** path to the router and point to a signal **app.unknownRouted**, which you have to create. Let the chain connected to this signal have an action that changes a state indicated a wrongful filter. Somewhere in a component depend on this state and give a warning when you use the wrong url.
