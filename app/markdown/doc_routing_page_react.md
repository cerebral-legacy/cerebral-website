*src/components/App/index.js*
```javascript
import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'
import Home from '../Home'
import Admin from '../Admin'

const pages = {
  home: Home,
  admin: Admin
}

@Cerebral({
  currentPage: 'app.currentPage'
})
class App extends React.Component {
  render() {
    const Page = pages[this.props.currentPage]
    return <Page />
  }
}

export default App
```
