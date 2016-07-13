# cerebral-view-inferno
The Inferno view package for Cerebral

## The Cerebral Webpage is now launched
You can access the webpage at [http://cerebraljs.com/](http://cerebraljs.com/)

## Debugger
You can download the Chrome debugger [here](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb?hl=no).

## Install
`npm install cerebral-view-inferno`

## API
All examples are shown with ES6 syntax.

### Render the app
```js
import Inferno from 'inferno'
import {render} from 'inferno-dom'
import {Container} from 'cerebral-view-inferno'

// Your controller instance
import controller from './controller'
import App from './components/App'

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#app'))
```

### Get state in components
```js
import Inferno from 'inferno'
import {connect} from 'cerebral-view-inferno'

export default connect({
  newItemTitle: 'newItemTitle',
  items: 'items'
},
  function App(props) {

    const onFormSubmit = event => {
      event.preventDefault()
      props.signals.newItemTitleSubmitted()
    }

    const onInputChange = event => {
      props.signals.newItemTitleChanged({
        title: event.target.value
      })
    }

    return (
      <div>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            value={props.newItemTitle}
            onChange={onInputChange}
          />
        </form>
        <ul>
          {props.items.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)
```

You can use passed props in path definition by passing a function:
```js
connect((props) => ({
  item: `items.${props.itemRef}`
}), Component)
```
