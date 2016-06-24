```javascript
import Model from 'cerebral-model'
import Controller from 'cerebral'

const model = Model({
  isLoading: false,
  items: [],
  filter: 'all',
  user: {
    name: 'Bob'
  }
})

const controller = Controller(model)

export default controller
```
