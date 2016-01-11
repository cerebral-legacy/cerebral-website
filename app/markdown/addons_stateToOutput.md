Grab state from state store and set it as output.

*newAccountCreated.js*
```javascript

import stateToOutput from 'cerebral-addons/stateToOutput';
import ajax from '../factories/ajax';

export default [
  stateToOutput(['newAccount'], ['data', 'newAccount']),
  [
    ajax.post('/new-account'), {
      success: []
      error: []
    }
  ]
];
```
