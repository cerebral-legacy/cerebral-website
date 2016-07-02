```javascript
import React from 'react'
import {Cerebral} from 'cerebral-view-react'

export default Cerebral({
  items: 'items'
})(function Items(props) {
  return (
    <ul>
      {this.props.items.map((item, index) => (
        <li key={index}>
          {item.title}
        </li>
      ))}
    </ul>
  )
})
```
