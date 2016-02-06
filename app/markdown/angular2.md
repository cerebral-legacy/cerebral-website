## Install
`npm install cerebral-view-angular2`

### Repo
[cerebral-view-angular2](https://github.com/cerebral/cerebral-view-angular2)

### Get started

#### Render the app
```javascript
// Your cerebral controller instance
import controller from './controller';
import {register} from 'cerebral-view-angular2';

// Your main application component
import AppComponent from './components/app.component';

// Register the controller with the decorator
register(controller);

// Bootstrap the angular2 app
document.addEventListener('DOMContentLoaded', () => {
  bootstrap(AppComponent)
    .catch(err => console.error(err));
});
```

#### Get state in components

Use the decorator to pass state and signals to the component  
```js
import {Component} from 'angular2/core';
import {Decorator as Cerebral} from 'cerebral-view-angular2';

@Cerebral({
  isLoading: ['isLoading'],
  user: ['user'],
  error: ['error']  
})
class AppComponent {
  public signals;
  public state;
}
```
You can access your signals with:
```javascript
this.signals.firstSignal();
this.signals.otherSignal();
```
You can access the state with:
```javascript
this.state.isLoading;
this.state.user;
this.state.error;
```
