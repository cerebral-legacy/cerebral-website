### Redirect
You can redirect to a different url from within a signal. This will cause a new signal to trigger. Using the debugger you will have to time travel debug to see the initial signal that caused the redirect. To redirect you need to use the exposed router service:

```javascript

function redirectAction(input, state, output, services) {
  services.router.redirect('/someurl', {
    replace: false // Default true
  });
}

signal('appMounted', [
  myConditionalAction, {
    success: [someOtherAction],
    error: [redirectAction]
  }
]);
```

Or you can use the redirect action factory from the router:

```javascript

import {redirect} from 'cerebral-router';

signal('appMounted', [
  myConditionalAction, {
    success: [someOtherAction],
    error: [redirect('/error')]
  }
]);
```
