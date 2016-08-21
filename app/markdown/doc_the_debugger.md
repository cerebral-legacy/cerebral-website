## The debugger

Even though signals helps you build mental images of complexities in your application, the debugger just hands it right to you and with even more details. Typically you use the debugger to verify changes in your state tree, review signal execution and understand how a state change affects the rendering of your application.

#### Debugger features

- Lists and groups signals executed
- Gives insight into signal execution with all input, outputs, actions, paths and services affected
- Click actions to go to source code
- Double click signals to time travel (immutable model)
- Live update of state tree visualizer
- Edit state tree directly from debugger
- See the active paths in the application
- Log of renders, showing what state paths changed and what components were affected
- Count of how many times Cerebral has told a component to update
- Copy signals data for debugging purposes

### Install
The Cerebral debugger is a Chrome extension. You can install it from the [chrome store](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb). Once the debugger is installed your Chrome devtools will have a new tab called **cerebral**.

#### Instantiate
```javascript
import Controller from 'cerebral'
import Model from 'cerebral/model/immutable'
import Devtools from 'cerebral-module-devtools'

const controller = Controller(Model({}))

controller.addModules({
  devtools: process.env.NODE_ENV === 'production' ? () => {} : Devtools()
})

export default controller
```

### Electron
If you are running your Cerebral app in Electron you can use the [Electron Devtools Installer](https://github.com/GPMDP/electron-devtools-installer) to automatically install the latest Cerebral Debugger into your Electron instance.

`npm install --save-dev electron-devtools-installer`

Then insert the following code when your app is ready:

```javascript
app.on('ready', () => {

  if (process.env.NODE_ENV !== 'production') {
    let installExtension = require('electron-devtools-installer').default
    // You need the ID of the Cerebral Debugger.
    // You find it by going to your Chrome browser -> Preferences -> Extensions
  	installExtension('ddefoknoniaeoikpgneklcbjlipfedbb')
      // This should output 'Added Extension:  Cerebral Debugger'
  	  .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));  
  }

  // Now do your normal window creation
}
```

See [https://github.com/electron/electron/blob/master/docs/tutorial/devtools-extension.md](https://github.com/electron/electron/blob/master/docs/tutorial/devtools-extension.md) if you'd like to manually install the Cerebral Debugger or for more information.
