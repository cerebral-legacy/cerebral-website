```javascript
import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'

@Cerebral({
  items: 'items'
})
class Items extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => (
          <li key={index}>
            {item.title}
          </li>
        ))}
      </ul>
    )
  }
}

export default Items
```
