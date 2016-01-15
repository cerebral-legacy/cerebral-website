debounce can be used to throttle signals or parts of signal, for example on keyboard activity.

*fieldChanged.js*
```javascript

import set from 'cerebral-addons/set';
import debounce from 'cerebral-addons/debounce';
import validateForm from '../actions/validateForm';

export default [
  set('input:/value', 'state:/form.field'),
  debounce(500, [
    validateForm
  ])
];
```
