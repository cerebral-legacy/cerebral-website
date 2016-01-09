# Routing

### Install

`npm install cerebral-router`

### How to use

When using the Cerebral router you have to leave your previous experience with routers at the doorstep. With all the innovation in state driven applications we can finally start to think about a url as a product of our current state, rather than thinking about a url as something that should display a specific view or tree of views in our applications. **This is really a game changer**.

When you build your Cerebral application you do not have to think about routing at all. You only trigger signals that brings your application into the correct state. Let us imagine an application that can open a messages page, and also open specific messages.

```javascript

import controller from './controller.js';
import homeOpened from './signals/homeOpened';
import messagesOpened from './signals/messagesOpened';
import messageOpened from './signals/messageOpened';

controller.signals({
  messagesOpened,
  messageOpened
});
```

When we want to open the messages we call the signal:

```javascript

onMessagesClick() {
  this.props.signals.messagesOpened();
}
```

When we want to open a single message we call the signal and pass a payload:

```javascript

onMessageClick(id) {
  this.props.signals.messageOpened({
    id: id
  });
}
```

The signature of a state change is the signal and the payload passed. We can bind this signature to a route. Lets imagine we have implemented our whole application and it works great, we just need to update the addressbar with a url representing the current state of the application. So let us also add a *homeOpened* signal so that we handle the root url as well.

```javascript

import Router from 'cerebral-router';
import controller from './controller.js';
import homeOpened from './signals/homeOpened';
import messagesOpened from './signals/messagesOpened';
import messageOpened from './signals/messageOpened';

controller.signals({
  homeOpened,
  messagesOpened,
  messageOpened
});

Router(controller, {
  '/': 'homeOpened',
  '/messages': 'messagesOpened',
  '/messages/:id': 'messageOpened'
}, {
  mapper: {query: true} // Read about this below
});
```

Using the `cerebral-view-react` or `cerebral-angular` packages will automatically trigger the router, but you can run a `trigger` method manually if you do not use these packages. The router checks the url and fires the signal related to the url. The url will be parsed and any payload will be passed on the signal. That means if you go to `example.com/messages/123` it will trigger the `messageOpened` signal with the payload `{id: '123'}`. But if you click a message in the list it will also trigger the `messageOpened` signal with the payload `{id: '456'}` and now the url will also update to `example.com/messages/456`. So it works both ways!

The important thing to understand here is that your application does not trigger urls to change its state. It triggers signals. Then you bind a route to a signal to allow a url to trigger the signal as well. That means:

```javascript

// Going to url
"example.com/messages/456"

// Is exactly the same as
this.props.signals.messageOpened({
  id: '456'
});
```

### Diving into the app from a url
In the example above, when navigating in the app, you have to go to */messages* before you can go to */messages/456*. But when you expose urls you could go directly to */messages/456*. So how do you handle that?

```javascript

...
controller.signals({
  messageOpened: [...messagesOpened, ...messageOpened]
});

Router(controller, {
  '/': 'homeOpened',
  '/messages': 'messagesOpened',
  '/messages/:id': 'messageOpened'
});
```

With Cerebral you are already used to composing chains and actions together and this is also effective when creating routes. Now you might say, "I do not want to load my messages every time I open a message!". I completely agree and there are multiple ways to handle this. It depends on when you want to load the messages. But lets say you want to load them whenever you actually go to `/messages`. Inside your *messagesOpened* signal you can just check if there is an ID on the input. If there is an ID it means you are about to open a message, if not it means you are just opening the messages.

### What about queries?
With Cerebral you get a very powerful way to use queries. But first we have to make a statement together. Queries are produced by your application, not by users. With this perspective we can do some wonderful things. Lets get back to opening our message. Inside the component opening the message we want to pass more than the ID of the message. We want to pass: `{withComments: true}`. So that when we load the message, we load it with comments.

```javascript

onMessageClick(id) {
  this.props.signals.messageOpened({
    id: id,
    withComments: true
  });
}
```

Since this signal is bound to a url Cerebral router will automatically make this part of the query, turning your url into `example.com/messages/123?withComments:true`. That means if you refresh or pass the url to somebody else it will pass `{id: '123', withComments: true}` as the payload to the signal, opening the message in the exact same way, with the comments.

Notice here that we have `withComments:true`, not `withComments=true`. This is because Cerebral router uses the [URLON](https://github.com/vjeux/URLON) project to create serializable queries. As you can see it is very powerful.
