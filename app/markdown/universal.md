# Universal

To build universal apps you need to render your components on the server. Since your components requires state from Cerebral to render you need to expose it. You do that with the **ServerController**. It is basically just a "dummy controller" which allows you pass in the state needed to render the UI correctly.

```javascript

import React from 'react';
import {ServerController} from 'cerebral';
import {Container} from 'cerebral-view-react';
import App from '../src/App.js';
import {renderToString} from 'react-dom';

app.get('/', (req, res) => {

  // Pass in initial state
  const controller = ServerController({foo: 'bar'});  
  res.send(renderToString(<Container controller={controller}><App/></Container>);
});
```

Typically you also need to include the actual initial state in the response as you want the application, when it is loaded, to use that same state. Universal apps is no picnic and we will keep working on making this an easier process.
