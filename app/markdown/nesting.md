### Nesting

In the in the previous section you might want to force the user to the messages page when you open a message. With the Cerebral router you handle these situations with chains.

```javascript

import Router from 'cerebral-router';
import controller from './controller.js';
import homeOpened from './signals/homeOpened';
import messagesOpened from './signals/messagesOpened';
import messageOpened from './signals/messageOpened';

controller.signal('homeOpened', homeOpened);
controller.signal('messagesOpened', messagesOpened);

// We just add the chains that puts the application in
// "messagesOpened" state
controller.signal('messageOpened', [...messagesOpened, ...messageOpened]);

Router(controller, {
  '/': 'homeOpened',
  '/messages': {
    '/': 'messagesOpened',
    '/:id': 'messageOpened'
  }
}).trigger();
```

When the user goes to **/messages/123** the **messagesOpened** and **messageOpened** chain will run.
