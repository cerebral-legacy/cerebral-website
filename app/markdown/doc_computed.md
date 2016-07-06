## Computed

You use computed when you want to combine state from your model and structure it in a view friendly way. A simple example would be a filter.

```javascript
import {Computed} from 'cerebral'

export default Computed({
  filter: 'app.filter',
  users: 'users.list'
}, state => {
  return state.users.map(user => {
    if (state.filter === 'all') {
      return user
    }
    if (state.filter === 'awesome') {
      return user.isAwesome
    }
    if (state.filter === 'notAwesome') {
      return !user.isAwesome
    }
  })
})
```

You use the computed instead of a state dependency path on your components. The state paths of the computed is now merged with any other state paths already on the component. That way they are automatically optimized to only render the component when any of the state paths actually change.
