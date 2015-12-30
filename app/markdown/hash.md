### Hash

To only handle hash urls, use the option `onlyHash`.

```javascript

Router(controller, {
  '/': 'homeOpened',
  '/messages': 'messagesOpened',
  '/messages/:id': 'messageOpened'
}, {
  onlyHash: true
});
```
