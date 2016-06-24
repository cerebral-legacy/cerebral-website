```javascript
import {Component, h} from 'cerebral-view-snabbdom'

export default Component('App', {
  title: 'app.title'
}, props => (
  h('div',
    h('h1', props.title)
  )
))
```
