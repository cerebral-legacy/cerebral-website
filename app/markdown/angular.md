### Install
`$ npm install cerebral-view-angular`

### Repo
[cerebral-view-angular](https://github.com/christianalfoni/cerebral-view-angular)

### Get started

#### Render application

```javascript

import 'cerebral-view-angular' // Exposes module
import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import Router from 'cerebral-module-router'
import Home from './modules/Home'

const controller = Controller(Model({}))

angular.module('app', ['cerebral'])
  .config(function (cerebralProvider) {

    // Sets the controller for the application
    cerebralProvider.setController(controller)
  })
  .run(function (cerebral) {

    cerebral.addModules({
      home: Home(),

      router: Router({
        '/': 'home.routed'
      })
    })

  })
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
        list: ['home', 'list'],
        someComputed: someComputed // Use computed
      });

      // Injects a mutable version of the object.
      // These work with two-way-databinding
      state.injectMutable($scope, {
        user: ['home', 'user']
      });

      // Trigger signals
      $scope.addItemClicked = function () {
        signals.home.addItemClicked({
          item: 'foo'
        });
      };

    }
  };
};
```

#### Adding Angular services
By default the view package exposes the *$http* service as:

```javascript

.run(function (cerebral, $http) {

  cerebral.addServices({
    $http
  })

});
```
