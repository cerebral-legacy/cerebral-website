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

You use the computed instead of a state dependency path when defining Cerebral components.

```javascript
import filteredItems from '../computed/filteredItems'

export default connect({
  items: filteredItems()
},
  function Comp(props) {
    props.items // [{isAwesome: true, name: "bob"}]
  }
)
```

#### Dynamic computed
Sometimes you need some existing state or prop to produce a computed. Since the computed works pretty much like **connect** you can also pass props to it. Typically you would pass a property from the connect to the computed:

```javascript
import user from '../computed/filteredItems'

export default connect(({userKey}) => ({
  items: user({userKey})
}),
  function Comp(props) {
    props.items // [{isAwesome: true, name: "bob"}]
  }
)
```

We pass in a user key to grab the user and create an extended user object:

```javascript
import {Computed} from 'cerebral'

export default Computed(props => ({
  user: `app.users.${props.userKey}`,
  bestUsers: 'app.bestUsers'
}), props => {
  return {
    ...props.user,
    isBest: props.userKey in props.bestUsers
  }
})
```

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

    this.computedPosts = Computed({
      posts: 'posts'
    }, props => {
      return _.find(props.posts, {userId: this.id})
    })
  }
  getFullName() {
    return this.firstName + this.lastName
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
