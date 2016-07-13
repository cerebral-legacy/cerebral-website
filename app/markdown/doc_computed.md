## Computed

You use computed when you want to combine state from your model and structure it in a view friendly way. A simple example would be a filter.

```javascript
import {Computed} from 'cerebral'

export default Computed({
  filter: 'app.filter',
  users: 'users.list'
}, props => {
  return props.users.map(user => {
    if (props.filter === 'all') {
      return user
    }
    if (props.filter === 'awesome') {
      return user.isAwesome
    }
    if (props.filter === 'notAwesome') {
      return !user.isAwesome
    }
  })
})
```
As you can see the signature of a computed is very similar to **connect** with components. The only difference is that a computed returns a value and connect returns a component.

You use the computed instead of a state dependency path when defining Cerebral components. The state paths of the computed is now merged with any other state paths already on the component. That way they are automatically optimized to only render the component when any of the state paths actually change.

### Using computed with classes
If you are using the mutable model package and classes you can define the computed with those classes to conditionally extract relational state. For example if you let all entities have a client side id (uid) to handle optimistic updates, you could write a class something like this to extract the posts of that user wherever you need them:

```javascript
import {Computed} from 'cerebral'
import _ from 'lodash'
import uuid from 'uuid'

class User {
  constructor(attrs) {
    this.uid = uuid.v4()
    this.id = attrs.id
    this.firstName = attrs.firstName
    this.lastName = attrs.lastName
  }
  getFullName() {
    return this.firstName + this.lastName
  }
  computedPosts() {
    return Computed({
      posts: 'posts'
    }, props => {
      return _.find(props.posts, {userId: this.id})
    })
  }
}
```

Now you can use this with components.

```javascript
connect(props => ({
  // We connect the user as a state dependency
  // directly because we want this component to
  // update when the user has an update
  user: `users.${props.user.uid}`,

  // We use the method for computed to rerender
  // this component whenever the posts change
  posts: props.user.computedPosts()
}))
```
