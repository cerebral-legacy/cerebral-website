## cerebral-module-fuse

Go to official [README](https://github.com/cerebral/cerebral-module-fuse/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
The fuse module allows you to do fuzzy search on different parts of of your model.

It is based on [Fuse](https://github.com/krisk/Fuse).

### Instantiate the module
```javascript
...

import Fuse from 'cerebral-module-fuse'

...

controller.addModules({
  findUsers: Fuse({
    // What state path to index and do the search on
    statePath: ['app', 'users'],

    // Options are passed directly into fuse
    options: {keys: ['firstName', 'lastName']}
  })
)
```
You can have multiple instances of fuse.

### Grabbing fuse result
```javascript
...
import fuse from 'cerebral-module-fuse/compute'

export default connect({
  users: fuse(['findUsers'])
},
  function App (props)  {
    return (
      <ul>
        {props.users.map(user => (
          <li>{`${user.firstName} ${user.lastName}`}</li>
        ))}
      </ul>
    )
  }
)
```
