```javascript
import Model from 'cerebral-model'
import Controller from 'cerebral'
import signal from './signal'

const model = Model({
  isLoading: false,
  items: []
})

const controller = Controller(model)

controller.addSignals({
  signal
})
```
