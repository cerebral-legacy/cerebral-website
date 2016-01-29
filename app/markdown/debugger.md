There are two steps to using the Cerebral Debugger.

### 1. Install the Chrome Extension
[Go to Chrome Store](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb)

### 2. Install the module
The devtools of Cerebral is a module that you add to your application.

`npm install cerebral-module-devtools`

```javascript

import Controller from 'cerebral'
import Model from 'cerebral-module-baobab'
import Devtools from 'cerebral-module-devtools'

const controller = Controller(Model({}));

controller.addModules({
  devtools: Devtools()
})
```
