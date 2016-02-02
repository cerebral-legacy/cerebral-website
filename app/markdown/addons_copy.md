Copies a value from input, global state or module state to output, global state or module state.

*settingsOpened.js*
```javascript
import copy from 'cerebral-addons/copy'
import getServerSettings from '../actions/getOptionsFromServer'

export default [
  [
    getServerSettings, {
      success: [
        copy('input:/response', 'state:/settings')
      ]
      error: []
    }
  ]
]
```
