Here we can see that when the user enters the url path **"/"** it will trigger the same signal as when the user clicks the "all" filter. And this is what routing is all about in Cerebral. You can actually create your whole application without thinking about the router and then you can bind urls to existing signals later.

A typical question related to this is; "How do I change pages with the Cerebral router?". Let us look at a simple example.

```javascript
Router({
  '/': 'app.homeClicked',
  '/admin': 'app.adminClicked'
})
```

These signals can for example execute actions that changes the current page:

*src/modules/App/chains/openHome.js*
```javascript
import {set} from 'cerebral/operators'

export default [
  set('state:app.currentPage', 'home')
]
```

Now your application is aware of what page to display. To actually display the correct page you can:
