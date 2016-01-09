# Immutable JS STATE package

### Install
`$ npm install cerebral-model-immutable-js`

### Repo
[cerebral-immutable-js](https://github.com/christianalfoni/cerebral-immutable-js)

### Features
The is Facebook's super high performance immutable library. Note that all values extracted from the state store are extracted as they would be with
immutable-js. Read more about immutable-js at the [webpage](https://facebook.github.io/immutable-js/).

### Get started

```javascript

import Controller from 'cerebral';
import Model from 'cerebral-model-immutable-js';

// The initial state of the application
const model = Model({
  isLoading: false,
  user: null,
  error: null
});

// Instantiate the controller
export default Controller(model);
```
