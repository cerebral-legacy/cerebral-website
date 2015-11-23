# Routing

### Install

`npm install cerebral-router path-to-regexp`

A demo can be found at [this repo](https://github.com/christianalfoni/cerebral-router-demo).

### How to use

The Cerebral router binds urls to signals. This gives you a flexible approach to what your urls should represent in your application. You might be surprised that the router does not affect your UI layer at all. Lets take a look.

```javascript

import Router from 'cerebral-router';
import controller from './controller.js';
import homeOpened from './signals/homeOpened';
import messagesOpened from './signals/messagesOpened';
import messageOpened from './signals/messageOpened';

controller.signal('homeOpened', homeOpened);
controller.signal('messagesOpened', messagesOpened);
controller.signal('messageOpened', messageOpened);

Router(controller, {
  '/': 'homeOpened',
  '/messages': 'messagesOpened',
  '/messages/:id': 'messageOpened'
}).trigger();
```

When you go to url **/messages** the signal **messagesOpened** will be triggered. This signal will set the application in the correct state to display the messages page.

When you go to url **/messages/123** the signal **messageOpened** will be triggered. The params of the url will be merged with the input to the signal. In this example the input will be: `{id: '123'}`.

What makes this powerful is the possibility to trigger the signal directly. `controller.signals.messageOpened({id: '456'})` will also work and the url will update. You are now free from thinking urls to change the state of your application. You only think about signals. You can of course use hyperlinks with urls if you want to.

**Trigger** is the method that will run the current route and fire off a signal.
