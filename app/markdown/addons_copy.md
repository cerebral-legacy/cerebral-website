Copies a value from input or state to output or state.

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
