## cerebral-module-devtools

Go to official [README](https://github.com/cerebral/cerebral-module-devtools/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
The module that handles communication with the debugger and time travel debugging. This module slows down your code so be sure to not run it in production!

### Install
`npm install cerebral-module-devtools --save-dev`

### Instantiate the module
```javascript
...

import Devtools from 'cerebral-module-devtools'

...

controller.addModules({
  devtools: process.env.NODE_ENV === 'production' ? () => {} : Devtools()
)
```
