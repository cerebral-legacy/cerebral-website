Sometimes your application is not running on the root path */*. To keep urls consistent you can tell Cerebral router what the base url is.

```javascript
Router({
  '/': 'home.opened',
  '/messages': 'messages.opened',
  '/messages/:id': 'messages.messageOpened'
}, {
  baseUrl: '/myapp'
})
```
