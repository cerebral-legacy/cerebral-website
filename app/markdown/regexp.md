### Regexp
You can also use normal regexp to handle routes. This example ensures that the id is actually a number.

```javascript

Router(controller, {
  '/': 'homeOpened',
  '/messages/:id(\\d+)': 'messageOpened'
});
```
