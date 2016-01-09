### Nesting

In the in the previous section you might want to force the user to the messages page when you open a message. With the Cerebral router you handle these situations with chains.

```javascript

import Router from 'cerebral-router';
import controller from './controller.js';
import homeOpened from './signals/homeOpened';
import messagesOpened from './signals/messagesOpened';
import messageOpened from './signals/messageOpened';

controller.signals({
  homeOpened,
  messagesOpened,

  // We just add the chains that puts the application in
  // "messagesOpened" state
  messageOpened: [...messagesOpened, ...messageOpened]
});

Router(controller, {
  '/': 'homeOpened',
  '/messages': {
    '/': 'messagesOpened',
    '/:id': 'messageOpened'
  }
});
```

When the user goes to **/messages/123** the **messagesOpened** and **messageOpened** chain will run.
