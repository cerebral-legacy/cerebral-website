# Input to state

Set value from input to state store.

*settingsOpened.js*
```javascript

import inputToState from 'cerebral-addons/inputToState';
import getServerSettings from '../actions/getOptionsFromServer';

export default [
  [
    [
      getServerSettings, {
        success: [
          inputToState('response', ['settings'])
        ]
        error: []
      }
    ]
  ]
];
```
