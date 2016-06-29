## Choosing a view

Choosing a view package is mostly about experience and preference. Todays different approaches to producing UI is so highly optimized that for typical apps it does not matter.

### React
[React](https://facebook.github.io/react/index.html) by Facebook is one of the more popular UI libraries out there. It is standalone which makes it a good candidate for implementations like Cerebral. The [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax is something you either love or hate, and that should be one of the factors for why you would choose React. Also the fact that React has a huge ecosystem of reusable components makes React a great choice.

#### Install manually
`$ npm install cerebral-view-react`

#### Instantiate manually
```javascript
import React from 'react'
import {render} from 'react-dom'
import {Container} from 'cerebral-view-react'
import controller from './controller'

import App from './components/App'

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#app'))
```

### Snabbdom
A different virtual-dom library is called [Snabbdom](https://github.com/paldepind/snabbdom). It is very fast, but the reason you really should consider using it is the included hyperscript helpers, opposed to using JSX. It is a nice pure javascript syntax to describe UI. Even though Snabbdom is really fast it will render more of your application on each change, but this can be optimized using the *thunks* functionality. No matter, for typical apps performance does not matter.

#### Install manually
`$ npm install cerebral-view-snabbdom`

#### Instantiate manually
```javascript
import {render} from 'cerebral-view-snabbdom'
import controller from './controller'

import App from './components/App'

render(() => App(), document.querySelector('#app'), controller)
```
