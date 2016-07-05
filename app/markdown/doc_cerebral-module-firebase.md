# cerebral-module-firebase
Official module to handle Firebase with Cerebral

#### Note!
This project is currently in its **ALPHA** stage!

### Install
Install both firebase and the Cerebral module:

`npm install firebase cerebral-module-firebase`

### Get started
```js
import FirebaseModule from 'cerebral-module-firebase';

...

controller.addModules({
  firebase: FirebaseModule({
    valuesKey: 'key', // What property name to use on "values" method
    queuePath: 'queue', // Path to Firebase Queue
    config: {
      apiKey: '{apiKey}',
      authDomain: '{authDomain}',
      databaseURL: '{databaseURL}',
      storageBucket: '{storageBucket}'
    }
  })
})
```

### Retrieve data

#### Single value
```js
function someAction({ services, output }) {
  services.firebase.value('posts/someKey/foo')
    .then(output.success)
    .catch(output.error);
}
```
The result will be available as `{ value: 'bar' }`.

#### List of entities
Extracts and converts into an array where the key of each post is attached as a `_key` property.

```js
function someAction({ services, output }) {
  services.firebase.values('posts')
    .then(output.success)
    .catch(output.error);
}
someAction.async = true;
```
The result will be available as `{ values: [{_key: 'someKey', foo: 'bar'}] }`.

### Retrieve data with updates
When you also want to know when your queried data updates you have the following methods:

#### onValue
```js
function someAction({ services, output }) {
  services.firebase.onValue('posts/someKey/foo', 'someModule.fooUpdated');
}
```
This will immediately grab the value and trigger the signal passed. Any other updates to the value will trigger the same signal.

To stop listening for updates to the value:
```js
function someAction({ services, output }) {
  services.firebase.off('posts/someKey/foo', 'someModule.fooUpdated');
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
  services.firebase.off('posts', 'posts.postAdded');
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
  services.firebase.off('posts', 'posts.postRemoved');
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
  services.firebase.off('posts', 'posts.postChanged');
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

### Login

#### Anonymous login
This login will method will resolve to existing anonymous or create a new one for you.

```js
function someAction({ services, output, state }) {
  services.firebase.signInAnonymously()
  .then(output.success)
  .catch(output.error);
}
someAction.async = true;
```

... more coming
