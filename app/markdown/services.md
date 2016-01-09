# Services

It is important that the actions in the signals are pure. They should not call or reference anything outside themselves. But we do need tools like ajax libraries, maybe underscore and the likes. This is what you use services for. You can think of it as an injection system that gives reliability and testability to the signals and their actions.

Services are added to the controller the same way as signals.

```javascript

import controller from './controller.js';
import request from 'superagent';

controller.services({
  request
});
```

In this example we are exposing [superagent](https://github.com/visionmedia/superagent). This will allow us to do HTTP requests inside our actions. You can of course choose whatever ajax library and other tools you want.

### Using a service

```javascript

function myAction ({services, output}) {

  services.request(url, function (err, response) {

    if (err) {
      output.error({
        error: err.toString()
      });
    } else {
      output.success({
        result: JSON.stringify(response.text)
      });
    }

  });

}

return action;
```
