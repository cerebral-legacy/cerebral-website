To only handle hash urls, use the option `onlyHash`.

```javascript

Router({
  '/': 'home.opened',
  '/messages': 'messages.opened',
  '/messages/:id': 'messages.messageOpened'
}, {
  onlyHash: true
})
```
