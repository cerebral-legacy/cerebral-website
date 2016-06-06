```javascript
import setLoading from '../actions/setLoading'
import getItems from '../actions/getItems'
import setItems from '../actions/setItems'
import setError from '../actions/setError'

export default [
  setLoading(true),
  getItems, {
    success: [
      setItems
    ],
    error: [
      setError
    ]
  },
  setLoading(false)
]
```
