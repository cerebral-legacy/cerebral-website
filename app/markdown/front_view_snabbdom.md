```javascript
import {connect, h} from 'cerebral-view-snabbdom'

export default connect({
  items: 'items'
},
  function Items(props) {
    return (
      h('ul', props.items.map(item, index) => (
        h('li', {
          key: index
        }, item.title)
      ))
    )
  }
)
```
