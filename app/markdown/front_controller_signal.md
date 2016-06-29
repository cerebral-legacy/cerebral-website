```javascript
import {set} from 'cerebral/operators'
import addItem from '../actions/addItem'

export default [
  addItem,
  set('state:newItemTitle', ''),
  set('state:isSaving', true),
  postItem, {
    success: [
      updateItem
    ],
    error: [
      removeFailedItem
    ]
  },
  set('state:isSaving', false)
]
```
