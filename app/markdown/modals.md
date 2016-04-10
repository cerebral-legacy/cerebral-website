Modals are surprisingly complex and are much like forms in that way. With Cerebral there are some considerations to be made. We want our modals to be state-driven and we want to trigger any modal from any part of our application.

We are going to look at an example where we trigger multiple modals. First we need something to hold on to these modals, so lets create a state called modals which is an array.

```javascript
{
  modals: []
}
```

And now we need a component to render the modals.

```javascript
@Cerebral({
  modals: ['modals']
})
class ModalsController extends React.Component {
  renderModal(modal, index) {
    // Render modal
  }
  render() {
    return (
      <div>
        {this.props.modals.map(modal => this.renderModal(modal))}
      </div>
    )
  }
}
```

But our application can have many types of modals, so how do we decide which to render? Let us first build a modal component:

```javascript
@Cerebral({
  users: ['users']
})
class UserModal extends React.Component {
  render() {
    const user = this.props.users[this.props.userId];
    const index = this.props.index;

    return (
      <Modal>
        <h1>{user.name}</h1>
        <button onClick={() => this.props.signals.modalClosed({index})}>
          Close
        </button>
      </Modal>
    );
  }
}
```

So our component here is the modal to be displayed. It will receive two props from our *ModalsController* and that is `userId` and `index`. So lets see how this will work.

First of all, somewhere in our application we trigger a user modal. And this is the important thing. We want to trigger any modal from anywhere in our app:

```javascript
this.props.signals.modalOpened({type: 'user', props: {userId: '123'}})
```
We trigger a modal of type *user* and we give it some props to be passed, the *userId* in this case.

Our state will now update to:

```javascript
{
  modals: [{
    type: 'user',
    props: {userId: '123'}
  }]
}
```

And our *ModalsController* will need to map the type to an actual component. So lets see how it does that:

```javascript
import UserModal from './modals/UserModal';

const modals = {
  user: UserModal
};

@Cerebral({
  modals: ['modals']
})
class ModalsController extends React.Component {
  renderModal(modal, index) {
    const ModalComponent = modals[modal.type];
    return <ModalComponent {...modal.props} index={index}/>;
  }
  render() {
    return (
      <div>
        {this.props.modals.map((modal, index) => this.renderModal(modal, index))}
      </div>
    )
  }
}
```

This is very similar to how you would handle a component controlling what page to be displayed. But instead of mapping `currentPage` to a component, we map the `modal.type` to a component and pass props. We also pass the `index` property to allow the component to close itself.

So what have we gained specifically here now?:

1. We can show as many modals on top of each other as we want
2. Our modals are specific to their content and they have their own behaviour. Maybe one modal closes on saving, maybe some other has the close button on a different position in the UI. It does not matter. You can just trigger the signal with the index
3. You can close and open modals from anywhere in your app
4. It is all serializable to be passed to debugger, saved on server or sent over websockets.
