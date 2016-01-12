Change specific state in your state store. First argument is the path, the second is the value.

*appMounted.js*
```javascript

import set from 'cerebral-addons/set';
import getOptionsFromServer from '../actions/getOptionsFromServer';

export default [
  set('state:/isLoading', true),
  [
    getOptionsFromServer, {
      success: [],
      error: []
    }
  ],
  set('state:/isLoading', false)
];
```
