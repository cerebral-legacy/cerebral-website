# Snabbdom UI package

Cerebral Snabbdom makes Cerebral a first class citizen of components. That means you have to do a lot less wiring to build components and Snabbdom is faster than React. Read more about the JSX syntax over at [snabbdom-jsx](https://github.com/yelouafi/snabbdom-jsx), it differs from React.

### Install
`npm install cerebral-view-snabbdom`

To use JSX syntax you also need Babel with the `transform-react-jsx` package.

`npm install babel-plugin-transform-react-jsx`

```javascript

{
  "presets": ["es2015"],
  "plugins": [
    ["transform-react-jsx", { "pragma": "Component.DOM" }]
  ]
}
```

### Repo
[cerebral-snabbdom](https://github.com/cerebral/cerebral-snabbdom)

### Get started
#### Render

```javascript

import {Component, render} from 'cerebral-view-snabbdom';
import App from './App';
import controller from './controller';

render(() => <App/>, document.querySelector('#app'), controller);
```
Note that you have to pass a callback to render the initial component, returning it. And you also have to pass the controller.

**Note!** `() => <App/>` is the same as `() => { return <App/> }`.

#### Component

```javascript

import {Component} from 'cerebral-view-snabbdom';

export default Component(() => (

  <h1>Hello world!</h1>

));
```

#### Use state from state store
By default you have access to all the state from your state tree on the `state` property passed into each components.

```javascript

import {Component} from 'cerebral-view-snabbdom';

export default Component(({state}) => (

  <h1>{state.title}</h1>

));
```

You can optionally extract specific state and customize its property name:

```javascript

import {Component} from 'cerebral-view-snabbdom';

export default Component({
  title: ['title'],
  rows: ['admin', 'users']
}, ({state}) => {

  const renderRow = (row) => <li>{row.name}</li>;

  return (
    <div>
      <h1>{state.title}</h1>
      <ul>
        {state.rows.map(renderRow)}
      </ul>
    </div>
  );

});
```
In this case only *title* and *rows* are available in the component, via the *state* property.

#### Use props passed to component

*MyComponent.js*
```javascript

import {Component} from 'cerebral-view-snabbdom';

export default Component(({props}) => (

  <h1>{props.title}</h1>

));
```

```javascript

import MyComponent from './MyComponent';

<MyComponent title="whatup!"/>
```

#### Use signals

*MyComponent.js*
```javascript

import {Component} from 'cerebral-view-snabbdom';

export default Component(({state, signals}) => (

  <div>
    <h1 style={{color: state.color}}>{props.title}</h1>
    <button on-click={() => signals.colorChanged({color: 'blue'})}>Change color</button>
  </div>

));
```

#### Optimize
Any component you give a `key` will be optimized under the hood. It will shallow check its properties to decide if a render is necessary.

*MyComponent.js*
```javascript

import {Component} from 'cerebral-view-snabbdom';

const MyComponent = Component(({props}) => (

  <h1>{props.title}</h1>

));

<MyComponent key="main-title" title="test"/>
```
The key has to be **unique**. The component will only render when *title* actually changes. If you want to also optimize on the state used from the state store you can define the state used by the component.

*MyComponent.js*
```javascript

import {Component} from 'cerebral-view-snabbdom';

const MyComponent = Component({
  version: ['version']
}, ({props, state}) => (

  <h1>{props.title} ({state.version})</h1>

));
```
Now the component will only update if either *title* from props or *version* from the state has changed.

#### eslint
When using eslint, it may complain about `Component` being unused. You can configure eslint to allow `Component`:
```javascript

"no-unused-vars": [2, {
  "vars": "local",
  "args": "after-used",
  "varsIgnorePattern": "Component"
}],
```
A complete [.eslint sample config](https://gist.github.com/garth/a812cf7a7b53f083e667) for cerebral-snabbdom.
