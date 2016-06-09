```javascript
import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'

@Cerebral({
  newTodoTitle: 'newTodoTitle',
  items: 'item',
  isSaving: 'isSaving' // We just add it as a dependency
})
class App extends React.Component {
  onFormSubmit(event) {...}
  onInputChange(value) {...}
  render() {
    return (
      <div>
        <form onSubmit={event => this.onFormSubmit(event)}>
          <input
            type="text"
            disabled={this.props.isSaving}
            value={this.props.newTodoTitle}
            onChange={event => this.onInputChange(event)}
          />
        </form>
        <ul>
          {this.props.items.map(...)}
        </ul>
      </div>
    )
  }
}
```
