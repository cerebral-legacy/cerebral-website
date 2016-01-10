# Angular UI package

### Install
`$ npm install cerebral-view-angular`.

### Repo
[cerebral-view-angular](https://github.com/christianalfoni/cerebral-view-angular)

### Get started

#### Render application

```javascript

import 'cerebral-view-angular'; // Exposes module
import controller from './controller.js';
import somethingHappened from './signals/somethingHappened.js';

angular.module('app', ['cerebral'])
  .config(function (cerebralProvider) {

    // Sets the controller for the application
    cerebralProvider.setController(controller);
  })
  .run(function (cerebral) {

    // Add signals
    cerebral.signals({
      somethingHappened
    });

    // Add services
    cerebral.services({
      myService() {}
    });
  });
```

#### State and signals
The Cerebral provider exposes two services, *state* and *signals*.

```javascript

export default function () {
  return {
    controllerAs: 'myComponent',
    scope: {},
    templateUrl: 'myComponent.html',
    controller: function ($scope, state, signals) {

      // Adds a "list" prop to the $scope which
      // will automatically update when the list
      // updates
      state.inject($scope, {
        list: ['list']
      });

      // Injects a mutable version of the object.
      // These work with two-way-databinding
      state.injectMutable($scope, {
        user: ['user']
      });

      // Trigger signals
      $scope.addItemClicked = function () {
        signals.addItemClicked({
          item: 'foo'
        });
      };

    }
  };
};
```

#### Angular services
By default the view package exposes the *$http* service as:

```javascript

function MyAction({services}) {
  services.$http
}
```
