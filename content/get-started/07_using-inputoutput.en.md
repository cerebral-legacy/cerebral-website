---
title: Input and custom Actions
---

## Input and custom Actions 

Signals can take an input-object which then can be further processed by its actions.
Let us say you have an user input which should get written to state.
As we know now, the only correct way to write to state is to use **Signals**.
To add another concept at this stage we also introduce custom **Actions** which can be used inside a signal. Those actions can make use of the input-object as well. Every modification to the input-object will be propagated to the next action.
So let us have a look at a sample Signal which contains a chain like that:
```js
    saveButtonClicked: [
      set(state`originalValue`, input`value`),
      myAction1,
      myAction2,
      set(state`toast.message`, state`extendedValue`),
      wait(8000),
      set(state`toast.message', '')
    ]
```
We would like to access the input-object from within our action.
So lets have a look at such a sample action:
```js
function myAction1({input}) {
  input.value += ' extended by myAction1'
}
```
As you can see actions can receive some context if they want. In this case we are interested in the input object. You could also use ```function myAction1(context)``` to get the full context if needed.
All we do here is to add a text to the existing value and save it back to the input object so the next action could as well pick it up and so on.

Let us create a working sample inside our app. First we need to change the *src/index.js* to this:

```js
import React from 'react'
import { render } from 'react-dom'
import { Controller } from 'cerebral'
import App from './components/App'
import { Container } from 'cerebral/react'
import Devtools from 'cerebral/devtools'
import { set, wait, state, input } from 'cerebral/operators'

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),
  state: {
    title: 'Hello from Cerebral!',
    appTitle: 'Cerebral Tutorial App',
    toast: {
      message: 'no message yet'
    },
    originalValue: '',
    extendedValue: ''
  },
  signals: {
    buttonClicked: [
      set(state`toast.message`, 'Button Clicked!'),
      wait(4000),
      set(state`toast.message`, '')
    ],
    saveButtonClicked: [
      set(state`originalValue`, input`value`),
      myAction1,
      myAction2,
      set(state`toast.message`, state`extendedValue`)
    ]
  }
})

function myAction1({input}) {
  input.value += ' extended by myAction1'
}

function myAction2({input, state}) {
  input.value += ' and also by myAction2'
  state.set('extendedValue', input.value)
  return ({
    aKeyAddedByMyAction2: 'testvalue'
  })
}

render((
  <Container controller={ controller }>
    <App/>
  </Container>
  ), document.querySelector('#root'))
```

Then we need an Input-Component. Please save this component into *src/components/Input*

```js
import React from 'react'
import { connect } from 'cerebral/react'
export default connect({
  value: 'originalValue'
}, {
  saveButtonClicked: 'saveButtonClicked'
}, function Input(props) {
  return (
    <div className="c-input-group">
      <div className="o-field">
        <div
             id="value"
             className="c-field"
             contentEditable
             suppressContentEditableWarning>
          { props.value }
        </div>
      </div>
      <button
              onClick={ (event) => props.saveButtonClicked({
                          value: document.getElementById("value").innerText
                        }) }
              className="c-button c-button--brand">
        Save
      </button>
    </div>
  )
}
)
```

Then we add this new Component to our Parent App-Component as follows:
```js
import React from 'react'
import { connect } from 'cerebral/react'
import HeaderButton from '../HeaderButton'
import Toast from '../Toast'
import Input from '../Input'

export default connect({
  appTitle: 'appTitle'
}, {
}, function App(props) {
  return (
    <div className="o-container o-container--medium">
      <h1 className="u-high">{ props.appTitle }</h1>
      <HeaderButton/>
      <Input/>
      <Toast/>
    </div>
  )
}
)
```
Now we are ready to test drive our changes. Please keep an eye on the **debugger**. You can track now the flow of the input-values between the different actions after they got executed. Another method to hand over objects from one action to another is to return an object from the action as done in *myAction2*. This object will be merged then with the input which is used then for the next action.
Are you ready for async? Please stay with us and have a look at the next chapter.

