```javascript
import {set} from 'cerebral/operators'
import addItem from '../actions/addItem'
import postItem from '../actions/postItem'
import updateItem from '../actions/updateItem'
import removeFailedItem from '../actions/removeFailedItem'

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
