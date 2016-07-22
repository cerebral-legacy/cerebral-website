## Modals

Modals are one of those things that are more complex than you might think. So lets start with a simple modal using a module:

*src/modules/App/index.js*
```javascript
export default module => {
  module.addState({
    title: 'My modal demo',
    myModal: {
      show: false
    }
  })
}
```

Either we want to show the modal or we do not. To actually trigger the modal we can create a signal that will toggle the state. To simplify the example we define the chain inside the same file:

```javascript
import {toggle} from 'cerebral/operators'

const toggleMyModal = [
  toggle('state:app.myModal.show')
]

export default module => {
  module.addState({
    title: 'My modal demo',
    myModal: {
      show: false
    }
  })
  module.addSignals({
    myModalToggled: toggleMyModal
  })
}
```

So in our view we just render the Modal:

```javascript
import React from 'react'
import {connect} from 'cerebral-view-react'

import MyModal from './MyModal'

export default connect({
  title: 'app.title'
},
  function App(props) {
    return (
      <div>
        <h1>{props.title}</h1>
        <MyModal />
      </div>
    )
  }
)
```

So what to take note of here is that we have created a specific modal component for our modal. That means if we want multiple modals in our application each of them will have their own `modal` state. That does not mean you have to create the backdrop and modal container for each modal, but you create a specific component for each modal and connect what state it wants directly. Lets look at the modal we just created using React as an example:

```javascript
import React from 'react'
import {connect} from 'cerebral-view-react'

import ModalContainer from './ModalContainer'

export default connect({
  modal: 'app.myModal'
}, {
  myModalToggled: 'app.myModalToggled'
},
  function MyModal(props) {
    if (!props.modal.show) {
      return null
    }

    return (
      <ModalContainer onClose={props.myModalToggled}>
        Hello modal!
      </ModalContainer>
    )
  }
)
```

We control the modal from within the component. Either it does not show anything or it will render a **fixed** modal container which allows us to pass in a signal to run when the modal should close.

### Increasing complexity
So let us increase complexity here. What if our modal was a modal to show a user based on a userId? An approach to this is adding a userId to the modal state:

```javascript
export default module => {
  module.addState({
    title: 'My modal demo',
    userModal: {
      show: false,
      userId: null
    }
  })
}
```

And instead of having a **modalToggled** kind of signal we have one signal for opening the modal and an other for closing it. Because when we open the modal we want to add the userId:

```javascript
const openUserModal = [
  copy('input:userId', 'app.userModal.userId'),
  set('state:app.userModal.show', true)
]
```

In our modal we can now use a computed to grab the the user we want to display. Using a computed ensures that any change to the user will automatically be updated in the modal:

```javascript
import React from 'react'
import {connect} from 'cerebral-view-react'
import {Computed} from 'cerebral'

import ModalContainer from './ModalContainer'

const userModal = Computed({
  modal: 'app.userModal',
  users: 'users'
}, state => {
  return {
    ...state.modal,
    user: state.users.filter(user => user.id === state.modal.userId)[0]
  }
})

export default connect({
  modal: userModal()
}, {
  myModalToggled: 'app.myModalToggled'
},
  function UserModal(props) {
    if (!props.modal.show) {
      return null
    }

    return (
      <ModalContainer onClose={props.myModalToggled}>
        Hello {props.modal.user.name}
      </ModalContainer>
    )
  }
)
```

What is good about this approach is that you can very easily handle grabbing more information about the user if needed.

```javascript
import {set, copy} from 'cerebral/operators'

const openUserModal = [
  copy('input:userId', 'app.userModal.userId'),
  userDataExists, {
    true: [
      set('state:app.userModal.show', true)
    ],
    false: [
      set('state:app.userModal.isLoading', true),
      set('state:app.userModal.show', true),
      getUserData, {
        success: [
          setUserData
        ],
        error: [
          set('state:app.userModal.error', 'Could not load user data')
        ]
      },
      set('state:app.userModal.isLoading', false)
    ]
  }
]
```

And again, this is not Cerebral complexity, this is application complexity and it has to be defined somewhere. With Cerebral it is very explicit and all the complexity is contained in one file.

### Editing the user
So what if we display the user to edit it? Well, we have to take into account that we probably do not want to edit the user directly, we rather want a copy of the data that will later be merged in with the user if we submit it. So instead of creating a computed to grab the existing user we will rather use our chain to copy over the details we want to edit:

```javascript
export default module => {
  module.addState({
    title: 'My modal demo',
    userModal: {
      show: false,
      userId: null,
      firstName: '',
      lastName: ''
    }
  })
}
```

And in our chain:

```javascript
const openUserModal = [
  copy('input:userId', 'app.userModal.userId'),
  userDataExists, {
    true: [
      set('state:app.userModal.show', true),
      copyUserDataToModal // copying firstName and lastName
    ],
    false: [
      set('state:app.userModal.isLoading', true),
      set('state:app.userModal.show', true),
      getUserData, {
        success: [
          setUserData,
          copyUserDataToModal // copying firstName and lastName
        ],
        error: [
          set('state:app.userModal.error', 'Could not load user data')
        ]
      },
      set('state:app.userModal.isLoading', false)
    ]
  }
]
```

Now we are free to edit the fields in our modal and when we are done we could trigger a signal which would update the actual user and then close the modal:

```javascript
const submitModalUser = [
  set('state:app.userModal.isSaving', true),
  copyModalDataToUser,
  patchUser, {
    success: [
      set('state:app.userModal.show', false)
    ],
    error: [
      set('state:app.userModal.error', 'Could not update user')      
    ]
  },
  set('state:app.userModal.isSaving', false)
]
```

We brought a lot of complexity into this, but that is important as typically this is what you want to do in applications. Modals can also be handled other ways, for example maybe you want an array of named modals which is mounted by a "modal controller". This pretty much works like you would handle pages with the router, though you rather render multiple modals on top of each other.
