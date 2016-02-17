Copies a value from input or state to output or state.

*settingsOpened.js*
```javascript
import copy from 'cerebral-addons/copy'
import getOptionsFromServer from '../actions/getOptionsFromServer'

export default [
  getOptionsFromServer, {
    success: [
      copy('input:/response', 'state:/settings')
    ]
    error: []
  }
]
```
