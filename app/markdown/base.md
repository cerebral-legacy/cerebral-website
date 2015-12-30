### Base

Sometimes your application is not running on the root path */*. To keep urls consistent you can tell Cerebral router what the base url is.

```javascript

Router(controller, {
  '/': 'homeOpened',
  '/messages': 'messagesOpened',
  '/messages/:id': 'messageOpened'
}, {
  baseUrl: '/myapp'
});
```
