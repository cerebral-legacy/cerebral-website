```javascript
import Model from 'cerebral/models/immutable'
import {Controller} from 'cerebral'

const model = Model({
  newItemTitle: '',
  isLoading: false,
  items: [],
  error: null
})

const controller = Controller(model)

export default controller
```
