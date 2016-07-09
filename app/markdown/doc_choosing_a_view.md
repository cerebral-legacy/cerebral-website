## Choosing a view

Choosing a view package is mostly about experience and preference. Todays different approaches to producing UI is so highly optimized that for typical apps it does not matter.

### React
[React](https://facebook.github.io/react/index.html) by Facebook is one of the more popular UI libraries out there. React has a huge ecosystem of components that helps you be productive. Cerebral also adds "specific component rendering" to React meaning that it will only render components that actually needs to.

#### Install
`$ npm install cerebral-view-react`

#### Instantiate
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
A different virtual-dom library is called [Snabbdom](https://github.com/paldepind/snabbdom). It is very fast, but it needs to rerender the whole application virtual dom tree on every change. There are optimizations called thunks you can use. Snabbdom is good for smaller applications and the hyperscript helpers are really good if you want to write plain javascript.

#### Install
`$ npm install cerebral-view-snabbdom`

#### Instantiate
```javascript
import {render} from 'cerebral-view-snabbdom'
import controller from './controller'

import App from './components/App'

render(() => App(), document.querySelector('#app'), controller)
```

### Inferno
[Inferno](https://github.com/trueadm/inferno) is also a very fast virtual dom implementation. Its API is basically the same as React and if performance is a serious concern and you do not depend on 3rd party components inferno is a very good choice. This package also has "specific component rendering" which means that only the components that needs to render will do so.

#### Install
`$ npm install cerebral-view-inferno`

#### Instantiate
```javascript
import Inferno from 'inferno'
import {render} from 'inferno-dom'
import {Container} from 'cerebral-view-inferno'
import controller from './controller'

import App from './components/App'

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#app'))
```
