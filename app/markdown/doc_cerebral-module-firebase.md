## cerebral-module-firebase

Go to official [README](https://github.com/cerebral/cerebral-module-firebase/blob/master/README.md) to read more technical details and contribute to the project.

**Note!** This project is in BETA and will move into production soon.

### Concept
The module that handles communication with firebase. It supports talking to [firebase-queue](https://github.com/firebase/firebase-queue) using the **task** API.

### Install
`npm install cerebral-module-firebase --save`

### Instantiate the module
```javascript
import FirebaseModule from 'cerebral-module-firebase';

...

controller.addModules({
  firebase: FirebaseModule({
    config: {
      apiKey: '{apiKey}',
      authDomain: '{authDomain}',
      databaseURL: '{databaseURL}',
      storageBucket: '{storageBucket}'
    },
    // When using tasks and firebase queue you can prefix
    // the specs triggered. This is useful in development
    // when multiple developers are working against the
    // same instance
    specPrefix: 'CJ'
  })
})
```

### Retrieve data
The Cerebral firebase module uses **dot** notation to keep consistency with Cerebral itself.

#### Value
```js
function someAction({ services, output }) {
  services.firebase.value('someKey.foo')
    .then(output.success)
    .catch(output.error);
}
```
The result will be available as `{ key: 'foo', value: 'bar' }`.

### Retrieve data with updates
When you also want to know when your queried data updates you have the following methods:

#### onValue
```js
function someAction({ services, output }) {
  services.firebase.onValue('someKey.foo', 'someModule.fooUpdated');
}
```
This will immediately grab the value and trigger the signal passed. Any other updates to the value will trigger the same signal.

To stop listening for updates to the value:
```js
function someAction({ services, output }) {
  services.firebase.off('someKey.foo', 'onValue', 'someModule.fooUpdated');
}
```

#### onChildAdded
```js
function someAction({ services, output }) {
  services.firebase.onChildAdded('posts', 'posts.postAdded', {
    payload: {}, // Merged with the payload of the signal
    limitToFirst: 5, // Read Firebase docs
    limitToLast: 5, // Read Firebase docs
    startAt: 5, // Read Firebase docs
    endAt: 5, // Read Firebase docs
    equalTo: 5, // Read Firebase docs
    orderByChild: 'count', // Read Firebase docs
    orderByKey: true, // Read Firebase docs
    orderByValue: true // Read Firebase docs
  });
}
```
This will immediately grab and trigger the signal `posts.postAdded` for every post grabbed. Note these actions should **not** be async. The signal is triggered with the payload: `{ key: 'someKey', value: {} }`.

To stop listening for updates to the posts:
```js
function someAction({ services, output }) {
  services.firebase.off('posts', 'onChildAdded', 'posts.postAdded');
}
```

#### onChildRemoved
```js
function someAction({ services, output }) {
  services.firebase.onChildRemoved('posts', 'posts.postRemoved', {
    // Same options as above
  });
}
```
This will trigger the signal `posts.postRemoved` whenever a post is removed from the selection. The signal is triggered with the payload: `{ key: 'someKey' }`.

To stop listening:
```js
function someAction({ services, output }) {
  services.firebase.off('posts', 'onChildRemoved', 'posts.postRemoved');
}
```

#### onChildChanged
```js
function someAction({ services, output }) {
  services.firebase.onChildChanged('posts', 'posts.postChanged', {
    // Same options as above
  });
}
```
This will trigger the signal `posts.postChanged` whenever a post is changed in the selection. The signal is triggered with the payload: `{ key: 'someKey', value: {} }`.

To stop listening:
```js
function someAction({ services, output }) {
  services.firebase.off('posts', 'onChildChanged', 'posts.postChanged');
}
```

### Tasks
If you are using the Firebase Queue and need to create tasks, you can do that with:

```js
function someAction({ services, output, state }) {
  services.firebase.task('create_post', {
    uid: state.get('app.user.uid'),
    text: state.get('posts.newPostText')
  })
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```

This will add a task at `queue/tasks`. There is no output from a resolved task.

### Authentication

#### Get user
Will resolve to `{user: {}}` if user exists. If user was redirected from Facebook/Google etc. as part of first sign in, this method will handle the confirmed registration of the user.

```js
function someAction({ services, output, state }) {
  services.firebase.getUser()
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```

#### Anonymous login
This login will method will resolve to existing anonymous or create a new one for you. Resolves to `{user: {}}`.

```js
function someAction({ services, output, state }) {
  services.firebase.signInAnonymously()
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```

#### Create user with email and password
Register a new user with email and password. Resolves to `{user: {}}`.

```js
function someAction({ services, output, state }) {
  const email = state.get('register.email')
  const password = state.get('register.password')

  services.firebase.createUserWithEmailAndPassword(email, password)
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```

#### Sign in user with email and password
Sign in a user with email and password. Resolves to `{user: {}}`.

```js
function someAction({ services, output, state }) {
  const email = state.get('register.email')
  const password = state.get('register.password')

  services.firebase.signInWithEmailAndPassword(email, password)
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```

#### Sign in with Facebook
Sign in a user with Facebook. Resolves to `{user: {}}`, or redirects.

```js
function someAction({ services, output, state }) {
  services.firebase.signInWithFacebook({
    redirect: false,
    scopes: [] // Facebook scopes to access
  })
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```

#### Sign out
Sign out user. **getUser** will now not resolve a user anymore.

```js
function someAction({ services, output, state }) {
  services.firebase.signOut()
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```

#### Send reset password email

```js
function someAction({ services, output, state }) {
  services.firebase.sendPasswordResetEmail(state.get('user.email'))
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```

### Action factories

#### signInAnonymously

```javascript
import {signInAnonymously} from 'cerebral-module-firebase'

export default [
  signInAnonymously(), {
    success: [],
    error: []
  }
]
```

#### getUser

```javascript
import {getUser} from 'cerebral-module-firebase'

export default [
  getUser(), {
    success: [],
    error: []
  }
]
```

#### signOut

```javascript
import {signOut} from 'cerebral-module-firebase'

export default [
  signOut(), {
    success: [],
    error: []
  }
]
```
