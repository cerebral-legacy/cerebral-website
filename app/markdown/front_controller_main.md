```javascript
import Model from 'cerebral-model'
import Controller from 'cerebral'
import appMounted from './appMounted'

const model = Model({
  isLoading: false,
  items: []
})

const controller = Controller(model)

controller.addSignals({
  appMounted
})
```
