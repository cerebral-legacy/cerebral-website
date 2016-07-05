*src/components/App/index.js*
```javascript
import React from 'react'
import {connect} from 'cerebral-view-react'
import Home from '../Home'
import Admin from '../Admin'

const pages = {
  home: Home,
  admin: Admin
}

export default connect({
  currentPage: 'app.currentPage'
})(function App(props) {
  const Page = pages[props.currentPage]
  return <Page />
})
```
