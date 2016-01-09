# Baobab STATE package

### Install
`$ npm install cerebral-model-baobab`

### Repo
[cerebral-model-baobab](https://github.com/christianalfoni/cerebral-model-baobab)

### Features
Baobab allows you to use facets to map state. Baobab also allows you to validate any changes
to the state tree. Read more about Baobab at the [github repo](https://github.com/Yomguithereal/baobab/tree/v2).

### Get started

```javascript

import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import request from 'superagent';

// Any Baobab options
const options = {

  // Set this option in DEVELOPMENT to log out a
  // plain representation of state store
  lazyMonkeys: false
};

const initialState = {
  isLoading: false,
  user: null,
  error: null
};

const model = Model(initialState, options);

// You have access to the Baobab tree itself
model.tree.on('invalid', function () {

});

// Instantiate the controller
export default Controller(model);
```

### Monkeys

Monkeys are a high performance way to derive new data from existing state.

```javascript

import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';

const VisibleTodos = Model.monkey({
  cursors: {
      todos: ['todos'],
      ids: ['visibleTodos', 'ids']
  },
  get(data) {
    return data.ids.map((id) => data.todos[id]);
  }
});

// The initial state of the application
const model = Model({
  todos: {},
  visibleTodos: {
    ids: [],
    list: VisibleTodos
  }
});
```

This allows you to handle relational state with ease. It also makes it possible to separate the data from how you want to display that data.
