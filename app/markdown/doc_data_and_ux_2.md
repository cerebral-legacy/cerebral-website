So as you can see we are storing our items as an object where the keys are the client ids.

```javascript
{
  '6c84fb90-12c4-11e1-840d-7b25c5ee775a': {
    id: '5330975173',
    title: 'Some title',
    completed: false,
    datetime: 1465984711235
  }
}
```

When we now add a new items and store it on the server we will be able to use this client ID to keep track of what item to update when the server responds with a new id.

When adding an item we output the created client ID to the signal. This allows the action handling the response from the server to update the correct item.
