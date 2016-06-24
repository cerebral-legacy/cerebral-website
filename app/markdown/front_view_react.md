```javascript
import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'

@Cerebral({
  title: 'app.title'
})
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}

export default App
```
