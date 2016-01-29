Toggle a boolean state value at a specific path. Only argument is path.

*agreedClicked.js*
```javascript

import toggle from 'cerebral-addons/toggle'

export default [
  toggle('state:/hasAgreed')
]
```

### Options

* `toggle(path, onValue = true, offValue = false)`
