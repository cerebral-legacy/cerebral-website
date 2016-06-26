```javascript
import {Component, h} from 'cerebral-view-snabbdom'

export default Component('Items', {
  items: 'items'
}, props => (
  h('ul', props.items.map(item, index) => (
    h('li', {
      key: index
    }, item.title)
  ))
))
```
