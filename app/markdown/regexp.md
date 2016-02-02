You can also use normal regexp to handle routes. This example ensures that the id is actually a number.

```javascript
Router({
  '/': 'home.opened',
  '/messages/:id(\\d+)': 'messages.messageOpened'
})
```
