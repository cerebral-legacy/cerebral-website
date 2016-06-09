```javascript
import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'

@Cerebral({
  newTodoTitle: 'newTodoTitle',
  items: 'item'
})
class App extends React.Component {
  onFormSubmit(event) {
    event.preventDefault()
    this.props.signals.newItemSubmitted()
  }
  onInputChange(value) {
    this.props.signals.newItemTitleChanged({
      title: value
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={event => this.onFormSubmit(event)}>
          <input
            type="text"
            value={this.props.newTodoTitle}
            onChange={event => this.onInputChange(event)}
          />
        </form>
        <ul>
          {this.props.items.map((item, index ) => (
            <li key={index}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
```
