Remove specific state in your state store. Only argument is the path.

*loggedOut.js*
```javascript

import unset from 'cerebral-addons/unset';

export default [
  unset('state:/user')
];
```
