debounce can be used to throttle signals or parts of signal, for example on keyboard activity.

*fieldChanged.js*
```javascript

import copy from 'cerebral-addons/copy';
import debounce from 'cerebral-addons/debounce';
import validateForm from '../actions/validateForm';

export default [
  copy('input:/value', 'state:/form.field'),
  debounce(500, [
    validateForm
  ])
];
```
