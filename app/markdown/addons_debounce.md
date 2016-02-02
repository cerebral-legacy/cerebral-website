Debounce can be used to limit the number a times an actionChain is called, for example on keyboard activity.

*fieldChanged.js*
```javascript
import copy from 'cerebral-addons/copy'
import debounce from 'cerebral-addons/debounce'
import validateForm from '../actions/validateForm'

export default [
  copy('input:/value', 'state:/form.field'),
  debounce(500, [
    validateForm
  ])
]
```

### Options

* `debounce(time, continueChain, { terminateChain = [], immediate = true })`

By default the first signal call will execute the continueChain immediately and the last call during the time
will execute at the end. To change this to only execute the most recent continueChain at the end, set the
options to `immediate: false`.

It is also possible to pass a `terminateChain: []` to the options which will be called whenever a signal is terminated.
