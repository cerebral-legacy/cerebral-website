*src/components/App/index.js*
```javascript
import {Component, h} from 'cerebral-view-snabbdom'
import Home from '../Home'
import Admin from '../Admin'

const pages = {
  home: Home,
  admin: Admin
}

export default Component('App', {
  currentPage: 'app.currentPage'
}, props => {
  const Page = pages[props.currentPage]
  return Page()
})
```
