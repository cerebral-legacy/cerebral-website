*src/components/App/index.js*
```javascript
import {connect, h} from 'cerebral-view-snabbdom'
import Home from '../Home'
import Admin from '../Admin'

const pages = {
  home: Home,
  admin: Admin
}

export default connect({
  currentPage: 'app.currentPage'
}, function App(props) {
  const Page = pages[props.currentPage]
  return Page()
})
```
